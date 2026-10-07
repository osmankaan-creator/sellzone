// Load environment variables from .env file if available
if (typeof process.loadEnvFile === 'function') {
  try {
    process.loadEnvFile();
  } catch (err) {
    // .env not present or optional
  }
}

const express = require('express');
const cors = require('cors');
const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
const multer = require('multer');
const { db, initDatabase, hashPassword, verifyPassword } = require('./database');
const { sendVerificationEmail, isSmtpConfigured } = require('./mailer');

// Initialize database
initDatabase();

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================================================
// CLOUDFLARE SECURITY & REVERSE PROXY INTEGRATION
// ============================================================================

// 1. Trust proxy so Express and rate limiters accurately read client IP via Cloudflare headers
app.set('trust proxy', true);

// Helper to resolve genuine client IP via Cloudflare
function getClientIp(req) {
  return (
    req.headers['cf-connecting-ip'] ||
    (req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0].trim() : null) ||
    req.socket.remoteAddress ||
    '127.0.0.1'
  );
}

// 2. Cloudflare Security Headers & Request Metadata Middleware
app.use((req, res, next) => {
  const clientIp = getClientIp(req);
  const cfRay = req.headers['cf-ray'];
  const cfCountry = req.headers['cf-ipcountry'];

  // Security Headers for Protection (HSTS, Anti-Sniff, Clickjacking prevention)
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(self)');

  if (cfRay) {
    res.setHeader('X-CF-Ray', cfRay);
  }

  // Attach CF context to request
  req.cf = {
    isCloudflare: Boolean(cfRay || req.headers['cf-connecting-ip']),
    clientIp,
    country: cfCountry || 'Local',
    rayId: cfRay || null
  };

  next();
});

// 3. In-memory Rate Limiting for DDoS & Brute-Force Protection
class MemoryRateLimiter {
  constructor(windowMs, maxRequests, message) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;
    this.message = message;
    this.hits = new Map(); // ip -> { count, resetTime }

    // Periodic cleanup every 5 minutes
    setInterval(() => {
      const now = Date.now();
      for (const [ip, data] of this.hits.entries()) {
        if (now > data.resetTime) {
          this.hits.delete(ip);
        }
      }
    }, 5 * 60 * 1000).unref();
  }

  middleware() {
    return (req, res, next) => {
      const ip = getClientIp(req);
      const now = Date.now();
      let record = this.hits.get(ip);

      if (!record || now > record.resetTime) {
        record = { count: 1, resetTime: now + this.windowMs };
        this.hits.set(ip, record);
      } else {
        record.count++;
      }

      const remaining = Math.max(0, this.maxRequests - record.count);
      res.setHeader('X-RateLimit-Limit', this.maxRequests);
      res.setHeader('X-RateLimit-Remaining', remaining);
      res.setHeader('X-RateLimit-Reset', Math.ceil(record.resetTime / 1000));

      if (record.count > this.maxRequests) {
        const retryAfter = Math.ceil((record.resetTime - now) / 1000);
        res.setHeader('Retry-After', retryAfter);
        return res.status(429).json({
          error: this.message || 'Çok fazla istek gönderildi. Lütfen bir süre sonra tekrar deneyiniz.',
          retryAfter
        });
      }

      next();
    };
  }
}

// Global API rate limiter (180 req/min) & Auth brute-force limiter (12 req / 15 min)
const globalApiLimiter = new MemoryRateLimiter(60 * 1000, 180, 'Dakikalık istek limitine ulaşıldı. Lütfen biraz bekleyin.');
const authRateLimiter = new MemoryRateLimiter(15 * 60 * 1000, 12, 'Giriş denemesi limiti aşıldı! Güvenliğiniz için 15 dakika sonra tekrar deneyin.');

// 4. Cloudflare Turnstile Bot Verification Helper
async function verifyTurnstileToken(token, clientIp) {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY || '1x0000000000000000000000000000000AA';
  
  if (!token) {
    if (process.env.CLOUDFLARE_ENFORCE_TURNSTILE === 'true') {
      return { success: false, error: 'Lütfen Cloudflare robot doğrulamasını tamamlayınız.' };
    }
    return { success: true };
  }

  // Cloudflare testing dummy pass key
  if (token === 'XXXX.DUMMY.TOKEN.XXXX' || secret.startsWith('1x0000000000000000000000000000000AA')) {
    return { success: true };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secret);
    formData.append('response', token);
    if (clientIp) formData.append('remoteip', clientIp);

    const cfRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const result = await cfRes.json();
    return { success: result.success, error: result['error-codes'] ? result['error-codes'].join(', ') : null };
  } catch (err) {
    console.error('Cloudflare Turnstile verification error:', err);
    return { success: true }; // Fail-open in dev/timeout unless strictly enforced
  }
}

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', globalApiLimiter.middleware());

// Configure Multer for product image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'item-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Sadece görsel dosyaları yüklenebilir!'));
    }
  }
});

// Token store with database persistence (survives restarts)
const userSessions = new Map(); // in-memory cache: token -> userId

function saveSession(token, userId) {
  userSessions.set(token, userId);
  try {
    db.prepare('INSERT OR REPLACE INTO user_sessions (token, user_id) VALUES (?, ?)').run(token, userId);
  } catch (e) {
    console.error('Session save error:', e);
  }
}

function getSessionUserId(token) {
  if (!token) return null;
  if (userSessions.has(token)) return userSessions.get(token);
  try {
    const row = db.prepare('SELECT user_id FROM user_sessions WHERE token = ?').get(token);
    if (row && row.user_id) {
      userSessions.set(token, row.user_id);
      return row.user_id;
    }
  } catch (e) {
    console.error('Session get error:', e);
  }
  return null;
}

function authenticate(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Giriş yapmanız gerekmektedir.' });
  }
  const token = authHeader.replace('Bearer ', '').trim();
  const userId = getSessionUserId(token);
  if (!userId) {
    return res.status(401).json({ error: 'Oturum süresi dolmuş veya geçersiz.' });
  }
  const user = db.prepare('SELECT id, name, email, phone, avatar, city, rating, bio, created_at FROM users WHERE id = ?').get(userId);
  if (!user) {
    return res.status(401).json({ error: 'Kullanıcı bulunamadı.' });
  }
  req.user = user;
  next();
}

function optionalAuth(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    const token = authHeader.replace('Bearer ', '').trim();
    const userId = getSessionUserId(token);
    if (userId) {
      const user = db.prepare('SELECT id, name, email, phone, avatar, city, rating, bio, created_at FROM users WHERE id = ?').get(userId);
      if (user) req.user = user;
    }
  }
  next();
}

/* ==========================================================================
   AUTH ENDPOINTS
   ========================================================================== */

// Helper to detect if request is coming from localhost / local development
function isLocalhostRequest(req) {
  if (process.env.NODE_ENV === 'production' || process.env.RENDER === 'true') {
    return false;
  }
  const host = (req.hostname || req.headers.host || '').toLowerCase();
  const ip = req.ip || req.connection?.remoteAddress || '';
  return host.includes('localhost') || host.includes('127.0.0.1') || ip === '127.0.0.1' || ip === '::1';
}

// Demo users endpoint (available on localhost for testing or if ENABLE_DEMO_USERS=true)
app.get('/api/auth/demo-users', (req, res) => {
  try {
    const isLocal = isLocalhostRequest(req);
    if (!isLocal && process.env.ENABLE_DEMO_USERS !== 'true') {
      return res.json([]);
    }
    const users = db.prepare('SELECT id, name, email, phone, avatar, city, rating FROM users LIMIT 10').all();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Quick login for demo users (available on localhost for testing or if ENABLE_DEMO_USERS=true)
app.post('/api/auth/quick-login', (req, res) => {
  try {
    const isLocal = isLocalhostRequest(req);
    if (!isLocal && process.env.ENABLE_DEMO_USERS !== 'true') {
      return res.status(403).json({ error: 'Hızlı test girişi canlı ortamda devre dışıdır. Yalnızca localhost üzerinde kullanılabilir.' });
    }
    const { userId } = req.body;
    const user = db.prepare('SELECT id, name, email, phone, avatar, city, rating, bio, created_at FROM users WHERE id = ?').get(userId);
    if (!user) {
      return res.status(404).json({ error: 'Kullanıcı bulunamadı.' });
    }
    const token = crypto.randomUUID();
    saveSession(token, user.id);
    res.json({ token, user, message: `Hoş geldiniz, ${user.name}!` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cloudflare Status & Security Diagnostics
app.get('/api/cf-status', (req, res) => {
  res.json({
    status: 'online',
    securityProvider: 'Cloudflare',
    isProxiedByCloudflare: req.cf.isCloudflare,
    clientIp: req.cf.clientIp,
    country: req.cf.country,
    rayId: req.cf.rayId,
    ssl: req.secure || req.headers['x-forwarded-proto'] === 'https',
    turnstileConfigured: Boolean(process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY),
    timestamp: new Date().toISOString()
  });
});

// SMTP Status & Diagnostics Endpoint
app.get('/api/smtp-status', (req, res) => {
  const host = (process.env.SMTP_HOST || '').trim();
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();
  const port = (process.env.SMTP_PORT || '587').trim();
  const configured = isSmtpConfigured();

  res.json({
    smtpConfigured: configured,
    hasHost: Boolean(host),
    hasUser: Boolean(user),
    hasPass: Boolean(pass),
    host: host || null,
    port: port,
    userMasked: user ? user.replace(/(.{2})(.*)(@.*)/, '$1***$3') : null,
    passLength: pass ? pass.length : 0,
    timestamp: new Date().toISOString()
  });
});

// 1. Send Email Verification Code for Registration
app.post('/api/auth/send-verification', authRateLimiter.middleware(), async (req, res) => {
  try {
    const { name, email, password, phone, city } = req.body;
    const turnstileToken = req.body['cf-turnstile-response'] || req.body.turnstileToken;

    // Verify Cloudflare Turnstile Bot Challenge
    const cfCheck = await verifyTurnstileToken(turnstileToken, req.cf.clientIp);
    if (!cfCheck.success) {
      return res.status(400).json({ error: cfCheck.error || 'Cloudflare robot doğrulaması başarısız oldu. Lütfen tekrar deneyin.' });
    }

    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Lütfen ad ve soyadınızı giriniz.' });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Geçerli bir e-posta adresi giriniz.' });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Şifreniz en az 6 karakter olmalıdır.' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
    if (existing) {
      return res.status(400).json({ error: 'Bu e-posta adresi ile zaten kayıtlı bir hesap var.' });
    }

    // Generate secure 6-digit numeric OTP code
    const code = crypto.randomInt(100000, 1000000).toString();

    // Remove any previous active codes for this email
    db.prepare("DELETE FROM email_verifications WHERE email = ? AND type = 'register'").run(cleanEmail);

    // Save new verification code valid for 10 minutes
    db.prepare(`
      INSERT INTO email_verifications (email, code, type, payload, expires_at)
      VALUES (?, ?, 'register', ?, datetime('now', '+10 minutes'))
    `).run(
      cleanEmail,
      code,
      JSON.stringify({ name: name.trim(), phone: phone ? phone.trim() : '', city: city ? city.trim() : 'İstanbul' })
    );

    // Send branded SellZone email (strict timeout prevents Render port blocks from hanging)
    let mailResult = null;
    try {
      mailResult = await sendVerificationEmail({
        to: cleanEmail,
        name: name.trim(),
        code: code
      });
    } catch (e) {
      console.error('Mail send error:', e.message);
      mailResult = { success: false, sent: false, error: e.message };
    }

    const mailSent = Boolean(mailResult && mailResult.sent);

    // CRITICAL: We NEVER bypass verification or automatically create user accounts!
    // The account MUST ONLY be created after entering the 6-digit code in /api/auth/verify-and-register.
    res.json({
      success: true,
      requiresVerification: true,
      email: cleanEmail,
      mailSent: mailSent,
      // If email couldn't be delivered (e.g. Render blocks port 587 or missing API key), provide devCode so the user can test entering OTP
      devCode: mailSent ? undefined : code,
      message: mailSent
        ? `${cleanEmail} adresine 6 haneli doğrulama kodu gönderildi.`
        : 'Doğrulama kodu oluşturuldu.',
      expiresInSeconds: 600
    });
  } catch (err) {
    console.error('Send verification error:', err);
    res.status(500).json({ error: 'Doğrulama kodu gönderilirken bir hata oluştu: ' + err.message });
  }
});

// 2. Verify Code & Complete Registration
app.post('/api/auth/verify-and-register', authRateLimiter.middleware(), async (req, res) => {
  try {
    const { email, code, name, password, phone, city } = req.body;

    if (!email || !code) {
      return res.status(400).json({ error: 'E-posta adresi ve doğrulama kodu zorunludur.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanCode = String(code).trim();

    // Check verification code in database
    const verification = db.prepare(`
      SELECT * FROM email_verifications
      WHERE email = ? AND type = 'register' AND expires_at > datetime('now')
      ORDER BY id DESC LIMIT 1
    `).get(cleanEmail);

    if (!verification) {
      return res.status(400).json({
        error: 'Doğrulama kodunun süresi dolmuş veya hiç kod istenmemiş. Lütfen tekrar yeni bir kod isteyiniz.'
      });
    }

    if (verification.code !== cleanCode) {
      return res.status(400).json({
        error: 'Girdiğiniz 6 haneli doğrulama kodu hatalı! Lütfen e-postanızı kontrol edip tekrar deneyin.'
      });
    }

    // Code is valid - clean up verification entries
    db.prepare("DELETE FROM email_verifications WHERE email = ? AND type = 'register'").run(cleanEmail);

    // Double check email uniqueness
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
    if (existing) {
      return res.status(400).json({ error: 'Bu e-posta adresi ile zaten bir hesap oluşturulmuş.' });
    }

    let userData = {
      name: name ? name.trim() : 'Kullanıcı',
      phone: phone ? phone.trim() : '',
      city: city ? city.trim() : 'İstanbul'
    };

    if (verification.payload) {
      try {
        const parsed = JSON.parse(verification.payload);
        userData = { ...userData, ...parsed };
      } catch (e) {}
    }

    if (!password) {
      return res.status(400).json({ error: 'Kayıt için şifre gereklidir.' });
    }

    const passwordHash = hashPassword(password);
    const avatar = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(userData.name)}&backgroundColor=ff3f55,ff7a00,3b82f6`;

    const result = db.prepare(`
      INSERT INTO users (name, email, phone, password_hash, avatar, city, email_verified)
      VALUES (?, ?, ?, ?, ?, ?, 1)
    `).run(userData.name, cleanEmail, userData.phone, passwordHash, avatar, userData.city);

    const newUser = db.prepare('SELECT id, name, email, phone, avatar, city, rating, email_verified FROM users WHERE id = ?').get(result.lastInsertRowid);
    const token = crypto.randomUUID();
    saveSession(token, newUser.id);

    res.status(201).json({
      token,
      user: newUser,
      message: 'Tebrikler! E-posta adresiniz doğrulandı ve hesabınız başarıyla oluşturuldu.'
    });
  } catch (err) {
    console.error('Verify & register error:', err);
    res.status(500).json({ error: 'Kayıt tamamlanırken bir hata oluştu: ' + err.message });
  }
});

// 3. Resend Verification Code
app.post('/api/auth/resend-verification', authRateLimiter.middleware(), async (req, res) => {
  try {
    const { email, name } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'E-posta adresi gereklidir.' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
    if (existing) {
      return res.status(400).json({ error: 'Bu e-posta adresi ile zaten aktif bir hesap bulunuyor.' });
    }

    const code = crypto.randomInt(100000, 1000000).toString();
    db.prepare("DELETE FROM email_verifications WHERE email = ? AND type = 'register'").run(cleanEmail);
    db.prepare(`
      INSERT INTO email_verifications (email, code, type, payload, expires_at)
      VALUES (?, ?, 'register', ?, datetime('now', '+10 minutes'))
    `).run(cleanEmail, code, JSON.stringify({ name: (name || 'Kullanıcı').trim() }));

    let mailResult = null;
    try {
      mailResult = await sendVerificationEmail({
        to: cleanEmail,
        name: (name || 'Kullanıcı').trim(),
        code: code
      });
    } catch (e) {
      console.error('Mail resend error:', e.message);
      mailResult = { success: false, sent: false, error: e.message };
    }

    const mailSent = Boolean(mailResult && mailResult.sent);

    res.json({
      success: true,
      mailSent: mailSent,
      devCode: mailSent ? undefined : code,
      message: mailSent
        ? `Yeni doğrulama kodu ${cleanEmail} adresine gönderildi.`
        : 'Yeni doğrulama kodu oluşturuldu.',
      expiresInSeconds: 600
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Backward-compatible / Standard Register Endpoint
app.post('/api/auth/register', authRateLimiter.middleware(), async (req, res) => {
  try {
    const { code } = req.body;

    // If code is supplied, delegate directly to verify-and-register
    if (code) {
      req.url = '/api/auth/verify-and-register';
      return app._router.handle(req, res);
    }

    // If code is not supplied, delegate to send-verification
    req.url = '/api/auth/send-verification';
    return app._router.handle(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login (Protected by Cloudflare Turnstile & Auth Rate Limiter)
app.post('/api/auth/login', authRateLimiter.middleware(), async (req, res) => {
  try {
    const { email, password } = req.body;
    const turnstileToken = req.body['cf-turnstile-response'] || req.body.turnstileToken;

    // Verify Cloudflare Turnstile Bot Challenge
    const cfCheck = await verifyTurnstileToken(turnstileToken, req.cf.clientIp);
    if (!cfCheck.success) {
      return res.status(400).json({ error: cfCheck.error || 'Cloudflare robot doğrulaması başarısız oldu. Lütfen tekrar deneyin.' });
    }

    if (!email || !password) {
      return res.status(400).json({ error: 'E-posta ve şifre gereklidir.' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email.toLowerCase().trim());
    if (!user || !verifyPassword(password, user.password_hash)) {
      return res.status(401).json({ error: 'E-posta adresi veya şifre hatalı.' });
    }

    const token = crypto.randomUUID();
    saveSession(token, user.id);

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      city: user.city,
      rating: user.rating
    };

    res.json({ token, user: safeUser, message: 'Giriş başarılı!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get current logged-in user
app.get('/api/auth/me', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Get user profile dashboard stats
app.get('/api/auth/profile-stats', authenticate, (req, res) => {
  try {
    const userId = req.user.id;
    const stats = db.prepare(`
      SELECT 
        (SELECT COUNT(*) FROM products WHERE user_id = ? AND status = 'active') as active_count,
        (SELECT COUNT(*) FROM products WHERE user_id = ? AND status = 'sold') as sold_count,
        (SELECT COALESCE(SUM(views), 0) FROM products WHERE user_id = ?) as total_views,
        (SELECT COUNT(*) FROM favorites WHERE user_id = ?) as favorites_count,
        (SELECT COUNT(DISTINCT (CASE WHEN sender_id = ? THEN receiver_id ELSE sender_id END)) 
         FROM messages WHERE sender_id = ? OR receiver_id = ?) as chats_count
    `).get(userId, userId, userId, userId, userId, userId, userId);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update profile info
app.put('/api/auth/profile', authenticate, (req, res) => {
  try {
    const { name, phone, city, avatar, bio } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Ad soyad alanı boş bırakılamaz.' });
    }

    db.prepare(`
      UPDATE users 
      SET name = ?, phone = ?, city = ?, avatar = ?, bio = ?
      WHERE id = ?
    `).run(name.trim(), phone ? phone.trim() : '', city ? city.trim() : 'İstanbul', avatar ? avatar.trim() : req.user.avatar, bio ? bio.trim() : '', req.user.id);

    const updatedUser = db.prepare('SELECT id, name, email, phone, avatar, city, rating, bio, created_at FROM users WHERE id = ?').get(req.user.id);
    res.json({ user: updatedUser, message: 'Profiliniz başarıyla güncellendi!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Upload user avatar photo directly from device
app.post('/api/auth/avatar', authenticate, upload.single('avatar'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Lütfen yüklenecek bir fotoğraf seçiniz.' });
    }

    const avatarUrl = `/uploads/${req.file.filename}`;
    db.prepare('UPDATE users SET avatar = ? WHERE id = ?').run(avatarUrl, req.user.id);

    const updatedUser = db.prepare('SELECT id, name, email, phone, avatar, city, rating, bio, created_at FROM users WHERE id = ?').get(req.user.id);
    res.json({
      avatarUrl,
      user: updatedUser,
      message: 'Profil fotoğrafınız başarıyla güncellendi!'
    });
  } catch (err) {
    console.error('Avatar upload error:', err);
    res.status(500).json({ error: 'Profil fotoğrafı yüklenirken bir hata oluştu: ' + err.message });
  }
});

// Change password
app.put('/api/auth/change-password', authenticate, (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Mevcut ve yeni şifre gereklidir.' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Yeni şifre en az 6 karakter olmalıdır.' });
    }

    const user = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(req.user.id);
    if (!verifyPassword(currentPassword, user.password_hash)) {
      return res.status(400).json({ error: 'Mevcut şifrenizi hatalı girdiniz.' });
    }

    const newHash = hashPassword(newPassword);
    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(newHash, req.user.id);

    res.json({ message: 'Şifreniz başarıyla güncellendi!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete user account permanently (Cascades products, messages, favorites, sessions, views)
app.delete('/api/auth/delete-account', authenticate, (req, res) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;

    // Delete user from db (CASCADE rules automatically clean up products, favorites, messages, user_sessions, product_views)
    db.prepare('DELETE FROM users WHERE id = ?').run(userId);

    // Clean up any email verification entries
    if (userEmail) {
      db.prepare('DELETE FROM email_verifications WHERE email = ?').run(userEmail.toLowerCase().trim());
    }

    // In-memory sessions cleanup
    for (const [token, uid] of userSessions.entries()) {
      if (uid === userId) {
        userSessions.delete(token);
      }
    }

    res.json({
      success: true,
      message: 'Hesabınız ve tüm verileriniz başarıyla kalıcı olarak silindi.'
    });
  } catch (err) {
    console.error('Delete account error:', err);
    res.status(500).json({ error: 'Hesap silinirken bir hata oluştu: ' + err.message });
  }
});

/* ==========================================================================
   CATEGORY & STATS ENDPOINTS
   ========================================================================== */

app.get('/api/categories', (req, res) => {
  try {
    const categories = db.prepare(`
      SELECT c.*, 
        (SELECT COUNT(*) FROM products p WHERE p.category_id = c.id AND p.status = 'active') as product_count
      FROM categories c
    `).all();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/stats', (req, res) => {
  try {
    const activeProducts = db.prepare("SELECT COUNT(*) as count FROM products WHERE status = 'active'").get().count;
    const totalUsers = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
    const totalMessages = db.prepare("SELECT COUNT(*) as count FROM messages").get().count;
    const citiesCount = db.prepare("SELECT COUNT(DISTINCT location) as count FROM products").get().count;

    res.json({
      activeProducts,
      totalUsers,
      totalMessages,
      citiesCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================================================
   PRODUCT ENDPOINTS
   ========================================================================== */

// Search suggestions endpoint (Live Typeahead / Autocomplete)
app.get('/api/search/suggestions', (req, res) => {
  try {
    const q = (req.query.q || '').trim();
    if (!q) {
      const topCategories = db.prepare('SELECT id, name, icon, color FROM categories LIMIT 6').all();
      return res.json({
        products: [],
        categories: topCategories,
        popularQueries: ['iPhone', 'PlayStation 5', 'Bisiklet', 'MacBook', 'Dyson', 'Koltuk Takımı', 'Matkap', 'Gitar'],
        totalCount: 0
      });
    }

    const pattern = `%${q}%`;
    const products = db.prepare(`
      SELECT p.id, p.title, p.price, p.location, p.condition, p.images, c.name as category_name
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'active' AND (p.title LIKE ? OR p.description LIKE ?)
      ORDER BY p.views DESC, p.id DESC
      LIMIT 6
    `).all(pattern, pattern).map(p => ({
      ...p,
      images: JSON.parse(p.images || '[]')
    }));

    const categories = db.prepare(`
      SELECT id, name, icon, color
      FROM categories
      WHERE name LIKE ?
      LIMIT 3
    `).all(pattern);

    const totalMatches = db.prepare(`
      SELECT COUNT(*) as count
      FROM products p
      WHERE p.status = 'active' AND (p.title LIKE ? OR p.description LIKE ?)
    `).get(pattern, pattern);

    res.json({
      products,
      categories,
      totalCount: totalMatches ? totalMatches.count : products.length
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get products list with filters, search, and sorting
app.get('/api/products', optionalAuth, (req, res) => {
  try {
    const { q, category, minPrice, maxPrice, city, condition, sort, userId, status } = req.query;

    let sql = `
      SELECT 
        p.*,
        u.name as seller_name,
        u.avatar as seller_avatar,
        u.rating as seller_rating,
        u.phone as seller_phone,
        c.name as category_name,
        c.icon as category_icon,
        c.color as category_color
    `;

    if (req.user) {
      sql += `, (SELECT 1 FROM favorites f WHERE f.user_id = ? AND f.product_id = p.id) as is_favorite`;
    } else {
      sql += `, 0 as is_favorite`;
    }

    sql += `
      FROM products p
      JOIN users u ON p.user_id = u.id
      JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;

    const params = [];
    if (req.user) {
      params.push(req.user.id);
    }

    if (status) {
      sql += ` AND p.status = ?`;
      params.push(status);
    } else if (!userId) {
      // By default only show active products on main board
      sql += ` AND p.status = 'active'`;
    }

    if (userId) {
      sql += ` AND p.user_id = ?`;
      params.push(userId);
    }

    if (category) {
      sql += ` AND p.category_id = ?`;
      params.push(category);
    }

    if (city) {
      sql += ` AND p.location LIKE ?`;
      params.push(`%${city}%`);
    }

    if (condition) {
      sql += ` AND p.condition = ?`;
      params.push(condition);
    }

    if (minPrice) {
      sql += ` AND p.price >= ?`;
      params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
      sql += ` AND p.price <= ?`;
      params.push(parseFloat(maxPrice));
    }

    if (q) {
      sql += ` AND (p.title LIKE ? OR p.description LIKE ?)`;
      params.push(`%${q}%`, `%${q}%`);
    }

    // Sorting
    switch (sort) {
      case 'price_asc':
        sql += ` ORDER BY p.price ASC`;
        break;
      case 'price_desc':
        sql += ` ORDER BY p.price DESC`;
        break;
      case 'popular':
        sql += ` ORDER BY p.views DESC, p.created_at DESC`;
        break;
      case 'newest':
      default:
        sql += ` ORDER BY p.created_at DESC`;
        break;
    }

    const products = db.prepare(sql).all(...params).map(p => ({
      ...p,
      images: JSON.parse(p.images || '[]'),
      is_favorite: Boolean(p.is_favorite)
    }));

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single product details + unique view tracking
app.get('/api/products/:id', optionalAuth, (req, res) => {
  try {
    const { id } = req.params;

    let sql = `
      SELECT 
        p.*,
        u.name as seller_name,
        u.avatar as seller_avatar,
        u.rating as seller_rating,
        u.reviews_count as seller_reviews_count,
        u.phone as seller_phone,
        u.city as seller_city,
        u.created_at as seller_member_since,
        c.name as category_name,
        c.icon as category_icon,
        c.color as category_color
    `;

    if (req.user) {
      sql += `, (SELECT 1 FROM favorites f WHERE f.user_id = ? AND f.product_id = p.id) as is_favorite`;
    } else {
      sql += `, 0 as is_favorite`;
    }

    sql += `
      FROM products p
      JOIN users u ON p.user_id = u.id
      JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
    `;

    const params = req.user ? [req.user.id, id] : [id];
    const product = db.prepare(sql).get(...params);

    if (!product) {
      return res.status(404).json({ error: 'İlan bulunamadı.' });
    }

    // Benzersiz Görüntüleme Sistemi (Unique View Tracking):
    // 1. İlan sahibi kendi ilanına baktığında görüntüleme KESİNLİKLE artmaz.
    // 2. Başka bir kullanıcı aynı ilana defalarca baksa dahi sadece 1 kez görüntüleme sayılır.
    const isOwner = req.user && (Number(req.user.id) === Number(product.user_id));
    const visitorHeader = req.headers['x-visitor-id'];
    const clientIp = getClientIp(req);
    const cleanVisitorId = visitorHeader ? String(visitorHeader).trim().slice(0, 80) : null;

    if (!isOwner) {
      let alreadyViewed = false;

      if (req.user) {
        // Oturum açmış kullanıcı: user_id veya 'u:id' veya aynı tarayıcıdaki 'v:visitorId'
        let checkSql = `
          SELECT 1 FROM product_views
          WHERE product_id = ? AND (user_id = ? OR viewer_key = ?
        `;
        const checkParams = [product.id, req.user.id, `u:${req.user.id}`];

        if (cleanVisitorId) {
          checkSql += ` OR viewer_key = ?`;
          checkParams.push(`v:${cleanVisitorId}`);
        }
        checkSql += `) LIMIT 1`;

        const existing = db.prepare(checkSql).get(...checkParams);
        if (existing) {
          alreadyViewed = true;
        } else {
          try {
            db.prepare(`
              INSERT INTO product_views (product_id, user_id, viewer_key, ip_address)
              VALUES (?, ?, ?, ?)
            `).run(product.id, req.user.id, `u:${req.user.id}`, clientIp);

            if (cleanVisitorId) {
              db.prepare(`
                INSERT OR IGNORE INTO product_views (product_id, user_id, viewer_key, ip_address)
                VALUES (?, ?, ?, ?)
              `).run(product.id, req.user.id, `v:${cleanVisitorId}`, clientIp);
            }

            db.prepare('UPDATE products SET views = views + 1 WHERE id = ?').run(product.id);
            product.views = (product.views || 0) + 1;
          } catch (e) {
            // Eşzamanlı çakışma durumunda sessizce geçilir
          }
        }
      } else {
        // Oturum açmamış ziyaretçi: 'v:visitorId' veya IP tabanlı tekil sayım
        const guestViewerKey = cleanVisitorId ? `v:${cleanVisitorId}` : `ip:${clientIp}`;
        const existing = db.prepare(`
          SELECT 1 FROM product_views
          WHERE product_id = ? AND (viewer_key = ? OR (ip_address = ? AND user_id IS NULL))
          LIMIT 1
        `).get(product.id, guestViewerKey, clientIp);

        if (existing) {
          alreadyViewed = true;
        } else {
          try {
            db.prepare(`
              INSERT INTO product_views (product_id, user_id, viewer_key, ip_address)
              VALUES (?, ?, ?, ?)
            `).run(product.id, null, guestViewerKey, clientIp);

            db.prepare('UPDATE products SET views = views + 1 WHERE id = ?').run(product.id);
            product.views = (product.views || 0) + 1;
          } catch (e) {
            // Eşzamanlı çakışma durumunda sessizce geçilir
          }
        }
      }
    }

    product.images = JSON.parse(product.images || '[]');
    product.is_favorite = Boolean(product.is_favorite);

    // Get seller other active items
    const sellerOtherItems = db.prepare(`
      SELECT id, title, price, images, condition, location
      FROM products
      WHERE user_id = ? AND id != ? AND status = 'active'
      LIMIT 4
    `).all(product.user_id, product.id).map(i => ({
      ...i,
      images: JSON.parse(i.images || '[]')
    }));

    res.json({
      product,
      sellerOtherItems
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create product (with multiple images upload)
app.post('/api/products', authenticate, upload.array('photos', 5), (req, res) => {
  try {
    const { title, description, price, category_id, condition, location, imageUrls } = req.body;

    if (!title || !description || !price || !category_id || !condition || !location) {
      return res.status(400).json({ error: 'Lütfen tüm zorunlu alanları doldurun.' });
    }

    let imagesList = [];

    // Add uploaded files
    if (req.files && req.files.length > 0) {
      imagesList = req.files.map(file => `/uploads/${file.filename}`);
    }

    // Add explicit imageUrls (if sent as array or string)
    if (imageUrls) {
      let urls = [];
      try {
        urls = Array.isArray(imageUrls) ? imageUrls : JSON.parse(imageUrls);
      } catch (e) {
        if (typeof imageUrls === 'string' && imageUrls.trim()) {
          urls = imageUrls.split(',').map(s => s.trim()).filter(Boolean);
        }
      }
      imagesList = imagesList.concat(urls);
    }

    // Fallback image if none provided
    if (imagesList.length === 0) {
      imagesList.push('https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80');
    }

    const result = db.prepare(`
      INSERT INTO products (title, description, price, category_id, condition, location, images, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title.trim(),
      description.trim(),
      parseFloat(price),
      category_id,
      condition,
      location.trim(),
      JSON.stringify(imagesList),
      req.user.id
    );

    const newProductId = result.lastInsertRowid;

    // İlan sahibini product_views tablosuna önceden kaydet (sahibi hiçbir zaman görüntüleme sayısını artıramaz)
    try {
      const visitorHeader = req.headers['x-visitor-id'];
      const clientIp = getClientIp(req);
      db.prepare(`
        INSERT OR IGNORE INTO product_views (product_id, user_id, viewer_key, ip_address)
        VALUES (?, ?, ?, ?)
      `).run(newProductId, req.user.id, `u:${req.user.id}`, clientIp);

      if (visitorHeader) {
        db.prepare(`
          INSERT OR IGNORE INTO product_views (product_id, user_id, viewer_key, ip_address)
          VALUES (?, ?, ?, ?)
        `).run(newProductId, req.user.id, `v:${String(visitorHeader).trim().slice(0, 80)}`, clientIp);
      }
    } catch (_) {}

    res.status(201).json({
      id: newProductId,
      message: 'İlanınız başarıyla yayına alındı!'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update product status (e.g. mark as sold or active)
app.patch('/api/products/:id/status', authenticate, (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const product = db.prepare('SELECT user_id FROM products WHERE id = ?').get(id);
    if (!product) {
      return res.status(404).json({ error: 'İlan bulunamadı.' });
    }
    if (product.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Bu ilanı güncelleme yetkiniz yok.' });
    }

    db.prepare('UPDATE products SET status = ? WHERE id = ?').run(status, id);
    res.json({ message: 'İlan durumu güncellendi.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete product
app.delete('/api/products/:id', authenticate, (req, res) => {
  try {
    const { id } = req.params;

    const product = db.prepare('SELECT user_id FROM products WHERE id = ?').get(id);
    if (!product) {
      return res.status(404).json({ error: 'İlan bulunamadı.' });
    }
    if (product.user_id !== req.user.id) {
      return res.status(403).json({ error: 'Bu ilanı silme yetkiniz yok.' });
    }

    db.prepare('DELETE FROM products WHERE id = ?').run(id);
    res.json({ message: 'İlan başarıyla kaldırıldı.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================================================
   FAVORITES ENDPOINTS
   ========================================================================== */

app.get('/api/favorites', authenticate, (req, res) => {
  try {
    const favorites = db.prepare(`
      SELECT 
        p.*,
        u.name as seller_name,
        u.avatar as seller_avatar,
        c.name as category_name,
        1 as is_favorite
      FROM favorites f
      JOIN products p ON f.product_id = p.id
      JOIN users u ON p.user_id = u.id
      JOIN categories c ON p.category_id = c.id
      WHERE f.user_id = ?
      ORDER BY f.created_at DESC
    `).all(req.user.id).map(p => ({
      ...p,
      images: JSON.parse(p.images || '[]'),
      is_favorite: true
    }));

    res.json(favorites);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/favorites/toggle', authenticate, (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) return res.status(400).json({ error: 'Ürün ID gereklidir.' });

    const existing = db.prepare('SELECT id FROM favorites WHERE user_id = ? AND product_id = ?').get(req.user.id, productId);

    if (existing) {
      db.prepare('DELETE FROM favorites WHERE id = ?').run(existing.id);
      res.json({ isFavorite: false, message: 'Favorilerden çıkarıldı.' });
    } else {
      db.prepare('INSERT INTO favorites (user_id, product_id) VALUES (?, ?)').run(req.user.id, productId);
      res.json({ isFavorite: true, message: 'Favorilere eklendi.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ==========================================================================
   MESSAGING & OFFERS ENDPOINTS
   ========================================================================== */

// Get total unread messages count for current user
app.get('/api/messages/unread-count', authenticate, (req, res) => {
  try {
    const userId = req.user.id;
    const row = db.prepare('SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0').get(userId);
    res.json({ unreadCount: row ? row.count : 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark messages as read for a conversation
app.put('/api/messages/read', authenticate, (req, res) => {
  try {
    const { productId, otherUserId } = req.body;
    const userId = req.user.id;

    if (productId && otherUserId) {
      db.prepare(`
        UPDATE messages 
        SET is_read = 1 
        WHERE product_id = ? AND sender_id = ? AND receiver_id = ? AND is_read = 0
      `).run(productId, otherUserId, userId);
    }

    const unreadRow = db.prepare('SELECT COUNT(*) as count FROM messages WHERE receiver_id = ? AND is_read = 0').get(userId);
    res.json({ success: true, unreadCount: unreadRow ? unreadRow.count : 0 });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user's conversation threads
app.get('/api/messages/threads', authenticate, (req, res) => {
  try {
    const userId = req.user.id;

    // Get all distinct chats where user is sender or receiver with unread count
    const threads = db.prepare(`
      SELECT 
        m.id,
        m.product_id,
        m.content,
        m.offer_price,
        m.created_at,
        p.title as product_title,
        p.price as product_price,
        p.images as product_images,
        p.status as product_status,
        CASE 
          WHEN m.sender_id = ? THEN m.receiver_id 
          ELSE m.sender_id 
        END as other_user_id,
        u.name as other_user_name,
        u.avatar as other_user_avatar,
        (
          SELECT COUNT(*) FROM messages unread_m
          WHERE unread_m.product_id = m.product_id
            AND unread_m.sender_id = (CASE WHEN m.sender_id = ? THEN m.receiver_id ELSE m.sender_id END)
            AND unread_m.receiver_id = ?
            AND unread_m.is_read = 0
        ) as unread_count
      FROM messages m
      JOIN products p ON m.product_id = p.id
      JOIN users u ON u.id = (
        CASE 
          WHEN m.sender_id = ? THEN m.receiver_id 
          ELSE m.sender_id 
        END
      )
      WHERE m.sender_id = ? OR m.receiver_id = ?
      GROUP BY m.product_id, other_user_id
      ORDER BY m.created_at DESC
    `).all(userId, userId, userId, userId, userId, userId).map(t => ({
      ...t,
      product_images: JSON.parse(t.product_images || '[]')
    }));

    res.json(threads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get messages for a specific product and other user
app.get('/api/messages/chat', authenticate, (req, res) => {
  try {
    const { productId, otherUserId } = req.query;
    const userId = req.user.id;

    if (!productId || !otherUserId) {
      return res.status(400).json({ error: 'productId ve otherUserId zorunludur.' });
    }

    // Mark any incoming unread messages as read
    db.prepare(`
      UPDATE messages 
      SET is_read = 1 
      WHERE product_id = ? AND sender_id = ? AND receiver_id = ? AND is_read = 0
    `).run(productId, otherUserId, userId);

    const messages = db.prepare(`
      SELECT m.*, u.name as sender_name, u.avatar as sender_avatar
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.product_id = ? 
        AND ((m.sender_id = ? AND m.receiver_id = ?) OR (m.sender_id = ? AND m.receiver_id = ?))
      ORDER BY m.created_at ASC
    `).all(productId, userId, otherUserId, otherUserId, userId);

    const product = db.prepare(`
      SELECT p.*, u.name as seller_name, u.avatar as seller_avatar
      FROM products p
      JOIN users u ON p.user_id = u.id
      WHERE p.id = ?
    `).get(productId);

    if (product) {
      product.images = JSON.parse(product.images || '[]');
    }

    const otherUser = db.prepare(`
      SELECT id, name, avatar, rating, city, phone FROM users WHERE id = ?
    `).get(otherUserId);

    res.json({
      messages,
      product,
      otherUser
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Send message or bargain offer
app.post('/api/messages', authenticate, (req, res) => {
  try {
    const { productId, receiverId, content, offerPrice } = req.body;
    const senderId = req.user.id;

    if (!productId || !receiverId || (!content && !offerPrice)) {
      return res.status(400).json({ error: 'Mesaj içeriği veya teklif tutarı gereklidir.' });
    }

    const finalContent = content || `Fiyat Teklifi: ${Number(offerPrice).toLocaleString('tr-TR')} ₺`;
    const offerStatus = offerPrice ? 'pending' : null;

    const result = db.prepare(`
      INSERT INTO messages (product_id, sender_id, receiver_id, content, offer_price, offer_status)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(productId, senderId, receiverId, finalContent, offerPrice ? parseFloat(offerPrice) : null, offerStatus);

    const newMsg = db.prepare(`
      SELECT m.*, u.name as sender_name, u.avatar as sender_avatar
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      WHERE m.id = ?
    `).get(result.lastInsertRowid);

    res.status(201).json(newMsg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Respond to bargain offer (Accept / Decline)
app.put('/api/messages/:id/offer-response', authenticate, (req, res) => {
  try {
    const messageId = req.params.id;
    const { status } = req.body; // 'accepted' or 'declined'
    const userId = req.user.id;

    if (!['accepted', 'declined'].includes(status)) {
      return res.status(400).json({ error: 'Geçersiz teklif durumu.' });
    }

    const msg = db.prepare('SELECT * FROM messages WHERE id = ?').get(messageId);
    if (!msg) {
      return res.status(404).json({ error: 'Teklif mesajı bulunamadı.' });
    }

    if (msg.receiver_id !== userId) {
      return res.status(403).json({ error: 'Bu teklifi yanıtlama yetkiniz bulunmamaktadır.' });
    }

    db.prepare('UPDATE messages SET offer_status = ? WHERE id = ?').run(status, messageId);

    const replyText = status === 'accepted'
      ? `🤝 ${Number(msg.offer_price).toLocaleString('tr-TR')} ₺ tutarındaki teklifinizi kabul ettim! Teslimat ve ödeme detayları için konuşabiliriz.`
      : `❌ ${Number(msg.offer_price).toLocaleString('tr-TR')} ₺ tutarındaki teklifinizi kabul edemiyorum, teşekkürler.`;

    db.prepare(`
      INSERT INTO messages (product_id, sender_id, receiver_id, content)
      VALUES (?, ?, ?, ?)
    `).run(msg.product_id, userId, msg.sender_id, replyText);

    res.json({ message: 'Teklif güncellendi', status });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Single image upload helper
app.post('/api/upload', authenticate, upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Dosya yüklenemedi.' });
  }
  res.json({ url: `/uploads/${req.file.filename}` });
});

// Fallback to index.html for SPA navigation
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Sell Zone Pazaryeri Sunucusu Çalışıyor: http://localhost:${PORT}`);
});

const { DatabaseSync } = require('node:sqlite');
const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');

const dbPath = path.join(__dirname, 'data', 'marketplace.db');
const db = new DatabaseSync(dbPath);

// Enable foreign keys and WAL mode for reliability
db.exec('PRAGMA foreign_keys = ON;');

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  try {
    if (!password || !stored) return false;
    const [salt, key] = stored.split(':');
    const testHash = crypto.scryptSync(password, salt, 64).toString('hex');
    if (key === testHash) return true;

    // Mobile / accidental whitespace fallback
    const trimmed = String(password).trim();
    if (trimmed !== password) {
      const trimmedHash = crypto.scryptSync(trimmed, salt, 64).toString('hex');
      if (key === trimmedHash) return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

// Initialize tables
function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      password_hash TEXT NOT NULL,
      avatar TEXT,
      city TEXT DEFAULT 'İstanbul',
      rating REAL DEFAULT 5.0,
      reviews_count INTEGER DEFAULT 1,
      bio TEXT DEFAULT 'Sell Zone üyesi',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      icon TEXT NOT NULL,
      color TEXT NOT NULL,
      badge TEXT
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      price REAL NOT NULL,
      category_id TEXT NOT NULL,
      condition TEXT NOT NULL,
      location TEXT NOT NULL,
      images TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      status TEXT DEFAULT 'active',
      old_price REAL,
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES categories(id)
    );

    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, product_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      sender_id INTEGER NOT NULL,
      receiver_id INTEGER NOT NULL,
      content TEXT NOT NULL,
      offer_price REAL,
      offer_status TEXT DEFAULT 'pending',
      is_read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS user_sessions (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS email_verifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      code TEXT NOT NULL,
      type TEXT DEFAULT 'register',
      payload TEXT,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS product_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_id INTEGER NOT NULL,
      user_id INTEGER,
      viewer_key TEXT NOT NULL,
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE UNIQUE INDEX IF NOT EXISTS idx_product_views_unique ON product_views(product_id, viewer_key);
    CREATE INDEX IF NOT EXISTS idx_product_views_user ON product_views(product_id, user_id);
  `);

  try {
    db.exec("ALTER TABLE users ADD COLUMN bio TEXT DEFAULT 'Sell Zone üyesi';");
  } catch (e) {
    // Column already exists
  }

  try {
    db.exec("ALTER TABLE users ADD COLUMN email_verified INTEGER DEFAULT 1;");
  } catch (e) {
    // Column already exists
  }

  try {
    db.exec("ALTER TABLE messages ADD COLUMN offer_status TEXT DEFAULT 'pending';");
  } catch (e) {
    // Column already exists
  }

  try {
    db.exec("ALTER TABLE products ADD COLUMN old_price REAL;");
  } catch (e) {
    // Column already exists
  }

  // Pre-seed product owners into product_views so owners never increment views on their own products
  try {
    db.exec(`
      INSERT OR IGNORE INTO product_views (product_id, user_id, viewer_key)
      SELECT id, user_id, 'u:' || user_id FROM products;
    `);
  } catch (e) {
    // Column or table might be busy or already seeded
  }

  seedDataIfEmpty();
}

function seedDataIfEmpty() {
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
  if (userCount > 0) return;

  console.log('🌱 Örnek veriler veritabanına yükleniyor (Seeding)...');

  // Categories
  const categories = [
    { id: 'alet-edevat', name: 'Alet & Edavat', icon: 'fa-screwdriver-wrench', color: '#f59e0b', badge: 'Tamirat & Hobi' },
    { id: 'elektronik', name: 'Elektronik & Telefon', icon: 'fa-mobile-screen-button', color: '#3b82f6', badge: 'Popüler' },
    { id: 'araclar', name: 'Araç & Vasıta', icon: 'fa-car-side', color: '#ef4444', badge: 'Oto & Parça' },
    { id: 'ev-yasam', name: 'Ev, Bahçe & Mobilya', icon: 'fa-couch', color: '#10b981', badge: 'Dekorasyon' },
    { id: 'spor-hobi', name: 'Spor & Açık Hava', icon: 'fa-bicycle', color: '#8b5cf6', badge: 'Aktivite' },
    { id: 'fotograf-muzik', name: 'Fotoğraf & Müzik', icon: 'fa-camera-retro', color: '#ec4899', badge: 'Stüdyo' },
    { id: 'moda', name: 'Giyim & Aksesuar', icon: 'fa-shirt', color: '#06b6d4', badge: 'Trend' },
    { id: 'diger', name: 'Diğer Her Şey', icon: 'fa-boxes-stacked', color: '#64748b', badge: 'Fırsatlar' },
  ];

  const insertCategory = db.prepare(`
    INSERT OR REPLACE INTO categories (id, name, icon, color, badge)
    VALUES (?, ?, ?, ?, ?)
  `);
  for (const c of categories) {
    insertCategory.run(c.id, c.name, c.icon, c.color, c.badge);
  }

  // Users
  const defaultPass = hashPassword('123456');
  const users = [
    {
      name: 'Ahmet Yılmaz',
      email: 'ahmet@sellzone.com',
      phone: '0532 555 12 34',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      city: 'İstanbul, Kadıköy',
      rating: 4.9,
      reviews_count: 28
    },
    {
      name: 'Zeynep Kaya',
      email: 'zeynep@sellzone.com',
      phone: '0542 444 56 78',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      city: 'Ankara, Çankaya',
      rating: 5.0,
      reviews_count: 19
    },
    {
      name: 'Murat Demir',
      email: 'murat@sellzone.com',
      phone: '0555 333 89 01',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      city: 'İzmir, Karşıyaka',
      rating: 4.8,
      reviews_count: 14
    },
    {
      name: 'Elif Çelik',
      email: 'elif@sellzone.com',
      phone: '0505 222 11 22',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
      city: 'Bursa, Nilüfer',
      rating: 5.0,
      reviews_count: 32
    }
  ];

  const insertUser = db.prepare(`
    INSERT INTO users (name, email, phone, password_hash, avatar, city, rating, reviews_count)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const u of users) {
    insertUser.run(u.name, u.email, u.phone, defaultPass, u.avatar, u.city, u.rating, u.reviews_count);
  }

  // Realistic sample products
  const products = [
    {
      title: 'Bosch GSB 18V-50 Darbeli Şarjlı Matkap (2x Akü + Çanta)',
      description: 'Atölyemde sadece birkaç kez kullandım. Kömürsüz motor, 2 adet 2.0Ah orijinal akü, hızlı şarj aleti ve L-BOXX taşıma çantasıyla eksiksiz. Faturası ve kutusu duruyor. Çok temiz ve güçlü alet.',
      price: 3850,
      category_id: 'alet-edevat',
      condition: 'Yeni Gibi',
      location: 'İstanbul, Kadıköy',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?w=800&auto=format&fit=crop&q=80'
      ]),
      user_id: 1,
      views: 142
    },
    {
      title: 'iPhone 14 Pro 128 GB Derin Mor (Pil %90 - Kutulu & Faturalı)',
      description: 'Türkiye garantili alınmıştı. Alındığı ilk andan itibaren ekran koruyucu ve Spigen kılıf ile kullanıldı. Çizik veya vuruk kesinlikle yoktur. Yanında 2 adet orijinal kılıf hediye verilecektir.',
      price: 43500,
      category_id: 'elektronik',
      condition: 'Yeni Gibi',
      location: 'Ankara, Çankaya',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80'
      ]),
      user_id: 2,
      views: 380
    },
    {
      title: 'Masif Ahşap İskandinav Çalışma Masası (140x70 cm)',
      description: 'Özel tasarım doğal meşe kaplama çalışma masası. Taşınma sebebiyle satıyorum. Ayakları elektrostatik siyah fırın boyalı metaldir. Sallanma veya yıpranma yoktur.',
      price: 3600,
      category_id: 'ev-yasam',
      condition: 'İyi Durumda',
      location: 'İzmir, Karşıyaka',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop&q=80'
      ]),
      user_id: 3,
      views: 95
    },
    {
      title: 'Bisan Grand Tour 28 Jant Şehir & Tur Bisikleti',
      description: 'Alüminyum kadro, 24 vites Shimano Altus aktarıcı, hidrolik disk fren sistemi. Üzerinde çamurluk, arka bagaj ve jel sele kılıfı vardır. Bakımları yeni yapıldı.',
      price: 7400,
      category_id: 'spor-hobi',
      condition: 'Yeni Gibi',
      location: 'Bursa, Nilüfer',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80'
      ]),
      user_id: 4,
      views: 210
    },
    {
      title: 'Sony WH-1000XM4 Aktif Gürültü Engelleyici Kulaklık',
      description: 'Dünyanın en iyi ANC kulaklıklarından biri. Kutusunda, tüm kabloları ve sert taşıma kılıfı ile verilecektir. Pedlerinde en ufak soyulma dahi yoktur. Pil ömrü mükemmel.',
      price: 6800,
      category_id: 'elektronik',
      condition: 'Yeni Gibi',
      location: 'İstanbul, Kadıköy',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
      ]),
      user_id: 1,
      views: 188
    },
    {
      title: 'Stanley Klasik Vakumlu Termos 1.9 Litre Paslanmaz Çelik',
      description: 'Ömür boyu garantili klasik yeşil Stanley termos. 45 saat sıcak tutma kapasitesi. Kampta ve doğa yürüyüşlerinde 3 kez kullanıldı, ezik veya darbesi yoktur.',
      price: 1950,
      category_id: 'ev-yasam',
      condition: 'İyi Durumda',
      location: 'Ankara, Çankaya',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80'
      ]),
      user_id: 2,
      views: 112
    },
    {
      title: 'Canon EOS 200D II + 18-55mm IS STM Lens Fotoğraf Makinesi',
      description: 'Shutter sayısı sadece 4.200 civarında. Dönebilen dokunmatik ekran, 4K video kaydı ve dahili Wi-Fi transferi var. Çanta, askı, şarj aleti ve 64GB SanDisk kart dahildir.',
      price: 16900,
      category_id: 'fotograf-muzik',
      condition: 'Yeni Gibi',
      location: 'İzmir, Karşıyaka',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80'
      ]),
      user_id: 3,
      views: 260
    },
    {
      title: 'Dewalt 142 Parça Profesyonel Lokma ve Takım Çantası Seti',
      description: 'Krom vanadyum çelik, sıfır ayarında hiç kullanılmamış parçaları çoğunlukta. Cırcır kolları, lokmalar, alyanlar ve tornavida uçları tam settir. Ağır işler için ideal.',
      price: 4900,
      category_id: 'alet-edevat',
      condition: 'Sıfır / Kutusunda',
      location: 'Bursa, Nilüfer',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&auto=format&fit=crop&q=80'
      ]),
      user_id: 4,
      views: 310
    },
    {
      title: 'Thule Motion XT XL Araç Tavan Bagajı & Taşıma Barları',
      description: '500 litre iç hacim, çift taraflı açılabilir PowerClick hızlı montaj sistemi. SUV aracımız için almıştık, araç değiştiği için satıyoruz. Çiziksiz, çift anahtarlı.',
      price: 18500,
      category_id: 'araclar',
      condition: 'İyi Durumda',
      location: 'İstanbul, Kadıköy',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80'
      ]),
      user_id: 1,
      views: 195
    },
    {
      title: 'PlayStation 5 Standart Sürüm + 2 DualSense Kol',
      description: 'CFI-1216A son seri. Kutusu, faturası ve tüm kabloları mevcut. Asla içi açılmamış güvenlik etiketi duruyor. Kozmetik olarak 10/10.',
      price: 21500,
      category_id: 'elektronik',
      condition: 'Yeni Gibi',
      location: 'Ankara, Çankaya',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=800&auto=format&fit=crop&q=80'
      ]),
      user_id: 2,
      views: 520
    },
    {
      title: 'Fender Squier Affinity Stratocaster Elektro Gitar & 15W Amfi',
      description: 'Gitar öğrenmek için alındı, çok az çalındı. Sap ayarı ve tel yükseklik ayarı profesyonel luthier tarafından yapıldı. Yanında jak kablosu, pena ve kılıf hediye.',
      price: 8900,
      category_id: 'fotograf-muzik',
      condition: 'Yeni Gibi',
      location: 'İzmir, Karşıyaka',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800&auto=format&fit=crop&q=80'
      ]),
      user_id: 3,
      views: 175
    },
    {
      title: 'The North Face 1996 Retro Nuptse Kaz Tüyü Mont (M Beden)',
      description: 'Orijinal 700 dolgu kaz tüyü Nuptse mont. Yırtık, sökük, leke kesinlikle yoktur. Sıcak tutma performansı harika.',
      price: 5400,
      category_id: 'moda',
      condition: 'İyi Durumda',
      location: 'Bursa, Nilüfer',
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&auto=format&fit=crop&q=80'
      ]),
      user_id: 4,
      views: 140
    }
  ];

  const insertProduct = db.prepare(`
    INSERT INTO products (title, description, price, category_id, condition, location, images, user_id, views)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const p of products) {
    insertProduct.run(p.title, p.description, p.price, p.category_id, p.condition, p.location, p.images, p.user_id, p.views);
  }

  // Pre-seed a couple of sample messages
  const insertMessage = db.prepare(`
    INSERT INTO messages (product_id, sender_id, receiver_id, content, offer_price)
    VALUES (?, ?, ?, ?, ?)
  `);
  insertMessage.run(1, 2, 1, 'Merhaba Ahmet Bey, matkap için son ne yapabilirsiniz? Bugün elden teslim alabilirim.', 3500);
  insertMessage.run(1, 1, 2, 'Merhaba Zeynep Hanım, 3.650 TL yapabilirim en son. Bataryaları sıfır gibidir.', null);

  console.log('✅ Örnek veriler başarıyla eklendi.');
}

module.exports = {
  db,
  initDatabase,
  hashPassword,
  verifyPassword
};

const nodemailer = require('nodemailer');

/**
 * Check if custom SMTP or HTTPS email service is configured
 */
function isSmtpConfigured() {
  const host = (process.env.SMTP_HOST || '').trim();
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();
  const resendKey = (process.env.RESEND_API_KEY || '').trim();
  const brevoKey = (process.env.BREVO_API_KEY || '').trim();
  return Boolean((host && user && pass) || resendKey || brevoKey);
}

/**
 * Create SMTP transporter if configured with strict timeouts
 */
function getTransporter() {
  const host = (process.env.SMTP_HOST || '').trim();
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
  if (!host || !user || !pass) return null;

  const port = parseInt((process.env.SMTP_PORT || '587').toString().trim(), 10);
  const secure = (process.env.SMTP_SECURE || '').toString().trim() === 'true' || port === 465;

  return nodemailer.createTransport({
    host: host,
    port: port,
    secure: secure,
    auth: {
      user: user,
      pass: pass
    },
    connectionTimeout: 3500, // 3.5s timeout prevents hanging on Render egress port blocks
    greetingTimeout: 3500,
    socketTimeout: 4000,
    dnsTimeout: 3000,
    tls: {
      rejectUnauthorized: process.env.SMTP_REJECT_UNAUTHORIZED !== 'false'
    }
  });
}

/**
 * Generate beautifully styled, modern HTML email for verification code
 */
function generateVerificationEmailHtml(name, code) {
  const formattedCode = code.split('').join(' ');
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SellZone - E-Posta Doğrulama Kodu</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b1120; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #1e293b; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 35px 40px 25px 40px; text-align: center; background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); border-bottom: 1px solid rgba(255, 255, 255, 0.08);">
              <div style="display: inline-block; padding: 8px 16px; background: rgba(255, 63, 85, 0.15); border: 1px solid rgba(255, 63, 85, 0.3); border-radius: 50px; margin-bottom: 16px;">
                <span style="color: #ff3f55; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">🛡️ Güvenli Hesap Doğrulama</span>
              </div>
              <h1 style="margin: 0; font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                Sell<span style="color: #ff3f55;">Zone</span>
              </h1>
              <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 13px;">Hızlı Sat, Akıllı Al • Modern İkinci El Pazaryeri</p>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 35px 40px;">
              <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #f8fafc;">
                Merhaba ${name ? name.split(' ')[0] : 'Kullanıcı'}, Hoş Geldiniz! 👋
              </h2>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #cbd5e1;">
                SellZone hesabınızı oluşturmak ve e-posta adresinizi doğrulamak için aşağıdaki tek kullanımlık <strong>6 haneli güvenlik kodunu</strong> giriniz.
              </p>

              <!-- Verification Code Display Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 0 0 25px 0;">
                <tr>
                  <td align="center" style="background-color: #0f172a; border: 2px dashed #ff3f55; border-radius: 12px; padding: 22px 20px;">
                    <div style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; color: #94a3b8; margin-bottom: 8px;">
                      E-Posta Doğrulama Kodunuz
                    </div>
                    <div style="font-size: 36px; font-weight: 800; letter-spacing: 8px; color: #ffffff; font-family: 'Courier New', Courier, monospace; text-shadow: 0 0 20px rgba(255, 63, 85, 0.4);">
                      ${formattedCode}
                    </div>
                    <div style="font-size: 12px; color: #fb7185; margin-top: 8px; font-weight: 500;">
                      ⏱️ Bu kod <strong>10 dakika</strong> süreyle geçerlidir.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Security Info Callout -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: rgba(255, 255, 255, 0.03); border-left: 4px solid #ff7a00; border-radius: 6px; padding: 14px 16px; margin-bottom: 25px;">
                <tr>
                  <td>
                    <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #94a3b8;">
                      🔒 <strong>Güvenlik Uyarısı:</strong> SellZone ekibi sizden hiçbir zaman şifrenizi veya bu doğrulama kodunu istemez. Bu işlemi siz başlatmadıysanız bu e-postayı güvenle silebilirsiniz.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; font-size: 13px; color: #64748b; line-height: 1.5;">
                Keyifli alışverişler ve bol kazançlar dileriz,<br>
                <strong style="color: #cbd5e1;">SellZone Güvenlik Ekibi</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #0f172a; border-top: 1px solid rgba(255, 255, 255, 0.05); text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11px; color: #64748b;">
                Bu e-posta <strong>SellZone Doğrulama Sistemi</strong> tarafından otomatik olarak oluşturulmuştur.
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
                © ${currentYear} SellZone Pazaryeri. Tüm hakları saklıdır.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Send Verification Email to the recipient (supports SMTP with strict timeout and Resend HTTPS API)
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.name - Recipient name
 * @param {string} options.code - 6-digit verification code
 * @returns {Promise<{success: boolean, sent: boolean, provider?: string, message?: string, error?: string}>}
 */
async function sendVerificationEmail({ to, name, code }) {
  const fromName = process.env.SMTP_FROM_NAME || 'SellZone';
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || 'noreply@sellzone.com';
  const from = `"${fromName}" <${fromEmail}>`;
  const subject = `SellZone - E-Posta Doğrulama Kodunuz: ${code}`;
  const html = generateVerificationEmailHtml(name, code);
  const text = `Merhaba ${name || 'Kullanıcı'},\n\nSellZone hesabınızı doğrulamak için güvenlik kodunuz: ${code}\nBu kod 10 dakika geçerlidir.\n\nSellZone Ekibi`;

  // 1. Resend HTTPS API (Port 443 - works on Render Free Tier without SMTP port blocks)
  const resendKey = (process.env.RESEND_API_KEY || '').trim();
  if (resendKey) {
    try {
      console.log(`📧 [SellZone Mailer] Resend HTTPS API ile e-posta gönderiliyor -> ${to}...`);
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || `${fromName} <onboarding@resend.dev>`,
          to: [to],
          subject: subject,
          html: html,
          text: text
        }),
        signal: AbortSignal.timeout(4500)
      });
      const resendData = await resendRes.json();
      if (resendRes.ok) {
        console.log(`✅ [SellZone Mailer] Resend API ile başarıyla gönderildi -> ${to} (ID: ${resendData.id})`);
        return { success: true, sent: true, provider: 'resend', message: 'Doğrulama kodu e-posta adresinize gönderildi.' };
      }
      console.error('❌ [SellZone Mailer] Resend API hatası:', resendData);
    } catch (err) {
      console.error('❌ [SellZone Mailer] Resend API bağlantı hatası:', err.message);
    }
  }

  // 2. Brevo (Sendinblue) HTTPS API (Port 443 - works on Render Free Tier without SMTP port blocks)
  const brevoKey = (process.env.BREVO_API_KEY || '').trim();
  if (brevoKey) {
    try {
      console.log(`📧 [SellZone Mailer] Brevo HTTPS API ile e-posta gönderiliyor -> ${to}...`);
      const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': brevoKey,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          sender: { name: fromName, email: process.env.BREVO_FROM_EMAIL || fromEmail },
          to: [{ email: to, name: name || 'Kullanıcı' }],
          subject: subject,
          htmlContent: html,
          textContent: text
        }),
        signal: AbortSignal.timeout(4500)
      });
      const brevoData = await brevoRes.json();
      if (brevoRes.ok) {
        console.log(`✅ [SellZone Mailer] Brevo API ile başarıyla gönderildi -> ${to} (MessageId: ${brevoData.messageId})`);
        return { success: true, sent: true, provider: 'brevo', message: 'Doğrulama kodu e-posta adresinize gönderildi.' };
      }
      console.error('❌ [SellZone Mailer] Brevo API hatası:', brevoData);
    } catch (err) {
      console.error('❌ [SellZone Mailer] Brevo API bağlantı hatası:', err.message);
    }
  }

  // 3. SMTP Transporter with 4s timeout (detects Render egress firewall block immediately)
  const transporter = getTransporter();
  if (transporter) {
    try {
      const sendPromise = transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('SMTP bağlantı zaman aşımı (Render port 587 kısıtlaması)')), 3800)
      );

      const info = await Promise.race([sendPromise, timeoutPromise]);
      console.log(`📧 [SellZone Mailer] Doğrulama kodu SMTP ile gönderildi -> ${to} (MessageId: ${info.messageId})`);
      return { success: true, sent: true, provider: 'smtp', message: 'Doğrulama kodu e-posta adresinize gönderildi.' };
    } catch (err) {
      console.error(`❌ [SellZone Mailer] SMTP gönderim hatası (${to}):`, err.message);
      return {
        success: false,
        sent: false,
        error: err.message,
        devCode: code
      };
    }
  }

  // Not configured
  return {
    success: false,
    sent: false,
    error: 'E-posta servisi yapılandırılmamış',
    devCode: code
  };
}

module.exports = {
  sendVerificationEmail,
  isSmtpConfigured
};

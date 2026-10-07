const nodemailer = require('nodemailer');

/**
 * Check if custom SMTP is configured in environment variables
 */
function isSmtpConfigured() {
  const host = (process.env.SMTP_HOST || '').trim();
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').trim();
  return Boolean(host && user && pass);
}

/**
 * Create SMTP transporter if configured
 */
function getTransporter() {
  if (!isSmtpConfigured()) return null;

  const host = (process.env.SMTP_HOST || '').trim();
  const user = (process.env.SMTP_USER || '').trim();
  const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');
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
 * Send Verification Email to the recipient
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.name - Recipient name
 * @param {string} options.code - 6-digit verification code
 * @returns {Promise<{success: boolean, sentViaSmtp: boolean, message: string}>}
 */
async function sendVerificationEmail({ to, name, code }) {
  const fromName = process.env.SMTP_FROM_NAME || 'SellZone';
  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || 'noreply@sellzone.com';
  const from = `"${fromName}" <${fromEmail}>`;
  const subject = `SellZone - E-Posta Doğrulama Kodunuz: ${code}`;
  const html = generateVerificationEmailHtml(name, code);
  const text = `Merhaba ${name || 'Kullanıcı'},\n\nSellZone hesabınızı doğrulamak için güvenlik kodunuz: ${code}\nBu kod 10 dakika geçerlidir.\n\nSellZone Ekibi`;

  const transporter = getTransporter();

  if (transporter) {
    try {
      const info = await transporter.sendMail({
        from: from,
        to: to,
        subject: subject,
        text: text,
        html: html
      });
      console.log(`📧 [SellZone Mailer] Doğrulama kodu SMTP ile gönderildi -> ${to} (MessageId: ${info.messageId})`);
      return { success: true, sentViaSmtp: true, message: 'Doğrulama kodu e-posta adresinize gönderildi.' };
    } catch (err) {
      console.error(`❌ [SellZone Mailer] SMTP gönderim hatası (${to}):`, err.message);
      // Fallback to dev log output so the user is never stuck
      printDevMailLog(to, name, code, err.message);
      return {
        success: true,
        sentViaSmtp: false,
        message: 'E-posta servisi yanıt vermedi, test modunda kod konsola yazdırıldı.',
        devCode: code
      };
    }
  } else {
    // SMTP not configured yet in .env - print clear dev banner
    printDevMailLog(to, name, code, 'SMTP ayarları .env dosyasında henüz tanımlanmamış (Simülasyon / Test Modu)');
    return {
      success: true,
      sentViaSmtp: false,
      message: 'Doğrulama kodu oluşturuldu (Test Modu).',
      devCode: code
    };
  }
}

function printDevMailLog(to, name, code, reason) {
  console.log(`\n======================================================================`);
  console.log(`📬 [SELLZONE SİSTEMİ - E-POSTA DOĞRULAMA SİMÜLASYONU]`);
  console.log(`----------------------------------------------------------------------`);
  console.log(`Gönderen : "SellZone" <noreply@sellzone.com>`);
  console.log(`Alıcı    : ${name || 'Kullanıcı'} <${to}>`);
  console.log(`Konu     : SellZone - E-Posta Doğrulama Kodunuz: ${code}`);
  console.log(`DURUM    : ${reason || 'Test Modu'}`);
  console.log(`\n🔥 DOĞRULAMA KODU : [  ${code}  ]  (10 Dakika Geçerli) 🔥`);
  console.log(`======================================================================\n`);
}

module.exports = {
  sendVerificationEmail,
  isSmtpConfigured
};

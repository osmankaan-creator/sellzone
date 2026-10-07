# 🚀 Sell Zone - Hızlı Sat, Akıllı Al (İkinci El & Sıfır Pazaryeri)

**Sell Zone**, kullanıcıların elindeki her türlü araç gereçten elektroniğe, mobilyadan taşıtlara kadar her şeyi kolayca satıp alabileceği, modern ve tam donanımlı bir ikinci el pazaryeri web uygulamasıdır.

> **Slogan:** *"Hızlı Sat, Akıllı Al • Fırsatlar Bölgesi"* | *"Kullanmadığını Değere Dönüştür, İhtiyacını Uygun Fiyata Yakala!"*

---

## 🎨 Tasarım & Frontend Özellikleri
- **Temaya Uygun Canlı & Modern Arka Plan**:
  - Hareketli ve nefes alan ambient renk dalgaları (Letgo tarzı enerjik mercan kırmızısı, kehribar ve derin mavi).
  - Yüzen pazar rozetleri (*"Hızlı Satış"*, *"Güvenli Pazarlık"*, *"Doğrulanmış Satıcı"*).
  - Modern Glassmorphism (buzlu cam efekti), akrilik kartlar ve zarif gölgelendirmeler.
- **Kategori Vitrini & Hızlı Filtreleme**:
  - Alet & Edavat (Matkap, lokma takımı vb.), Elektronik, Araç & Vasıta, Ev & Yaşam, Spor & Hobi, vb.
  - Şehir (İstanbul, Ankara, İzmir vb.), kullanım durumu (Sıfır, Yeni Gibi, İyi Durumda) ve fiyat aralığı filtreleri.
- **Detaylı İlan Sayfası (Lightbox / Modal)**:
  - Çoklu fotoğraf galerisi ve küçük resim önizleyicisi.
  - Satıcı profili, satıcı puanı (⭐ 5.0) ve satıcının diğer ilanları.
  - **WhatsApp ile İletişim** ve **Telefonu Gör** butonları.
  - **Uygulama İçi Canlı Mesajlaşma & Pazarlık Teklifi** butonu.
- **Mobil Uyumlu Tasarım**:
  - Masaüstü için geniş arama çubuğu ve header, mobil cihazlar için alt gezinme çubuğu (Bottom Navigation).

---

## 💾 Backend & Veritabanı Mimarisi (Verilerin Tutulması)
Backend tarafında veriler, Node.js'in en güncel yerel **SQLite (`node:sqlite`)** motoru ile `data/marketplace.db` dosyasında güvenle saklanır:

1. **`users` (Kullanıcılar)**:
   - Ad soyad, e-posta, telefon, şehir, güvenli `crypto.scrypt` şifre hash'i, satıcı puanı, avatar.
2. **`products` (İlanlar)**:
   - Başlık, açıklama, kategori, fiyat (₺), kondisyon/durum, konum, fotoğraflar (JSON), satıcı ilişkisi, görüntülenme sayısı, durum (`active` veya `sold`).
3. **`messages` (Mesajlaşma & Pazarlık)**:
   - Alıcı ve satıcı arasındaki sohbet mesajları, ürün referansı ve pazarlık teklif tutarı (`offer_price`).
4. **`favorites` (Favoriler)**:
   - Kullanıcıların beğendikleri ilanları sakladığı ilişki tablosu.
5. **Görsel Yükleme (`multer`)**:
   - Yüklenen ürün fotoğrafları `public/uploads/` dizininde otomatik saklanır.

---

## ⚡ Hızlı Başlatma

Sunucuyu çalıştırmak için proje klasöründe terminalden şu komutu girmeniz yeterlidir:

```bash
node server.js
```

Tarayıcınızda açın:
👉 **http://localhost:3000**

---

## 🧪 Test Hesabı ve Özellikler
Sayfa açıldığında test yapabilmeniz için hazır 4 adet satıcı profili ve 12 adet örnek Türkçe ilan yüklenmiştir:
- **Ahmet Yılmaz** (Kadıköy, İstanbul)
- **Zeynep Kaya** (Çankaya, Ankara)
- **Murat Demir** (Karşıyaka, İzmir)
- **Elif Çelik** (Nilüfer, Bursa)

Sayfanın üstündeki **"Hızlı Test Girişi"** çipine tıklayarak tek tıkla hesap değiştirebilir, ilan verebilir ve satıcılarla karşılıklı mesajlaşabilirsiniz.

---

## 📧 E-Posta Doğrulama Sistemi (Email OTP Verification)

SellZone'a yeni üye kaydı sırasında güvenlik için **6 Haneli E-Posta Doğrulama Kodu** sistemi uygulanır:

1. **Kullanıcı Kayıt Akışı:**
   - Kullanıcı bilgilerini (Ad Soyad, E-Posta, Şifre vb.) doldurup **"Doğrulama Kodu Gönder"** butonuna basar.
   - Sistem kullanıcının e-posta adresine **"SellZone"** ismiyle ve markalı modern HTML şablonuyla 6 haneli tek kullanımlık kod (`OTP`) gönderir.
   - Kod **10 dakika** boyunca geçerlidir.
   - Kullanıcı 6 haneli kodu kutucuklara girdiğinde hesabı anında doğrulanır (`email_verified = 1`) ve oturumu açılır.

2. **Gerçek E-Posta Gönderimi (SMTP Ayarları):**
   Proje kök dizinindeki `.env` dosyasını açıp kendi SMTP sağlayıcınızı (Gmail, Outlook, Yandex, Resend veya Hosting) tanımlayabilirsiniz:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=ornek@gmail.com
   SMTP_PASS=uygulama_sifreniz
   SMTP_FROM_NAME=SellZone
   SMTP_FROM_EMAIL=noreply@sellzone.com
   ```

3. **Geliştirme / Test Modu (Simülasyon):**
   - Eğer `.env` dosyasında henüz SMTP ayarı yapılmamışsa, sistem otomatik simülasyon moduna geçer.
   - Doğrulama kodu hem sunucu terminalinde büyük harflerle loglanır hem de test kolaylığı için modal penceresinde gösterilir. Böylece SMTP kurmadan da sistemi kesintisiz test edebilirsiniz.


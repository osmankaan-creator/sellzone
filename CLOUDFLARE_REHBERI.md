# 🛡️ SellZone - Cloudflare Güvenlik & Yayınlama Rehberi

Bu rehber, **SellZone Pazaryeri** uygulamanızı dünyanın en güçlü güvenlik ağı olan **Cloudflare** ile korumak ve güvenli bir şekilde internete yayınlamak için gereken tüm adımları içerir.

---

## 📌 1. Neden Cloudflare?

Cloudflare, siteniz ile ziyaretçileriniz arasına bir güvenlik kalkanı (Reverse Proxy) yerleştirir:
* **DDoS & Saldırı Koruması:** Sitenize gelebilecek yoğun istek ve kaba kuvvet (brute-force) saldırılarını sunucunuza ulaşmadan engeller.
* **Akıllı Bot Koruması (Cloudflare Turnstile):** Ziyaretçileri sıkıcı resim seçme captchalarıyla uğraştırmadan arka planda yapay zeka ile doğrular.
* **Ücretsiz SSL/HTTPS:** Sitenizi `https://` ile şifreli ve güvenli hale getirir.
* **Gerçek IP Güvenliği:** Sunucunuzun gerçek IP adresini gizler, saldırganların doğrudan sunucunuza saldırmasını önler.
* **CDN & Hız:** Görselleri ve stil dosyalarını dünya genelindeki önbellek sunucularından yıldırım hızında sunar.

---

## 🚀 2. Projenizde Halihazırda Yapılan Entegrasyonlar

Kod tabanınız Cloudflare ile %100 uyumlu çalışacak şekilde yapılandırılmıştır:

1. **Gerçek Ziyaretçi IP Tespiti (`server.js`):**
   - Cloudflare arkasında çalışırken istemcinin gerçek IP'si `CF-Connecting-IP` başlığından okunur (`app.set('trust proxy', true)` aktif).
2. **HTTP Güvenlik Başlıkları:**
   - `X-Content-Type-Options: nosniff`
   - `X-Frame-Options: SAMEORIGIN` (Clickjacking saldırılarına karşı)
   - `X-XSS-Protection: 1; mode=block`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy: camera=(), microphone=(), geolocation=(self)`
3. **Akıllı İstek Sınırlayıcı (Rate Limiting):**
   - Genel API istekleri: Dakikada en fazla 180 istek.
   - Giriş / Kayıt denemeleri: 15 dakikada en fazla 12 başarısız deneme (Brute-force kilitlenmesi).
4. **Cloudflare Turnstile Koruması:**
   - Hem Giriş hem de Kayıt modallarında otomatik Cloudflare robot doğrulama widget'ı bulunur.
   - Sunucu tarafında `challenges.cloudflare.com/turnstile/v0/siteverify` üzerinden token doğrulanır.
5. **Canlı Güvenlik Durumu:**
   - `/api/cf-status` uç noktası ve sayfanın en altında canlı Cloudflare durum rozeti mevcuttur.

---

## 🔑 3. Adım Adım Cloudflare Turnstile Kurulumu

SellZone şu anda Cloudflare'in **resmi test anahtarları** ile çalışmaktadır (yani yerel geliştirme ortamında sorunsuz açılır ve geçer). Kendi canlı anahtarlarınızı bağlamak için:

1. [Cloudflare Dashboard](https://dash.cloudflare.com)'a giriş yapın (ücretsiz üye olabilirsiniz).
2. Sol menüden **Turnstile** bölümüne tıklayın ve **"Add Widget"** (Widget Ekle) butonuna basın.
3. Widget Ayarları:
   - **Widget name:** `SellZone Auth`
   - **Domains:** Kendi alan adınızı (örn: `siteniz.com`) ve testler için `localhost` ekleyin.
   - **Widget Mode:** **Managed** (En güvenli ve önerilen mod).
4. Size verilen iki anahtarı kopyalayın:
   - **Site Key (Genel Anahtar)**
   - **Secret Key (Gizli Anahtar)**
5. Proje klasöründeki `.env` dosyasını açıp anahtarlarınızı yapıştırın:
   ```env
   CLOUDFLARE_TURNSTILE_SITE_KEY=buraya_site_key_yapistirin
   CLOUDFLARE_TURNSTILE_SECRET_KEY=buraya_secret_key_yapistirin
   CLOUDFLARE_ENFORCE_TURNSTILE=true
   ```
6. `public/index.html` içerisindeki `data-sitekey` değerini de kendi `Site Key`iniz ile güncelleyin:
   - Arama yapın: `data-sitekey="1x00000000000000000000AA"`
   - Kendi Site Key'iniz ile değiştirin.

---

## 🌐 4. Sitenizi Alan Adınızla Cloudflare Arkasına Alma (Canlı Yayına Çıkış)

Bir alan adınız (domain) ve sunucunuz (VDS/VPS veya sunucu bilgisayar) varsa:

1. **Domaini Ekle:** Cloudflare Dashboard'da **"Add a site"** diyerek alan adınızı yazın ve **Free (Ücretsiz)** planı seçin.
2. **NameServer Yönlendirmesi:** Domaini satın aldığınız firmanın (GoDaddy, Natro, Turhost, İsimtescil vb.) yönetim paneline gidin.
   - NS kayıtlarını Cloudflare'in size verdiği NS adresleri ile değiştirin (örn: `anna.ns.cloudflare.com`).
3. **DNS Kayıtları:**
   - `A` kaydı: Ad: `@` -> Değer: `Sunucu_IP_Adresiniz`
   - `CNAME` kaydı: Ad: `www` -> Değer: `@`
   - **Önemli:** Yanındaki bulut ikonunun **Turuncu (Proxied)** olduğundan emin olun! ☁️
4. **SSL / TLS Ayarı:**
   - Cloudflare sol menü -> **SSL/TLS** -> **Overview**
   - Şifreleme modunu **Full** veya **Full (Strict)** yapın.
   - **Edge Certificates** sekmesinden **"Always Use HTTPS"** seçeneğini açık (ON) hale getirin.
5. **Güvenlik (WAF) & Bot Koruması:**
   - **Security** -> **Bots** sekmesine gidin -> **"Bot Fight Mode"** anahtarını açın.
   - **Security** -> **Settings** -> **Security Level:** `Medium` veya `High` olarak ayarlayın.

---

## ⚡ 5. Port Açmadan İnternete Açma: Cloudflare Quick Tunnel

Eğer sabit bir IP adresiniz veya modemden port açma (Port Forwarding) imkanınız yoksa, bilgisayarınızda çalışan SellZone'u **ücretsiz ve şifreli bir geçici URL ile** dış dünyaya açabilirsiniz:

1. Resmi [Cloudflare Tunnel (cloudflared)](https://github.com/cloudflare/cloudflared/releases) Windows sürümünü indirin (`cloudflared-windows-amd64.exe`).
2. Bu exe dosyasını `cloudflared.exe` adıyla proje klasörünüze koyun.
3. Proje klasöründeki hazır **`cloudflare-tunnel.bat`** dosyasını çalıştırın.
4. Ekranda size özel güvenli bir `https://xxxx.trycloudflare.com` bağlantısı üretilecektir! Bu bağlantıyı istediğiniz kişiyle paylaşıp sitenizi güvenle gösterebilirsiniz.

---

## 🧪 6. Doğrulama ve Test

Sunucunuz açıkken tarayıcınızdan veya PowerShell üzerinden şu adresi ziyaret ederek Cloudflare entegrasyon durumunu inceleyebilirsiniz:

👉 **`http://localhost:3000/api/cf-status`**

Dönen JSON çıktısında:
- `isProxiedByCloudflare: true` -> İstek Cloudflare ağından geçtiğinde otomatik `true` olur.
- `country` -> Ziyaretçinin bağlandığı ülke kodu (TR, DE, US vb.).
- `rayId` -> Cloudflare istek takip kimliği.
- `turnstileConfigured` -> Bot koruma anahtarlarının aktiflik durumu.

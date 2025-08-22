# 🛍️ ShopSemih - Modern E-Ticaret Platformu

Modern, responsive ve kullanıcı dostu bir e-ticaret web uygulaması. Next.js 15, TypeScript ve Tailwind CSS ile geliştirilmiştir.

## 🌟 Özellikler

### 🎠 Hero Slider
- **4 Dinamik Slide**: Ürünler, özel indirimler, yeni koleksiyon, ücretsiz kargo
- **Otomatik Geçiş**: 5 saniyede bir otomatik slide değişimi
- **Manuel Kontroller**: Ok tuşları, nokta göstergeleri ve pause/play butonu
- **Touch/Swipe Desteği**: Mobil cihazlarda kaydırma ile navigasyon
- **Progress Bar**: Alt kısımda görsel ilerleme çubuğu
- **Responsive Tasarım**: Tüm ekran boyutlarında mükemmel görünüm

### 🛒 Sepet Sistemi
- **Tam Fonksiyonel Sepet**: Ürün ekleme, çıkarma, miktar güncelleme
- **Real-time Güncellemeler**: Anlık sepet durumu ve toplam hesaplama
- **LocalStorage Entegrasyonu**: Tarayıcı kapatılsa bile sepet korunur
- **Sepet İkonu Badge**: Header'da sepetteki ürün sayısı gösterimi
- **Boş Sepet UX**: Kullanıcı dostu boş sepet tasarımı

### ❤️ Favori Sistemi
- **Favori Ürünler**: Beğenilen ürünleri kaydetme ve listeleme
- **Toggle Butonları**: Ürün kartlarında kalp ikonu ile hızlı ekleme/çıkarma
- **Favori Sayacı**: Header'da favori ürün sayısı badge'i
- **Tarih Tracking**: Favorilere eklenme tarihi takibi
- **Sepet Entegrasyonu**: Favorilerden direkt sepete ekleme

### 🔍 Arama Sistemi
- **Gelişmiş Arama**: Başlık, kategori ve açıklama bazlı arama
- **Relevance Scoring**: Exact match > partial match algoritması
- **Dedicated Search Page**: Özel arama sonuçları sayfası
- **Header Search Bar**: Tüm sayfalarda erişilebilir arama çubuğu
- **Sonuç Bulunamadı UX**: Kullanıcı dostu "sonuç yok" durumu

### 👤 Kullanıcı Yönetimi
- **Authentication Sistemi**: Giriş, kayıt ve profil yönetimi
- **Form Validasyonları**: E-posta, şifre ve kullanım koşulları kontrolü
- **Demo Hesap**: Hızlı test için hazır demo kullanıcı
- **Profil Sayfası**: Sekme yapısı ile organize edilmiş kullanıcı paneli
- **Session Management**: LocalStorage ile güvenli oturum yönetimi

### 💳 Ödeme Sistemi
- **3 Adımlı Checkout**: Teslimat bilgileri, ödeme yöntemi, sipariş özeti
- **Stripe Entegrasyonu**: Güvenli kredi kartı işlemleri
- **Kapıda Ödeme**: Alternatif ödeme seçeneği
- **Form Validasyonları**: Kart numarası, CVV ve tarih kontrolü
- **Sipariş Takibi**: Başarı sayfası ve takip numarası

### 🌙 Dark Mode
- **Tam Dark Mode Desteği**: Tüm bileşenler için koyu tema
- **Smooth Transitions**: Yumuşak tema geçiş animasyonları
- **System Preference**: Sistem teması otomatik algılama
- **Custom Scrollbar**: Dark mode'a özel kaydırma çubuğu tasarımı
- **Gradient Backgrounds**: Koyu mod için özel arka plan gradientleri

### 📱 Responsive Tasarım
- **Mobile-First**: Mobil öncelikli tasarım yaklaşımı
- **Breakpoint Optimization**: Tüm ekran boyutları için optimize edilmiş
- **Touch-Friendly**: Mobil cihazlar için dokunmatik dostu arayüz
- **Grid Layouts**: Responsive ürün kartı düzenleri

## 🛠️ Teknoloji Stack'i

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **React Hooks** - Modern state management

### State Management
- **Context API** - Global state management
- **useReducer** - Complex state logic
- **LocalStorage** - Client-side data persistence

### Styling & UI
- **Custom Animations** - Tailwind CSS animations
- **Responsive Design** - Mobile-first approach
- **Dark Mode** - System and manual theme switching
- **Custom Components** - Reusable UI components

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes
- **VS Code Settings** - Optimized development environment

## 📁 Proje Yapısı

```
ecommerce-site/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Ana sayfa
│   │   ├── products/          # Ürünler sayfası
│   │   ├── cart/              # Sepet sayfası
│   │   ├── favorites/         # Favoriler sayfası
│   │   ├── checkout/          # Ödeme sayfası
│   │   ├── login/             # Giriş sayfası
│   │   ├── register/          # Kayıt sayfası
│   │   ├── profile/           # Profil sayfası
│   │   └── search/            # Arama sayfası
│   ├── components/            # Yeniden kullanılabilir bileşenler
│   │   ├── Header.tsx         # Site başlığı
│   │   ├── Footer.tsx         # Site alt bilgisi
│   │   ├── HeroSlider.tsx     # Ana sayfa slider'ı
│   │   └── PaymentForm.tsx    # Ödeme formu
│   └── contexts/              # Global state management
│       ├── CartContext.tsx    # Sepet state'i
│       ├── AuthContext.tsx    # Kullanıcı authentication
│       ├── FavoritesContext.tsx # Favori ürünler
│       ├── SearchContext.tsx  # Arama state'i
│       └── ThemeContext.tsx   # Dark mode state'i
├── public/                    # Static assets
├── .vscode/                   # VS Code ayarları
└── tailwind.config.ts         # Tailwind konfigürasyonu
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+ 
- npm, yarn, pnpm veya bun

### Kurulum Adımları

1. **Repository'yi klonlayın:**
```bash
git clone https://github.com/Semih-Omer-Baltaci/ecommerce-site.git
cd ecommerce-site
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
# veya
yarn install
# veya
pnpm install
```

3. **Development server'ı başlatın:**
```bash
npm run dev
# veya
yarn dev
# veya
pnpm dev
```

4. **Tarayıcınızda açın:**
[http://localhost:3000](http://localhost:3000)

### Build ve Deploy

```bash
# Production build
npm run build

# Production server başlat
npm run start

# Linting
npm run lint
```

## 🎯 Kullanım

### Demo Hesap
- **E-posta:** demo@example.com
- **Şifre:** 123456

### Temel İşlevler
1. **Ürün Görüntüleme:** Ana sayfa veya ürünler sayfasından
2. **Sepete Ekleme:** Ürün kartlarındaki "Sepete Ekle" butonu
3. **Favorilere Ekleme:** Kalp ikonuna tıklayarak
4. **Arama:** Header'daki arama çubuğunu kullanarak
5. **Dark Mode:** Header'daki güneş/ay ikonuna tıklayarak

## 🌐 API Entegrasyonu

- **Fake Store API:** Ürün verilerini çekmek için
- **Stripe API:** Ödeme işlemleri için (test modu)
- **LocalStorage:** Client-side veri saklama

## 🎨 Tasarım Özellikleri

### Renk Paleti
- **Primary:** Blue (600-700)
- **Secondary:** Purple (600-700)
- **Accent:** Yellow (400-500)
- **Success:** Green (600-400)
- **Error:** Red (500-600)

### Typography
- **Font Family:** Geist Sans & Geist Mono
- **Responsive Sizes:** 4xl-6xl başlıklar, lg-xl metin

### Animasyonlar
- **Fade In:** Sayfa geçişleri
- **Slide Up:** Modal ve popup'lar
- **Bounce Gentle:** Dekoratif elementler
- **Pulse Slow:** Loading durumları

## 🔧 Konfigürasyon

### Tailwind CSS
- Custom animations ve keyframes
- Dark mode class stratejisi
- Responsive breakpoint'ler
- Custom color palette

### PostCSS
- Tailwind CSS processing
- Autoprefixer integration
- Custom CSS optimizations

## 📈 Performans

- **Next.js Image Optimization:** Otomatik görsel optimizasyonu
- **Code Splitting:** Sayfa bazlı kod bölümleme
- **Lazy Loading:** İhtiyaç halinde yükleme
- **LocalStorage Caching:** Client-side önbellekleme

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some AmazingFeature'`)
4. Branch'inizi push edin (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Semih Ömer Baltacı**
- GitHub: [@Semih-Omer-Baltaci](https://github.com/Semih-Omer-Baltaci)

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Fake Store API](https://fakestoreapi.com/) - Test API
- [Stripe](https://stripe.com/) - Payment processing

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!

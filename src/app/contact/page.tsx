import Link from "next/link";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header - Üst menü */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">ShopSemih</Link>
                        </div>
                        
                        {/* Navigation Menu */}
                        <nav className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Ana Sayfa</Link>
                                <Link href="/products" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Ürünler</Link>
                                <Link href="/categories" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Kategoriler</Link>
                                <Link href="/contact" className="text-blue-600 font-semibold px-3 py-2 rounded-md text-sm">İletişim</Link>
                            </div>
                        </nav>

                        {/* Cart Icon */}
                        <div className="flex items-center">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">
                                🛒 Sepet (0)
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Page Title - Sayfa başlığı */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <h1 className="text-3xl font-bold text-gray-900">İletişim</h1>
                    <p className="mt-2 text-gray-600">Bizimle iletişime geçin, size yardımcı olmaktan mutluluk duyarız</p>
                </div>
            </div>

            {/* Contact Content - İletişim içeriği */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        
                        {/* Sol taraf - İletişim Formu */}
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bize Mesaj Gönderin</h2>
                            
                            <form className="space-y-6">
                                {/* Ad Soyad */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Ad Soyad *
                                    </label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                                        placeholder="Adınızı ve soyadınızı girin"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        E-posta Adresi *
                                    </label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                                        placeholder="ornek@email.com"
                                    />
                                </div>

                                {/* Telefon */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Telefon Numarası
                                    </label>
                                    <input 
                                        type="tel" 
                                        id="phone" 
                                        name="phone"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                                        placeholder="0530 123 45 67"
                                    />
                                </div>

                                {/* Konu */}
                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                        Konu *
                                    </label>
                                    <select 
                                        id="subject" 
                                        name="subject"
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
                                    >
                                        <option value="">Konu seçiniz</option>
                                        <option value="order">Sipariş ile ilgili</option>
                                        <option value="product">Ürün sorgusu</option>
                                        <option value="support">Teknik destek</option>
                                        <option value="complaint">Şikayet</option>
                                        <option value="suggestion">Öneri</option>
                                        <option value="other">Diğer</option>
                                    </select>
                                </div>

                                {/* Mesaj */}
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Mesajınız *
                                    </label>
                                    <textarea 
                                        id="message" 
                                        name="message"
                                        rows={5}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 resize-none"
                                        placeholder="Mesajınızı buraya yazın..."
                                    ></textarea>
                                </div>

                                {/* Gönder Butonu */}
                                <button 
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
                                >
                                    Mesaj Gönder 📧
                                </button>
                            </form>
                        </div>

                        {/* Sağ taraf - İletişim Bilgileri */}
                        <div className="space-y-8">
                            
                            {/* İletişim Kartları */}
                            <div className="grid grid-cols-1 gap-6">
                                
                                {/* Telefon */}
                                <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                        <span className="text-blue-600 text-xl">📞</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Telefon</h3>
                                        <p className="text-gray-600">0530 155 29 14</p>
                                        <p className="text-sm text-gray-500">Pazartesi - Cuma: 09:00 - 18:00</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                        <span className="text-green-600 text-xl">📧</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">E-posta</h3>
                                        <p className="text-gray-600">info@shopsemih.com</p>
                                        <p className="text-sm text-gray-500">24 saat içinde yanıt veriyoruz</p>
                                    </div>
                                </div>

                                {/* Adres */}
                                <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                        <span className="text-orange-600 text-xl">📍</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Adres</h3>
                                        <p className="text-gray-600">Konak, İzmir</p>
                                        <p className="text-sm text-gray-500">Türkiye</p>
                                    </div>
                                </div>

                                {/* Çalışma Saatleri */}
                                <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                        <span className="text-purple-600 text-xl">🕒</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">Çalışma Saatleri</h3>
                                        <p className="text-gray-600">Pazartesi - Cuma: 09:00 - 18:00</p>
                                        <p className="text-gray-600">Cumartesi: 10:00 - 16:00</p>
                                        <p className="text-sm text-gray-500">Pazar kapalı</p>
                                    </div>
                                </div>

                            </div>

                            {/* Harita Placeholder */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Konumumuz</h3>
                                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                                    <div className="text-center">
                                        <span className="text-gray-500 text-4xl block mb-2">🗺️</span>
                                        <p className="text-gray-600">İzmir Haritası</p>
                                        <p className="text-sm text-gray-500">Google Maps entegrasyonu</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">ShopSemih</h3>
                            <p className="text-gray-300">En kaliteli ürünler, en uygun fiyatlar. Güvenli alışverişin adresi.</p>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Hızlı Linkler</h4>
                            <ul className="space-y-2">
                                <li><Link href="/" className="text-gray-300 hover:text-white">Ana Sayfa</Link></li>
                                <li><Link href="/products" className="text-gray-300 hover:text-white">Ürünler</Link></li>
                                <li><Link href="/categories" className="text-gray-300 hover:text-white">Kategoriler</Link></li>
                                <li><Link href="/contact" className="text-gray-300 hover:text-white">İletişim</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">Müşteri Hizmetleri</h4>
                            <ul className="space-y-2">
                                <li><Link href="#" className="text-gray-300 hover:text-white">SSS</Link></li>
                                <li><Link href="#" className="text-gray-300 hover:text-white">İade & Değişim</Link></li>
                                <li><Link href="#" className="text-gray-300 hover:text-white">Kargo Takibi</Link></li>
                                <li><Link href="#" className="text-gray-300 hover:text-white">Destek</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-semibold mb-4">İletişim</h4>
                            <div className="space-y-2 text-gray-300">
                                <p>📞 0530 155 29 14</p>
                                <p>📧 info@shopsemih.com</p>
                                <p>📍 İzmir, Türkiye</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p className="text-gray-300">&copy; 2025 ShopSemih. Tüm hakları saklıdır.</p>
                    </div>
                </div>
            </footer>
            
        </div>
    )
}

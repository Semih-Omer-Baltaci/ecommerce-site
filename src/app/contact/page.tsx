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
                            <div className="bg-white rounded-lg shadow-md p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h2>
                                
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                <span className="text-blue-600 text-lg">📍</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Adres</h3>
                                            <p className="text-gray-600">Bornova, İzmir, Türkiye</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                                <span className="text-green-600 text-lg">📞</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Telefon</h3>
                                            <p className="text-gray-600">0530 155 29 14</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                                <span className="text-red-600 text-lg">📧</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">E-posta</h3>
                                            <p className="text-gray-600">info@shopsemih.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <span className="text-purple-600 text-lg">🕒</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">Çalışma Saatleri</h3>
                                            <p className="text-gray-600">Pazartesi - Cuma: 09:00 - 18:00</p>
                                            <p className="text-gray-600">Cumartesi: 10:00 - 16:00</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Google Maps */}
                            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-6 border-b">
                                    <h2 className="text-2xl font-bold text-gray-900">Konumumuz</h2>
                                    <p className="text-gray-600 mt-2">Mağazamızı ziyaret etmek için harita üzerinden konumumuzu görebilirsiniz.</p>
                                </div>
                                <div className="relative h-96">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.0123456789!2d27.1428!3d38.4192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a762cacd%3A0x628cbba1a59ce8de!2sKonak%2C%20%C4%B0zmir!5e0!3m2!1str!2str!4v1234567890123!5m2!1str!2str"
                                        width="100%"
                                        height="100%"
                                        style={{ border: '0' }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="ShopSemih Konum"
                                    ></iframe>
                                </div>
                                <div className="p-4 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">📍 Konak, İzmir</span>
                                        <a 
                                            href="https://maps.google.com/?q=Bornova,İzmir" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                        >
                                            Google Maps&apos;te Aç →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    )
}

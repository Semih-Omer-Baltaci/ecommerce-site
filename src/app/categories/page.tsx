import Link from "next/link";

export default function CategoriesPage() {
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
                                <Link href="/categories" className="text-blue-600 font-semibold px-3 py-2 rounded-md text-sm">Kategoriler</Link>
                                <Link href="/contact" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">İletişim</Link>
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
                    <h1 className="text-3xl font-bold text-gray-900">Kategoriler</h1>
                    <p className="mt-2 text-gray-600">İstediğiniz kategoriye göre ürünleri keşfedin</p>
                </div>
            </div>

            {/* Categories Grid - Kategoriler */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        
                        {/* Kategori 1 - Telefon */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                            <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                                <span className="text-white text-4xl">📱</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Telefonlar</h3>
                                <p className="text-gray-600 text-sm mb-4">iPhone, Samsung, Huawei ve daha fazlası</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">12 ürün</span>
                                    <Link href="/products?category=phone" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                                        Görüntüle
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Kategori 2 - Laptop */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                            <div className="h-32 bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white text-4xl">💻</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Laptoplar</h3>
                                <p className="text-gray-600 text-sm mb-4">MacBook, Dell, HP ve daha fazlası</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">8 ürün</span>
                                    <Link href="/products?category=laptop" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded text-sm">
                                        Görüntüle
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Kategori 3 - Kulaklık */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                            <div className="h-32 bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                                <span className="text-white text-4xl">🎧</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Kulaklıklar</h3>
                                <p className="text-gray-600 text-sm mb-4">AirPods, Sony, Bose ve daha fazlası</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">15 ürün</span>
                                    <Link href="/products?category=headphone" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm">
                                        Görüntüle
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Kategori 4 - Saat */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                            <div className="h-32 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                                <span className="text-white text-4xl">⌚</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Akıllı Saatler</h3>
                                <p className="text-gray-600 text-sm mb-4">Apple Watch, Huawei ve daha fazlası</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">6 ürün</span>
                                    <Link href="/products?category=watch" className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded text-sm">
                                        Görüntüle
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Kategori 5 - Tablet */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                            <div className="h-32 bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                                <span className="text-white text-4xl">📱</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tabletler</h3>
                                <p className="text-gray-600 text-sm mb-4">iPad, Samsung Galaxy Tab ve daha fazlası</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">10 ürün</span>
                                    <Link href="/products?category=tablet" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm">
                                        Görüntüle
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Kategori 6 - Aksesuar */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                            <div className="h-32 bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                                <span className="text-white text-4xl">🔌</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Aksesuarlar</h3>
                                <p className="text-gray-600 text-sm mb-4">Şarj aleti, kılıf, powerbank ve daha fazlası</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">25 ürün</span>
                                    <Link href="/products?category=accessory" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm">
                                        Görüntüle
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Kategori 7 - Oyun */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                            <div className="h-32 bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center">
                                <span className="text-white text-4xl">🎮</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Oyun</h3>
                                <p className="text-gray-600 text-sm mb-4">PlayStation, Xbox, Nintendo ve daha fazlası</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">18 ürün</span>
                                    <Link href="/products?category=gaming" className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded text-sm">
                                        Görüntüle
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Kategori 8 - Ev & Yaşam */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer">
                            <div className="h-32 bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                                <span className="text-white text-4xl">🏠</span>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Ev & Yaşam</h3>
                                <p className="text-gray-600 text-sm mb-4">Akıllı ev, robot süpürge ve daha fazlası</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">14 ürün</span>
                                    <Link href="/products?category=home" className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded text-sm">
                                        Görüntüle
                                    </Link>
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

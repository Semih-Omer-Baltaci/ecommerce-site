'use client';

import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../contexts/CartContext";

export default function CartPage() {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart();

  // Fiyat formatı (USD -> TL)
  const formatPrice = (price: number) => {
    return (price * 30).toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    });
  };

  // Kategori çevirisi
  const translateCategory = (category: string) => {
    const translations: { [key: string]: string } = {
      "men's clothing": "Erkek Giyim",
      "women's clothing": "Kadın Giyim",
      "jewelery": "Mücevher",
      "electronics": "Elektronik"
    };
    return translations[category] || category;
  };

  // Miktar artırma/azaltma
  const increaseQuantity = (id: number, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  const decreaseQuantity = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              ShopSemih
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/products" className="text-gray-600 hover:text-blue-600 transition-colors">
                Ürünler
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">
                Kategoriler
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                İletişim
              </Link>
              <Link href="/cart" className="text-blue-600 font-semibold">
                Sepet ({state.totalItems})
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm">
          <Link href="/" className="text-blue-600 hover:underline">Ana Sayfa</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-500">Sepet</span>
        </nav>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Alışveriş Sepeti
        </h1>

        {state.items.length === 0 ? (
          /* Boş Sepet */
          <div className="text-center py-16">
            <div className="text-6xl text-gray-300 mb-4">🛒</div>
            <h2 className="text-2xl font-semibold text-gray-600 mb-4">
              Sepetiniz Boş
            </h2>
            <p className="text-gray-500 mb-8">
              Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için ürünlerimizi inceleyin.
            </p>
            <Link 
              href="/products" 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
            >
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          /* Dolu Sepet */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sepet Ürünleri */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                      Sepetinizdeki Ürünler ({state.totalItems} adet)
                    </h2>
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Sepeti Temizle
                    </button>
                  </div>
                </div>

                <div className="divide-y">
                  {state.items.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Ürün Görseli */}
                        <div className="flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={100}
                            height={100}
                            className="rounded-lg object-contain bg-gray-50 p-2"
                          />
                        </div>

                        {/* Ürün Bilgileri */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                <Link 
                                  href={`/products/${item.id}`}
                                  className="hover:text-blue-600 transition-colors"
                                >
                                  {item.title}
                                </Link>
                              </h3>
                              <p className="text-sm text-blue-600 mb-2">
                                {translateCategory(item.category)}
                              </p>
                              <p className="text-xl font-bold text-green-600">
                                {formatPrice(item.price)}
                              </p>
                            </div>

                            {/* Kaldır Butonu */}
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-700 p-2"
                              title="Sepetten Kaldır"
                            >
                              ✕
                            </button>
                          </div>

                          {/* Miktar Kontrolü */}
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-3">
                              <span className="text-sm text-gray-600">Miktar:</span>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => decreaseQuantity(item.id, item.quantity)}
                                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <span className="w-12 text-center font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => increaseQuantity(item.id, item.quantity)}
                                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            {/* Toplam Fiyat */}
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Toplam</p>
                              <p className="text-lg font-bold text-gray-900">
                                {formatPrice(item.price * item.quantity)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sipariş Özeti */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-semibold mb-6">Sipariş Özeti</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ürün Sayısı:</span>
                    <span className="font-medium">{state.totalItems} adet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ara Toplam:</span>
                    <span className="font-medium">{formatPrice(state.totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kargo:</span>
                    <span className="font-medium text-green-600">Ücretsiz</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Toplam:</span>
                      <span className="text-green-600">{formatPrice(state.totalPrice)}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                  Siparişi Tamamla
                </button>

                <Link 
                  href="/products"
                  className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg text-center hover:bg-gray-50 transition-colors block"
                >
                  Alışverişe Devam Et
                </Link>

                {/* Güvenlik Bilgileri */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-green-600">🔒</span>
                    <span className="text-sm font-medium">Güvenli Ödeme</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    256-bit SSL şifreleme ile korumalı ödeme
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ShopSemih</h3>
              <p className="text-gray-300">
                En kaliteli ürünler, en uygun fiyatlarla sizlerle.
              </p>
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
                <li><a href="#" className="text-gray-300 hover:text-white">Yardım</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">İade & Değişim</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">Kargo Takibi</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white">SSS</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-300">
                <li>📞 +90 555 123 45 67</li>
                <li>✉️ info@shopsemih.com</li>
                <li>📍 İstanbul, Türkiye</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 ShopSemih. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

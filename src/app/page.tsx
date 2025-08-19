'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "../contexts/CartContext";
import { useSearch } from '../contexts/SearchContext';
import { useRouter } from 'next/navigation';

// Ürün tipi tanımı
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);
  const { addToCart, state } = useCart();
  const { setQuery } = useSearch();
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products?limit=4');
        if (!response.ok) {
          throw new Error('Ürünler yüklenirken hata oluştu');
        }
        const data: Product[] = await response.json();
        setFeaturedProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Fiyatı Türk Lirası'na çevir
  const formatPrice = (price: number) => {
    return (price * 30).toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    });
  };

  // Sepete ekleme
  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price * 30,
      image: product.image,
      category: product.category
    });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      setQuery(localSearchQuery.trim());
      router.push('/search');
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
              <Link href="/" className="text-blue-600 font-semibold">
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
            </nav>
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={localSearchQuery}
                  onChange={(e) => setLocalSearchQuery(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  🔍
                </button>
              </form>
              <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors">
                🛒 Sepet
                {state.totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              En İyi Ürünler
              <br />
              <span className="text-yellow-300">En Uygun Fiyatlarda</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Binlerce ürün arasından seçim yapın ve hızlı teslimatın keyfini çıkarın
            </p>
            <Link href="/products" className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-8 rounded-lg text-lg transition duration-300 inline-block">
              Alışverişe Başla 🚀
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-gray-600 text-lg">En popüler ve kaliteli ürünlerimizi keşfedin</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Ürünler yükleniyor...</span>
            </div>
          )}

          {/* Product Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <Link href={`/products/${product.id}`}>
                    <div className="aspect-square p-4 flex items-center justify-center bg-gray-50">
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={200}
                        height={200}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < Math.floor(product.rating.rate) ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm ml-1">
                        ({product.rating.rate})
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold text-green-600">
                        {formatPrice(product.price)}
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
                      >
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View All Products Button */}
          <div className="text-center mt-12">
            <Link 
              href="/products" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
            >
              Tüm Ürünleri Görüntüle
            </Link>
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
                <p>📞 +90 555 123 45 67</p>
                <p>📧 info@shopsemih.com</p>
                <p>📍 Beyoğlu/İstanbul</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-300">&copy; 2024 ShopSemih. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
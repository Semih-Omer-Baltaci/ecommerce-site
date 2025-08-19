'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext';
import { useSearch } from '../../contexts/SearchContext';

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

export default function SearchPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, state } = useCart();
  const { searchState, setQuery, performSearch } = useSearch();
  const [localSearchQuery, setLocalSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Ürünler yüklenirken hata oluştu');
        }
        const data: Product[] = await response.json();
        setAllProducts(data);
        
        // Eğer searchState.query varsa arama yap
        if (searchState.query) {
          performSearch(data, searchState.query);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchState.query, performSearch]);

  useEffect(() => {
    setLocalSearchQuery(searchState.query);
  }, [searchState.query]);

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
      if (allProducts.length > 0) {
        performSearch(allProducts, localSearchQuery.trim());
      }
    }
  };

  const formatPrice = (price: number) => {
    return (price * 30).toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-lg ${
          index < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
        }`}
      >
        ★
      </span>
    ));
  };

  const translateCategory = (category: string) => {
    const translations: { [key: string]: string } = {
      'men\'s clothing': 'Erkek Giyim',
      'women\'s clothing': 'Kadın Giyim',
      'jewelery': 'Mücevher',
      'electronics': 'Elektronik'
    };
    return translations[category] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                ShopSemih
              </Link>
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-blue-600">Ana Sayfa</Link>
                <Link href="/products" className="text-gray-700 hover:text-blue-600">Ürünler</Link>
                <Link href="/categories" className="text-gray-700 hover:text-blue-600">Kategoriler</Link>
                <Link href="/contact" className="text-gray-700 hover:text-blue-600">İletişim</Link>
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
                <Link href="/cart" className="relative">
                  <span className="text-2xl">🛒</span>
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
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hata Oluştu</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Arama Sonuçları
          </h1>
          {searchState.query && (
            <p className="text-gray-600">
              &apos;{searchState.query}&apos; için {searchState.results.length} sonuç bulundu
            </p>
          )}
        </div>

        {/* Search Results */}
        {searchState.query ? (
          searchState.results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchState.results.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <Link href={`/products/${product.id}`}>
                    <div className="aspect-square relative bg-white p-4">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain hover:scale-105 transition-transform"
                      />
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-2">
                      {translateCategory(product.category)}
                    </p>
                    <div className="flex items-center mb-2">
                      {renderStars(product.rating.rate)}
                      <span className="ml-2 text-sm text-gray-600">
                        ({product.rating.count})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-blue-600">
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
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Sonuç Bulunamadı
              </h2>
              <p className="text-gray-600 mb-6">
                &apos;{searchState.query}&apos; için herhangi bir ürün bulunamadı.
              </p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>Arama önerileri:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Yazım hatası olup olmadığını kontrol edin</li>
                  <li>Daha genel terimler kullanın</li>
                  <li>Farklı anahtar kelimeler deneyin</li>
                </ul>
              </div>
              <Link
                href="/products"
                className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition-colors"
              >
                Tüm Ürünleri Görüntüle
              </Link>
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Arama Yapın
            </h2>
            <p className="text-gray-600 mb-6">
              Yukarıdaki arama kutusunu kullanarak ürün arayabilirsiniz.
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded transition-colors"
            >
              Tüm Ürünleri Görüntüle
            </Link>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ShopSemih</h3>
              <p className="text-gray-300">
                En kaliteli ürünler, en uygun fiyatlarla sizlerle.
              </p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-white">Ana Sayfa</Link></li>
                <li><Link href="/products" className="text-gray-300 hover:text-white">Ürünler</Link></li>
                <li><Link href="/categories" className="text-gray-300 hover:text-white">Kategoriler</Link></li>
                <li><Link href="/contact" className="text-gray-300 hover:text-white">İletişim</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Kategoriler</h4>
              <ul className="space-y-2">
                <li><span className="text-gray-300">Erkek Giyim</span></li>
                <li><span className="text-gray-300">Kadın Giyim</span></li>
                <li><span className="text-gray-300">Elektronik</span></li>
                <li><span className="text-gray-300">Mücevher</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-300">
                <li>📧 info@shopsemih.com</li>
                <li>📞 +90 555 123 45 67</li>
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

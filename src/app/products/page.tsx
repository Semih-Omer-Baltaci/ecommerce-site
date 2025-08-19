'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext';
import { useSearch } from '../../contexts/SearchContext';
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const { addToCart, state } = useCart();
  const { setQuery } = useSearch();
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const router = useRouter();

  // API'den ürünleri çek
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Ürünler yüklenirken hata oluştu');
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Kategorileri filtrele
  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  // Ürünleri sırala
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating.rate - a.rating.rate;
      case 'name':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  // Benzersiz kategorileri al
  const categories = Array.from(new Set(products.map(product => product.category)));

  // Fiyatı Türk Lirası'na çevir (yaklaşık)
  const formatPrice = (price: number) => {
    return (price * 30).toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Kategori adlarını Türkçe'ye çevir
  const translateCategory = (category: string) => {
    const translations: { [key: string]: string } = {
      'men\'s clothing': 'Erkek Giyim',
      'women\'s clothing': 'Kadın Giyim',
      'jewelery': 'Mücevher',
      'electronics': 'Elektronik'
    };
    return translations[category] || category;
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
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Ana Sayfa
              </Link>
              <Link href="/products" className="text-blue-600 font-semibold">
                Ürünler
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-blue-600 transition-colors">
                Kategoriler
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                İletişim
              </Link>
              <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors">
                🛒 Sepet
                {state.totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {state.totalItems}
                  </span>
                )}
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Tüm Ürünler</h1>
          <p className="mt-2 text-gray-600">
            {loading ? 'Ürünler yükleniyor...' : `${sortedProducts.length} ürün bulundu`}
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Kategori:</label>
              <select 
                className="border border-gray-300 rounded px-3 py-1 text-sm"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Tümü</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {translateCategory(category)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Sırala:</label>
              <select 
                className="border border-gray-300 rounded px-3 py-1 text-sm"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Varsayılan</option>
                <option value="price-low">Fiyat (Düşükten Yükseğe)</option>
                <option value="price-high">Fiyat (Yüksekten Düşüğe)</option>
                <option value="rating">En Yüksek Puanlı</option>
                <option value="name">İsim (A-Z)</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <form onSubmit={handleSearch}>
                <input 
                  type="search" 
                  value={localSearchQuery} 
                  onChange={(e) => setLocalSearchQuery(e.target.value)} 
                  placeholder="Arama..." 
                  className="border border-gray-300 rounded px-3 py-1 text-sm"
                />
                <button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm transition-colors"
                >
                  Ara
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Ürünler yükleniyor...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <strong>Hata:</strong> {error}
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
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
                    <div className="text-xs text-blue-600 font-medium mb-1">
                      {translateCategory(product.category)}
                    </div>
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

          {/* No Products Found */}
          {!loading && !error && sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Bu kategoride ürün bulunamadı.</p>
            </div>
          )}
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
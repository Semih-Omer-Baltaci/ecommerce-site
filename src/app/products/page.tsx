'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../contexts/CartContext';
import { useFavorites } from '../../contexts/FavoritesContext';
import { useSearch } from '../../contexts/SearchContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useRouter } from 'next/navigation';
import { useFetch } from '../../hooks/useFetch';

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
  const { data: products, loading, error } = useFetch<Product[]>('https://fakestoreapi.com/products');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');
  const { addToCart, state } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { setQuery } = useSearch();
  const { isDarkMode, toggleTheme } = useTheme();
  const [localSearchQuery, setLocalSearchQuery] = useState('');
  const router = useRouter();

  // Kategorileri filtrele
  const filteredProducts = products?.filter(product => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  // Ürünleri sırala
  const sortedProducts = [...filteredProducts || []].sort((a, b) => {
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
  const categories = Array.from(new Set(products?.map(product => product.category) || []));

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

  // Favori toggle
  const handleFavoriteToggle = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        rating: product.rating
      });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      setQuery(localSearchQuery.trim());
      router.push('/search');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Page Title */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Tüm Ürünler</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {loading ? 'Ürünler yükleniyor...' : `${sortedProducts?.length} ürün bulundu`}
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Kategori:</label>
              <select 
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
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
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Sırala:</label>
              <select 
                className="border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-200"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="name">İsme Göre</option>
                <option value="price-low">Fiyat (Düşük-Yüksek)</option>
                <option value="price-high">Fiyat (Yüksek-Düşük)</option>
                <option value="rating">Puana Göre</option>
              </select>
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
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-400">Ürünler yükleniyor...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
              <strong>Hata:</strong> {error}
            </div>
          )}

          {/* Products Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts?.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-64 bg-gray-100 dark:bg-gray-600">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-contain p-4 hover:scale-105 transition-transform cursor-pointer"
                      />
                    </Link>
                    {/* Favori Butonu */}
                    <button
                      onClick={() => handleFavoriteToggle(product)}
                      className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:shadow-lg transition-all"
                      title={isFavorite(product.id) ? "Favorilerden çıkar" : "Favorilere ekle"}
                    >
                      <svg 
                        className={`w-5 h-5 ${isFavorite(product.id) ? 'text-red-500 fill-current' : 'text-gray-400 dark:text-gray-500'}`} 
                        viewBox="0 0 20 20"
                      >
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">
                      {translateCategory(product.category)}
                    </div>
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 dark:text-yellow-300 text-sm">
                        {[...Array(5)].map((_, i) => (
                          <span key={i}>
                            {i < Math.floor(product.rating.rate) ? '★' : '☆'}
                          </span>
                        ))}
                      </div>
                      <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                        ({product.rating.rate})
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xl font-bold text-green-600 dark:text-green-400">
                        {formatPrice(product.price)}
                      </p>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="bg-blue-600 dark:bg-blue-400 hover:bg-blue-700 dark:hover:bg-blue-300 text-white px-3 py-1.5 rounded text-sm transition-colors"
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
          {!loading && !error && sortedProducts?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Bu kategoride ürün bulunamadı.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
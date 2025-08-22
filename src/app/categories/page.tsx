'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

// Product tipi tanımı
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

// Kategori tipi tanımı
interface Category {
  name: string;
  displayName: string;
  productCount: number;
  icon: string;
  color: string;
  description: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // API'den kategorileri ve ürün sayılarını çek
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        // Tüm ürünleri çek
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Kategoriler yüklenirken hata oluştu');
        }
        
        const products: Product[] = await response.json();
        
        // Kategorileri grupla ve say
        const categoryMap = new Map<string, number>();
        products.forEach((product: Product) => {
          const category = product.category;
          categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
        });

        // Kategori bilgilerini oluştur
        const categoryData: Category[] = Array.from(categoryMap.entries()).map(([name, count]) => ({
          name,
          displayName: translateCategory(name),
          productCount: count,
          icon: getCategoryIcon(name),
          color: getCategoryColor(name),
          description: getCategoryDescription(name)
        }));

        setCategories(categoryData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Kategori adlarını Türkçe'ye çevir
  const translateCategory = (category: string): string => {
    const translations: { [key: string]: string } = {
      "men's clothing": "Erkek Giyim",
      "women's clothing": "Kadın Giyim",
      "jewelery": "Mücevher",
      "electronics": "Elektronik"
    };
    return translations[category] || category;
  };

  // Kategori ikonları
  const getCategoryIcon = (category: string): string => {
    const icons: { [key: string]: string } = {
      "men's clothing": "👔",
      "women's clothing": "👗",
      "jewelery": "💎",
      "electronics": "📱"
    };
    return icons[category] || "📦";
  };

  // Kategori renkleri
  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      "men's clothing": "from-blue-500 to-blue-600",
      "women's clothing": "from-pink-500 to-pink-600",
      "jewelery": "from-yellow-500 to-yellow-600",
      "electronics": "from-purple-500 to-purple-600"
    };
    return colors[category] || "from-gray-500 to-gray-600";
  };

  // Kategori açıklamaları
  const getCategoryDescription = (category: string): string => {
    const descriptions: { [key: string]: string } = {
      "men's clothing": "Erkekler için şık ve kaliteli giyim ürünleri",
      "women's clothing": "Kadınlar için trend ve şık kıyafetler",
      "jewelery": "Değerli mücevherler ve aksesuarlar",
      "electronics": "En yeni teknoloji ürünleri"
    };
    return descriptions[category] || "Kaliteli ürünler bu kategoride";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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

      {/* Page Title */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Kategoriler</h1>
          <p className="mt-2 text-gray-600">
            {loading ? 'Kategoriler yükleniyor...' : `${categories.length} kategori mevcut`}
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Kategoriler yükleniyor...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              <strong>Hata:</strong> {error}
            </div>
          )}

          {/* Categories Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category) => (
                <Link 
                  key={category.name}
                  href={`/products?category=${encodeURIComponent(category.name)}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 cursor-pointer block"
                >
                  <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <span className="text-white text-4xl">{category.icon}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.displayName}</h3>
                    <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{category.productCount} ürün</span>
                      <span className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors">
                        Görüntüle
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* No Categories Found */}
          {!loading && !error && categories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Henüz kategori bulunamadı.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

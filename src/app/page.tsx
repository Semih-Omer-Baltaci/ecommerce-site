'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { useFavorites } from "../contexts/FavoritesContext";
import { useFetch } from "../hooks/useFetch";
import HeroSlider from "../components/HeroSlider";

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
  const { data: featuredProducts, loading, error } = useFetch<Product[]>('https://fakestoreapi.com/products?limit=4');
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

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

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Slider */}
      <section className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <HeroSlider />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Öne Çıkan Ürünler</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">En popüler ve kaliteli ürünlerimizi keşfedin</p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
              <span className="ml-3 text-gray-600 dark:text-gray-300">Ürünler yükleniyor...</span>
            </div>
          )}

          {/* Product Grid */}
          {!loading && featuredProducts && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-700/30 overflow-hidden hover:shadow-lg dark:hover:shadow-gray-700/50 transition-shadow duration-300 border dark:border-gray-700">
                  <div className="relative">
                    <Link href={`/products/${product.id}`}>
                      <div className="aspect-square p-4 flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                        <Image
                          src={product.image}
                          alt={product.title}
                          width={200}
                          height={200}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    </Link>
                    {/* Favori Butonu */}
                    <button
                      onClick={() => handleFavoriteToggle(product)}
                      className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all border dark:border-gray-600"
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
                    <Link href={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {product.title}
                      </h3>
                    </Link>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 dark:text-yellow-500 text-sm">
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
                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm transition-colors"
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
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-block"
            >
              Tüm Ürünleri Görüntüle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
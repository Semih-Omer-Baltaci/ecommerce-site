'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../../contexts/CartContext";
import { useFavorites } from "../../../contexts/FavoritesContext";

// Ürün tipi tanımlaması
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

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  const { addToCart, getItemQuantity } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

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

  // Star rating komponenti
  const StarRating = ({ rating }: { rating: number }) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">★</span>
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">☆</span>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="text-gray-300">☆</span>
      );
    }

    return <div className="flex items-center">{stars}</div>;
  };

  // Sepete ekleme fonksiyonu
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price * 30, // TL'ye çevrilmiş fiyat gönder
          image: product.image,
          category: product.category,
        });
      }
      // Başarı mesajı gösterebiliriz (şimdilik console)
      console.log(`${quantity} adet ${product.title} sepete eklendi`);
    }
  };

  // Favori toggle
  const handleFavoriteToggle = () => {
    if (product) {
      if (isFavorite(product.id)) {
        removeFromFavorites(product.id);
      } else {
        addToFavorites({
          id: product.id,
          title: product.title,
          price: product.price * 30, // TL'ye çevrilmiş fiyat gönder
          image: product.image,
          category: product.category,
          rating: product.rating
        });
      }
    }
  };

  // Sepetteki miktar
  const cartQuantity = product ? getItemQuantity(product.id) : 0;

  // API'den ürün verilerini çek
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
        if (!response.ok) {
          throw new Error('Ürün bulunamadı');
        }
        const data: Product = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Miktar artırma/azaltma
 

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm">
          <Link href="/" className="text-blue-600 hover:underline">Ana Sayfa</Link>
          <span className="mx-2 text-gray-500">/</span>
          <Link href="/products" className="text-blue-600 hover:underline">Ürünler</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-500">Ürün Detayı</span>
        </nav>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {loading && (
          <div className="flex justify-center items-center min-h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
            <Link 
              href="/products" 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ürünlere Geri Dön
            </Link>
          </div>
        )}

        {product && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Ürün Görseli */}
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow-md p-8 flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={400}
                  height={400}
                  className="max-w-full h-auto object-contain"
                />
              </div>
            </div>

            {/* Ürün Bilgileri */}
            <div className="space-y-6">
              {/* Kategori */}
              <div className="text-sm text-blue-600 font-medium">
                {translateCategory(product.category)}
              </div>

              {/* Ürün Başlığı */}
              <h1 className="text-3xl font-bold text-gray-900">
                {product.title}
              </h1>

              {/* Rating ve Yorum Sayısı */}
              <div className="flex items-center space-x-4">
                <StarRating rating={product.rating.rate} />
                <span className="text-gray-600">
                  ({product.rating.rate}/5)
                </span>
                <span className="text-gray-500">
                  {product.rating.count} değerlendirme
                </span>
              </div>

              {/* Fiyat */}
              <div className="text-3xl font-bold text-green-600">
                {formatPrice(product.price)}
              </div>

              {/* Açıklama */}
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Ürün Açıklaması
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Miktar Seçici */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Miktar
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700 font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="w-16 text-center text-lg font-medium text-gray-900 bg-gray-50 py-2 rounded-md">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-700 font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Sepete Ekle Butonu */}
              <div className="space-y-4">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Sepete Ekle - {formatPrice(product.price * quantity)}
                </button>
                
                {cartQuantity > 0 && (
                  <div className="text-center text-sm text-green-600 font-medium">
                    ✓ Sepetinizde {cartQuantity} adet var
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={handleFavoriteToggle}
                    className={`p-3 rounded-lg border transition-colors ${
                      isFavorite(product.id) 
                        ? 'bg-red-50 border-red-200 text-red-600' 
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                    title={isFavorite(product.id) ? "Favorilerden çıkar" : "Favorilere ekle"}
                  >
                    <svg className="w-6 h-6" fill={isFavorite(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  <Link 
                    href="/cart"
                    className="border border-blue-600 text-blue-600 py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors text-center"
                  >
                    🛒 Sepete Git
                  </Link>
                </div>
              </div>

              {/* Ürün Özellikleri */}
              <div className="bg-gray-100 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ürün Özellikleri
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Kategori:</span>
                    <span className="font-medium">{translateCategory(product.category)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ürün ID:</span>
                    <span className="font-medium">#{product.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Değerlendirme:</span>
                    <span className="font-medium">{product.rating.rate}/5 ⭐</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stok Durumu:</span>
                    <span className="font-medium text-green-600">Stokta Var</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

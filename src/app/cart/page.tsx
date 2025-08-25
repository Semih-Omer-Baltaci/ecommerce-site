'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Toaster } from 'react-hot-toast'; // Toaster component'i ekliyoruz

export default function CartPage() {
  const { state, updateQuantity, removeFromCart, clearCart } = useCart();

  // Fiyat formatı (TL)
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  };

  // Miktar artırma
  const increaseQuantity = (id: number, currentQuantity: number) => {
    updateQuantity(id, currentQuantity + 1);
  };

  // Miktar azaltma
  const decreaseQuantity = (id: number, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(id, currentQuantity - 1);
    }
  };

  // Boş sepet durumu
  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <Toaster position="top-right" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Sepetim</h1>
          
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="mb-6">
              <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h12.6M17 21a2 2 0 100-4 2 2 0 000 4zM9 21a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sepetiniz Boş</h2>
            <p className="text-gray-600 mb-6">Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için ürünlerimizi inceleyin.</p>
            <Link 
              href="/products" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Alışverişe Başla
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Sepetim</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            Sepeti Temizle
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Sepet Ürünleri */}
          <div className="divide-y divide-gray-200">
            {state.items.map((item) => (
              <div key={item.id} className="p-6 flex items-center space-x-4">
                {/* Ürün Görseli */}
                <div className="flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                </div>

                {/* Ürün Bilgileri */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900 truncate">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize">
                    {item.category}
                  </p>
                  <p className="text-lg font-semibold text-blue-600 mt-1">
                    {formatPrice(item.price)}
                  </p>
                </div>

                {/* Miktar Kontrolü */}
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => decreaseQuantity(item.id, item.quantity)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    disabled={item.quantity <= 1}
                  >
                    <span className="text-gray-600">-</span>
                  </button>
                  
                  <span className="w-12 text-center font-medium text-gray-900">
                    {item.quantity}
                  </span>
                  
                  <button
                    onClick={() => increaseQuantity(item.id, item.quantity)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-600">+</span>
                  </button>
                </div>

                {/* Toplam Fiyat */}
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>

                {/* Silme Butonu */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Sepet Özeti */}
          <div className="bg-gray-50 p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-medium text-gray-900">
                Toplam Ürün: {state.totalItems} adet
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(state.totalPrice)}
              </span>
            </div>
            
            <div className="flex space-x-4">
              <Link
                href="/products"
                className="flex-1 bg-gray-200 text-gray-800 text-center py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Alışverişe Devam Et
              </Link>
              <Link
                href="/checkout"
                className="flex-1 bg-blue-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Ödemeye Geç
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

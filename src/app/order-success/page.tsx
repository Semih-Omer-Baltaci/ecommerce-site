'use client';

import React from 'react';
import Link from 'next/link';

export default function OrderSuccessPage() {

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Siparişiniz Alındı!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Siparişiniz başarıyla oluşturuldu. Sipariş detayları e-posta adresinize gönderildi.
        </p>

        {/* Order Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-600 mb-2">Sipariş Numarası</div>
          <div className="font-semibold text-gray-900">
            #{Math.random().toString(36).substr(2, 9).toUpperCase()}
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="mb-6">
          <div className="text-sm text-gray-600 mb-1">Tahmini Teslimat</div>
          <div className="font-medium text-gray-900">
            {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('tr-TR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Link
            href="/profile"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors inline-block"
          >
            Siparişlerim
          </Link>
          
          <Link
            href="/products"
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors inline-block"
          >
            Alışverişe Devam Et
          </Link>
          
          <Link
            href="/"
            className="w-full text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition-colors inline-block"
          >
            Ana Sayfaya Dön
          </Link>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="font-medium text-gray-900 mb-3">Sırada Ne Var?</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
              <span>Siparişiniz hazırlanıyor</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
              <span>Kargoya verilecek</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-gray-300 rounded-full mr-3"></div>
              <span>Teslimat</span>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-6 text-xs text-gray-500">
          Sorularınız için: <a href="mailto:destek@shopsemih.com" className="text-blue-600 hover:underline">destek@shopsemih.com</a>
        </div>
      </div>
    </div>
  );
}

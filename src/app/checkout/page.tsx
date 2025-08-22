'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import PaymentForm from '@/components/PaymentForm';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import type { PaymentIntent } from '@stripe/stripe-js';

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  district: string;
  postalCode: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { state: cartState, clearCart } = useCart();
  const { state: authState } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Form states
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: authState.user?.email || '',
    phone: '',
    address: '',
    city: '',
    district: '',
    postalCode: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Redirect if cart is empty
  useEffect(() => {
    if (cartState.totalItems === 0) {
      router.push('/cart');
    }
  }, [cartState.totalItems, router]);

  // Calculate totals
  const subtotal = cartState.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = subtotal > 500 ? 0 : 29.99;
  const total = subtotal + shippingCost;

  // Validation functions
  const validateShipping = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!shippingAddress.firstName.trim()) newErrors.firstName = 'Ad gerekli';
    if (!shippingAddress.lastName.trim()) newErrors.lastName = 'Soyad gerekli';
    if (!shippingAddress.email.trim()) newErrors.email = 'E-posta gerekli';
    if (!shippingAddress.phone.trim()) newErrors.phone = 'Telefon gerekli';
    if (!shippingAddress.address.trim()) newErrors.address = 'Adres gerekli';
    if (!shippingAddress.city.trim()) newErrors.city = 'Şehir gerekli';
    if (!shippingAddress.district.trim()) newErrors.district = 'İlçe gerekli';
    if (!shippingAddress.postalCode.trim()) newErrors.postalCode = 'Posta kodu gerekli';

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (shippingAddress.email && !emailRegex.test(shippingAddress.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi girin';
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10,11}$/;
    if (shippingAddress.phone && !phoneRegex.test(shippingAddress.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Geçerli bir telefon numarası girin';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = (): boolean => {
    const newErrors: {[key: string]: string} = {};

    if (!agreeTerms) {
      newErrors.terms = 'Kullanım koşullarını kabul etmelisiniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step navigation
  const nextStep = () => {
    if (currentStep === 1 && validateShipping()) {
      setCurrentStep(2);
    } else if (currentStep === 2 && validatePayment()) {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Payment success handler
  const handlePaymentSuccess = (paymentIntent: PaymentIntent) => {
    toast.success('Ödeme başarılı! Siparişiniz alındı.');
    
    // Save order to localStorage (in real app, save to database)
    const order = {
      id: paymentIntent.id,
      items: cartState.items,
      shippingAddress,
      total,
      paymentMethod: 'credit-card',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    
    localStorage.setItem('lastOrder', JSON.stringify(order));
    
    // Clear cart and redirect
    clearCart();
    router.push('/order-success');
  };

  // Payment error handler
  const handlePaymentError = (error: string) => {
    toast.error(`Ödeme hatası: ${error}`);
  };

  // Cash on delivery order
  const completeCashOrder = async () => {
    if (!validatePayment()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const order = {
        id: `COD_${Date.now()}`,
        items: cartState.items,
        shippingAddress,
        total,
        paymentMethod: 'cash-on-delivery',
        status: 'pending',
        createdAt: new Date().toISOString(),
      };
      
      localStorage.setItem('lastOrder', JSON.stringify(order));
      
      toast.success('Siparişiniz alındı! Kapıda ödeme ile teslim edilecek.');
      clearCart();
      router.push('/order-success');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Sipariş oluşturulurken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  if (cartState.totalItems === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md transition-colors duration-300 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">ShopSemih</h1>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 hover:scale-110"
              title={isDarkMode ? "Light mode'a geç" : "Dark mode'a geç"}
            >
              <div className="relative w-6 h-6">
                <svg 
                  className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
                    isDarkMode ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                
                <svg 
                  className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
                    isDarkMode ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
                  }`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Güvenli Ödeme</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Siparişinizi tamamlamak için bilgilerinizi girin</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${
                  currentStep >= step 
                    ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {step}
                </div>
                <span className={`ml-2 transition-colors duration-200 ${
                  currentStep >= step 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-gray-500 dark:text-gray-500'
                }`}>
                  {step === 1 ? 'Teslimat' : step === 2 ? 'Ödeme' : 'Onay'}
                </span>
                {step < 3 && <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600 mx-4" />}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-300">
              {/* Step 1: Shipping Address */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Teslimat Bilgileri</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Ad</label>
                      <input
                        type="text"
                        value={shippingAddress.firstName}
                        onChange={(e) => setShippingAddress({...shippingAddress, firstName: e.target.value})}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 transition-colors ${
                          errors.firstName ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Soyad</label>
                      <input
                        type="text"
                        value={shippingAddress.lastName}
                        onChange={(e) => setShippingAddress({...shippingAddress, lastName: e.target.value})}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 transition-colors ${
                          errors.lastName ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">E-posta</label>
                      <input
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => setShippingAddress({...shippingAddress, email: e.target.value})}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 transition-colors ${
                          errors.email ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Telefon</label>
                      <input
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 transition-colors ${
                          errors.phone ? 'border-red-500' : ''
                        }`}
                        placeholder="05XX XXX XX XX"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Adres</label>
                      <textarea
                        value={shippingAddress.address}
                        onChange={(e) => setShippingAddress({...shippingAddress, address: e.target.value})}
                        rows={3}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 transition-colors ${
                          errors.address ? 'border-red-500' : ''
                        }`}
                        placeholder="Mahalle, sokak, apartman, daire no"
                      />
                      {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Şehir</label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 transition-colors ${
                          errors.city ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">İlçe</label>
                      <input
                        type="text"
                        value={shippingAddress.district}
                        onChange={(e) => setShippingAddress({...shippingAddress, district: e.target.value})}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 transition-colors ${
                          errors.district ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Posta Kodu</label>
                      <input
                        type="text"
                        value={shippingAddress.postalCode}
                        onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 transition-colors ${
                          errors.postalCode ? 'border-red-500' : ''
                        }`}
                      />
                      {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">Ödeme Yöntemi</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          value="credit-card"
                          checked={paymentMethod === 'credit-card'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 mr-3"
                        />
                        <div className="flex items-center">
                          <svg className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                          </svg>
                          <span className="text-gray-900 dark:text-white font-medium">Kredi/Banka Kartı</span>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors">
                        <input
                          type="radio"
                          value="cash-on-delivery"
                          checked={paymentMethod === 'cash-on-delivery'}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2 mr-3"
                        />
                        <div className="flex items-center">
                          <svg className="w-6 h-6 mr-2 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="text-gray-900 dark:text-white font-medium">Kapıda Ödeme</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Credit Card Form */}
                  {paymentMethod === 'credit-card' && (
                    <PaymentForm
                      amount={total}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                      loading={loading}
                    />
                  )}

                  {/* Terms Agreement */}
                  <div className="mt-6">
                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-1 mr-2"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Kullanım koşullarını</a> ve{' '}
                        <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">gizlilik politikasını</a> kabul ediyorum.
                      </span>
                    </label>
                    {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms}</p>}
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Geri
                </button>
                
                {currentStep < 2 ? (
                  <button
                    onClick={nextStep}
                    className="px-6 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                  >
                    İleri
                  </button>
                ) : currentStep === 2 && paymentMethod === 'cash-on-delivery' ? (
                  <button
                    onClick={completeCashOrder}
                    disabled={loading}
                    className="px-6 py-2 bg-green-600 dark:bg-green-500 text-white rounded-md hover:bg-green-700 dark:hover:bg-green-600 disabled:opacity-50 transition-colors"
                  >
                    {loading ? 'İşleniyor...' : 'Siparişi Tamamla'}
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sticky top-4 transition-colors duration-300">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Sipariş Özeti</h3>
              
              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {cartState.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="object-contain rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Adet: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {(item.price * item.quantity).toLocaleString('tr-TR', {
                        style: 'currency',
                        currency: 'TRY'
                      })}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Ara Toplam</span>
                  <span>{subtotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Kargo</span>
                  <span>{shippingCost === 0 ? 'Ücretsiz' : shippingCost.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                </div>
                {shippingCost === 0 && (
                  <p className="text-sm text-green-600 dark:text-green-400">500 TL üzeri kargo bedava!</p>
                )}
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <div className="flex justify-between font-semibold text-lg text-gray-900 dark:text-white">
                  <span>Toplam</span>
                  <span>{total.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

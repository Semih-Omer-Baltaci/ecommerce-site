'use client';

import React, { useState, useEffect } from 'react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { stripePromise } from '../lib/stripe';
import { useTheme } from '@/contexts/ThemeContext';
import type { PaymentIntent } from '@stripe/stripe-js';

interface PaymentFormProps {
  amount: number;
  onSuccess: (paymentIntent: PaymentIntent) => void;
  onError: (error: string) => void;
  loading?: boolean;
}

const PaymentFormContent: React.FC<PaymentFormProps> = ({ amount, onSuccess, onError, loading = false }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { isDarkMode } = useTheme();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardName, setCardName] = useState('');
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      onError('Stripe yüklenemedi');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onError('Kart bilgileri yüklenemedi');
      return;
    }

    // Validation
    const newErrors: {[key: string]: string} = {};
    
    if (!cardName.trim()) {
      newErrors.cardName = 'Kart üzerindeki isim gerekli';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsProcessing(true);

    try {
      // First validate the card
      const { error: cardError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          name: cardName,
        },
      });

      if (cardError) {
        onError(cardError.message || 'Kart bilgileri geçersiz');
        return;
      }

      // Create payment intent
      const response = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          metadata: {
            cardName,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Payment intent oluşturulamadı');
      }

      const { clientSecret, error } = await response.json();

      if (error) {
        onError(error);
        return;
      }

      if (!clientSecret) {
        onError('Client secret alınamadı');
        return;
      }

      // Confirm payment
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: cardName,
          },
        },
      });

      if (confirmError) {
        onError(confirmError.message || 'Ödeme işlemi başarısız');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent);
      } else {
        onError('Ödeme durumu belirsiz');
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error('Payment error:', error);
      onError('Ödeme işlemi sırasında hata oluştu');
    } finally {
      setIsProcessing(false);
    }
  };

  // Stripe CardElement styling with dynamic colors for better visibility
  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: isDarkMode ? '#ffffff' : '#1f2937', // White text in dark mode, dark gray in light mode
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSmoothing: 'antialiased',
        '::placeholder': {
          color: isDarkMode ? '#9ca3af' : '#6b7280', // Light gray placeholders
        },
        backgroundColor: 'transparent',
        iconColor: isDarkMode ? '#ffffff' : '#1f2937', // Icon colors
      },
      invalid: {
        color: '#ef4444', // Red for invalid input
        iconColor: '#ef4444',
      },
      complete: {
        color: isDarkMode ? '#10b981' : '#059669', // Green for completed fields
        iconColor: isDarkMode ? '#10b981' : '#059669',
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Stripe Card Element */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Kart Bilgileri
        </label>
        <div className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 bg-white dark:bg-gray-700 transition-colors">
          <CardElement options={cardElementOptions} />
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Kart numarası, son kullanma tarihi ve CVV
        </p>
      </div>

      {/* Kart Üzerindeki İsim */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Kart Üzerindeki İsim
        </label>
        <input
          type="text"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          placeholder="İsim Soyisim"
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors ${
            errors.cardName ? 'border-red-500' : ''
          }`}
        />
        {errors.cardName && (
          <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
        )}
      </div>

      {/* Test Kartları Bilgisi */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Test Kartları</h4>
            <div className="text-sm text-blue-700 dark:text-blue-400 mt-1 space-y-1">
              <p><strong>Visa:</strong> 4242 4242 4242 4242</p>
              <p><strong>MasterCard:</strong> 5555 5555 5555 4444</p>
              <p><strong>Son kullanma:</strong> Gelecekteki herhangi bir tarih (12/25)</p>
              <p><strong>CVV:</strong> Herhangi 3 haneli sayı (123)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Güvenlik Bildirimi */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <h4 className="text-sm font-medium text-green-800 dark:text-green-300">Güvenli Ödeme</h4>
            <p className="text-sm text-green-700 dark:text-green-400 mt-1">
              Ödeme bilgileriniz Stripe ile SSL şifreleme kullanılarak güvenli olarak işlenir.
            </p>
          </div>
        </div>
      </div>

      {/* Ödeme Butonu */}
      <button
        type="submit"
        disabled={!stripe || isProcessing || loading}
        className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            İşleniyor...
          </>
        ) : (
          `${(amount).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })} Öde`
        )}
      </button>
    </form>
  );
};

const PaymentForm: React.FC<PaymentFormProps> = (props) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentFormContent {...props} />
    </Elements>
  );
};

export default PaymentForm;

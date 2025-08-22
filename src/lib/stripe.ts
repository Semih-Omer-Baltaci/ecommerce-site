import { loadStripe } from '@stripe/stripe-js';

// Stripe public key - production'da environment variable kullanın
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51234567890'; // Demo key

// Stripe instance'ını yükle
export const stripePromise = loadStripe(stripePublishableKey);

// Kart tipi algılama
export const getCardType = (cardNumber: string): string => {
  const number = cardNumber.replace(/\s/g, '');
  
  // Visa
  if (/^4/.test(number)) return 'visa';
  
  // MasterCard
  if (/^5[1-5]/.test(number) || /^2[2-7]/.test(number)) return 'mastercard';
  
  // American Express
  if (/^3[47]/.test(number)) return 'amex';
  
  // Discover
  if (/^6(?:011|5)/.test(number)) return 'discover';
  
  return 'unknown';
};

// Luhn algoritması ile kart numarası doğrulama
export const validateCardNumber = (cardNumber: string): boolean => {
  const number = cardNumber.replace(/\s/g, '');
  
  if (!/^\d+$/.test(number)) return false;
  if (number.length < 13 || number.length > 19) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

// CVV doğrulama
export const validateCVV = (cvv: string, cardType: string): boolean => {
  if (!/^\d+$/.test(cvv)) return false;
  
  if (cardType === 'amex') {
    return cvv.length === 4;
  }
  
  return cvv.length === 3;
};

// Son kullanma tarihi doğrulama
export const validateExpiryDate = (expiryDate: string): boolean => {
  const [month, year] = expiryDate.split('/');
  
  if (!month || !year) return false;
  
  const monthNum = parseInt(month);
  const yearNum = parseInt(`20${year}`);
  
  if (monthNum < 1 || monthNum > 12) return false;
  
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  
  if (yearNum < currentYear) return false;
  if (yearNum === currentYear && monthNum < currentMonth) return false;
  
  return true;
};

// Kart numarası formatlama
export const formatCardNumber = (value: string): string => {
  const number = value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
  const cardType = getCardType(number);
  
  let formatted = '';
  
  if (cardType === 'amex') {
    // American Express: 4-6-5 format
    formatted = number.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
  } else {
    // Visa, MasterCard, etc: 4-4-4-4 format
    formatted = number.replace(/(\d{4})(?=\d)/g, '$1 ');
  }
  
  return formatted.trim();
};

// Fiyat formatlama (TL)
export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY'
  }).format(amount);
};

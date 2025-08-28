'use client';

import { useState, useCallback } from 'react';

interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
  message: string;
}

interface ValidationRules {
  [key: string]: ValidationRule[];
}

interface ValidationErrors {
  [key: string]: string;
}

interface UseFormValidationResult {
  errors: ValidationErrors;
  validateField: (name: string, value: string) => boolean;
  validateForm: (formData: { [key: string]: string }) => boolean;
  clearErrors: () => void;
  clearFieldError: (name: string) => void;
}

export function useFormValidation(rules: ValidationRules): UseFormValidationResult {
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateField = useCallback((name: string, value: string): boolean => {
    const fieldRules = rules[name];
    if (!fieldRules) return true;

    for (const rule of fieldRules) {
      // Required validation
      if (rule.required && (!value || value.trim() === '')) {
        setErrors(prev => ({ ...prev, [name]: rule.message }));
        return false;
      }

      // Skip other validations if field is empty and not required
      if (!value || value.trim() === '') continue;

      // Min length validation
      if (rule.minLength && value.length < rule.minLength) {
        setErrors(prev => ({ ...prev, [name]: rule.message }));
        return false;
      }

      // Max length validation
      if (rule.maxLength && value.length > rule.maxLength) {
        setErrors(prev => ({ ...prev, [name]: rule.message }));
        return false;
      }

      // Pattern validation
      if (rule.pattern && !rule.pattern.test(value)) {
        setErrors(prev => ({ ...prev, [name]: rule.message }));
        return false;
      }

      // Custom validation
      if (rule.custom && !rule.custom(value)) {
        setErrors(prev => ({ ...prev, [name]: rule.message }));
        return false;
      }
    }

    // Clear error if validation passes
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    return true;
  }, [rules]);

  const validateForm = useCallback((formData: { [key: string]: string }): boolean => {
    let isValid = true;
    const newErrors: ValidationErrors = {};

    Object.keys(rules).forEach(fieldName => {
      const value = formData[fieldName] || '';
      const fieldRules = rules[fieldName];

      for (const rule of fieldRules) {
        // Required validation
        if (rule.required && (!value || value.trim() === '')) {
          newErrors[fieldName] = rule.message;
          isValid = false;
          break;
        }

        // Skip other validations if field is empty and not required
        if (!value || value.trim() === '') continue;

        // Min length validation
        if (rule.minLength && value.length < rule.minLength) {
          newErrors[fieldName] = rule.message;
          isValid = false;
          break;
        }

        // Max length validation
        if (rule.maxLength && value.length > rule.maxLength) {
          newErrors[fieldName] = rule.message;
          isValid = false;
          break;
        }

        // Pattern validation
        if (rule.pattern && !rule.pattern.test(value)) {
          newErrors[fieldName] = rule.message;
          isValid = false;
          break;
        }

        // Custom validation
        if (rule.custom && !rule.custom(value)) {
          newErrors[fieldName] = rule.message;
          isValid = false;
          break;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [rules]);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const clearFieldError = useCallback((name: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }, []);

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError,
  };
}

// Predefined validation rules for common use cases
export const validationRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Geçerli bir e-posta adresi giriniz',
  },
  phone: {
    required: true,
    pattern: /^(\+90|0)?[5][0-9]{9}$/,
    message: 'Geçerli bir telefon numarası giriniz (örn: 05XX XXX XX XX)',
  },
  required: (message: string = 'Bu alan zorunludur') => ({
    required: true,
    message,
  }),
  minLength: (length: number, message?: string) => ({
    minLength: length,
    message: message || `En az ${length} karakter olmalıdır`,
  }),
  cardNumber: {
    required: true,
    pattern: /^[0-9\s]{13,19}$/,
    message: 'Geçerli bir kart numarası giriniz',
  },
  cvv: {
    required: true,
    pattern: /^[0-9]{3,4}$/,
    message: 'Geçerli bir CVV giriniz',
  },
  expiryDate: {
    required: true,
    pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
    message: 'Geçerli bir son kullanma tarihi giriniz (MM/YY)',
  },
};

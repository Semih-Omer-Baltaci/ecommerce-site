'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Kullanıcı tipi
interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

// Auth state tipi
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Action tipleri
type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER_START' }
  | { type: 'REGISTER_SUCCESS'; payload: User }
  | { type: 'REGISTER_FAILURE' }
  | { type: 'LOAD_USER'; payload: User | null };

// Context tipi
interface AuthContextType {
  state: AuthState;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

// Reducer fonksiyonu
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'REGISTER_START':
      return {
        ...state,
        isLoading: true,
      };

    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };

    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };

    case 'LOAD_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}

// Context oluştur
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // LocalStorage'dan kullanıcı bilgilerini yükle
  useEffect(() => {
    const savedUser = localStorage.getItem('shopsemih-user');
    if (savedUser) {
      try {
        const user: User = JSON.parse(savedUser);
        dispatch({ type: 'LOAD_USER', payload: user });
      } catch (error) {
        console.error('Kullanıcı bilgileri yüklenirken hata:', error);
        localStorage.removeItem('shopsemih-user');
        dispatch({ type: 'LOAD_USER', payload: null });
      }
    } else {
      dispatch({ type: 'LOAD_USER', payload: null });
    }
  }, []);

  // Giriş fonksiyonu (simüle edilmiş)
  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });

    try {
      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Basit validasyon (gerçek uygulamada API'den gelecek)
      if (email && password.length >= 6) {
        const user: User = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0], // Email'den isim türet
          createdAt: new Date().toISOString(),
        };

        localStorage.setItem('shopsemih-user', JSON.stringify(user));
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return true;
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
        return false;
      }
    } catch (error) {
      console.error('Giriş hatası:', error);
      dispatch({ type: 'LOGIN_FAILURE' });
      return false;
    }
  };

  // Kayıt fonksiyonu (simüle edilmiş)
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'REGISTER_START' });

    try {
      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Basit validasyon
      if (name && email && password.length >= 6) {
        const user: User = {
          id: Date.now().toString(),
          email,
          name,
          createdAt: new Date().toISOString(),
        };

        localStorage.setItem('shopsemih-user', JSON.stringify(user));
        dispatch({ type: 'REGISTER_SUCCESS', payload: user });
        return true;
      } else {
        dispatch({ type: 'REGISTER_FAILURE' });
        return false;
      }
    } catch (error) {
      console.error('Kayıt hatası:', error);
      dispatch({ type: 'REGISTER_FAILURE' });
      return false;
    }
  };

  // Çıkış fonksiyonu
  const logout = () => {
    localStorage.removeItem('shopsemih-user');
    dispatch({ type: 'LOGOUT' });
  };

  const value: AuthContextType = {
    state,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

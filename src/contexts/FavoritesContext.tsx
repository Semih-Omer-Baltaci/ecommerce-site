'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Favori ürün tipi
interface FavoriteItem {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  rating: {
    rate: number;
    count: number;
  };
  addedAt: string;
}

// Favorites state tipi
interface FavoritesState {
  items: FavoriteItem[];
  totalItems: number;
}

// Action tipleri
type FavoritesAction =
  | { type: 'ADD_TO_FAVORITES'; payload: Omit<FavoriteItem, 'addedAt'> }
  | { type: 'REMOVE_FROM_FAVORITES'; payload: number }
  | { type: 'CLEAR_FAVORITES' }
  | { type: 'LOAD_FAVORITES'; payload: FavoriteItem[] };

// Context tipi
interface FavoritesContextType {
  state: FavoritesState;
  addToFavorites: (product: Omit<FavoriteItem, 'addedAt'>) => void;
  removeFromFavorites: (id: number) => void;
  clearFavorites: () => void;
  isFavorite: (id: number) => boolean;
}

// Initial state
const initialState: FavoritesState = {
  items: [],
  totalItems: 0,
};

// Reducer fonksiyonu
function favoritesReducer(state: FavoritesState, action: FavoritesAction): FavoritesState {
  switch (action.type) {
    case 'ADD_TO_FAVORITES': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        // Ürün zaten favorilerde varsa, hiçbir şey yapma
        return state;
      }

      const newItem: FavoriteItem = {
        ...action.payload,
        addedAt: new Date().toISOString(),
      };

      const newItems = [...state.items, newItem];
      return {
        items: newItems,
        totalItems: newItems.length,
      };
    }

    case 'REMOVE_FROM_FAVORITES': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: newItems,
        totalItems: newItems.length,
      };
    }

    case 'CLEAR_FAVORITES':
      return initialState;

    case 'LOAD_FAVORITES':
      return {
        items: action.payload,
        totalItems: action.payload.length,
      };

    default:
      return state;
  }
}

// Context oluştur
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Provider component
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // LocalStorage'dan favorileri yükle
  useEffect(() => {
    const savedFavorites = localStorage.getItem('shopsemih-favorites');
    if (savedFavorites) {
      try {
        const favoriteItems: FavoriteItem[] = JSON.parse(savedFavorites);
        dispatch({ type: 'LOAD_FAVORITES', payload: favoriteItems });
      } catch (error) {
        console.error('Favoriler yüklenirken hata:', error);
      }
    }
  }, []);

  // Favoriler değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem('shopsemih-favorites', JSON.stringify(state.items));
  }, [state.items]);

  // Action fonksiyonları
  const addToFavorites = (product: Omit<FavoriteItem, 'addedAt'>) => {
    dispatch({ type: 'ADD_TO_FAVORITES', payload: product });
  };

  const removeFromFavorites = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: id });
  };

  const clearFavorites = () => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  };

  const isFavorite = (id: number): boolean => {
    return state.items.some(item => item.id === id);
  };

  const value: FavoritesContextType = {
    state,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

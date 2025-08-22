'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

// Arama state tipi
interface SearchState {
  query: string;
  isSearching: boolean;
  results: Product[];
  totalResults: number;
}

// Product tipi (CartContext'ten aynısı)
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

// Context tipi
interface SearchContextType {
  searchState: SearchState;
  setQuery: (query: string) => void;
  setSearchQuery: (query: string) => void;
  performSearch: (products: Product[], query: string) => void;
  clearSearch: () => void;
}

// Initial state
const initialState: SearchState = {
  query: '',
  isSearching: false,
  results: [],
  totalResults: 0,
};

// Context oluştur
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// Provider component
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [searchState, setSearchState] = useState<SearchState>(initialState);

  // Arama query'sini güncelle
  const setQuery = useCallback((query: string) => {
    setSearchState(prev => ({
      ...prev,
      query: query.trim(),
    }));
  }, []);

  // Header için ayrı searchQuery setter (alias)
  const setSearchQuery = useCallback((query: string) => {
    setQuery(query);
  }, [setQuery]);

  // Arama yap
  const performSearch = useCallback((products: Product[], query: string) => {
    if (!query.trim()) {
      setSearchState(prev => ({
        ...prev,
        results: [],
        totalResults: 0,
        isSearching: false,
      }));
      return;
    }

    setSearchState(prev => ({ ...prev, isSearching: true }));

    // Arama algoritması
    const searchTerm = query.toLowerCase().trim();
    const results = products.filter(product => {
      const titleMatch = product.title.toLowerCase().includes(searchTerm);
      const categoryMatch = product.category.toLowerCase().includes(searchTerm);
      const descriptionMatch = product.description.toLowerCase().includes(searchTerm);
      
      return titleMatch || categoryMatch || descriptionMatch;
    });

    // Relevance score'a göre sırala (başlık eşleşmesi öncelikli)
    const sortedResults = results.sort((a, b) => {
      const aTitle = a.title.toLowerCase().includes(searchTerm);
      const bTitle = b.title.toLowerCase().includes(searchTerm);
      
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      
      // Eğer ikisi de başlık eşleşmesi varsa veya yoksa, rating'e göre sırala
      return b.rating.rate - a.rating.rate;
    });

    setSearchState(prev => ({
      ...prev,
      results: sortedResults,
      totalResults: sortedResults.length,
      isSearching: false,
    }));
  }, []);

  // Aramayı temizle
  const clearSearch = useCallback(() => {
    setSearchState(initialState);
  }, []);

  const value: SearchContextType = {
    searchState,
    setQuery,
    setSearchQuery,
    performSearch,
    clearSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

// Hook
export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}

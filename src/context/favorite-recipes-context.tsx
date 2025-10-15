'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';

interface FavoriteRecipesContextType {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
}

const FavoriteRecipesContext = createContext<FavoriteRecipesContextType | undefined>(undefined);

export function FavoriteRecipesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<number[]>('favoriteRecipes', []);

  const addFavorite = (id: number) => {
    setFavorites((prevFavorites) => [...prevFavorites, id]);
  };

  const removeFavorite = (id: number) => {
    setFavorites((prevFavorites) => prevFavorites.filter((favId) => favId !== id));
  };

  return (
    <FavoriteRecipesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoriteRecipesContext.Provider>
  );
}

export function useFavoriteRecipes() {
  const context = useContext(FavoriteRecipesContext);
  if (context === undefined) {
    throw new Error('useFavoriteRecipes must be used within a FavoriteRecipesProvider');
  }
  return context;
}

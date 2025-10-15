'use client';

import { FavoriteRecipesProvider } from '@/context/favorite-recipes-context';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
      <FavoriteRecipesProvider>
        {children}
      </FavoriteRecipesProvider>
  );
}

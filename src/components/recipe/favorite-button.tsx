'use client';

import { useFavoriteRecipes } from '@/context/favorite-recipes-context';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function FavoriteButton({ recipeId, className }: { recipeId: number, className?: string }) {
  const { favorites, addFavorite, removeFavorite } = useFavoriteRecipes();
  const [isFavorited, setIsFavorited] = useState(false);
  
  // This useEffect avoids hydration mismatch by ensuring local storage is only accessed on the client.
  useEffect(() => {
    setIsFavorited(favorites.includes(recipeId));
  }, [favorites, recipeId]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorited) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("absolute top-2 right-2 rounded-full bg-black/30 hover:bg-black/50 text-white", className)}
      onClick={toggleFavorite}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart className={cn('h-5 w-5', isFavorited ? 'fill-red-500 text-red-500' : 'text-white')} />
    </Button>
  );
}

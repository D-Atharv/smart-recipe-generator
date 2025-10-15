'use client';

import Link from 'next/link';
import { useFavoriteRecipes } from '@/context/favorite-recipes-context';
import { allRecipes } from '@/data/recipes';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { RecipeGrid } from '@/components/recipe/recipe-grid';

export default function FavoritesPage() {
  const { favorites } = useFavoriteRecipes();
  const favoriteRecipes = allRecipes.filter((recipe) => favorites.includes(recipe.id));

  return (
    <div className="container mx-auto px-4 py-8">
      {favoriteRecipes.length > 0 ? (
        <RecipeGrid allRecipes={favoriteRecipes} pageTitle="Your Favorite Recipes" />
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Heart className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-6 font-headline text-2xl font-semibold">No favorites yet</h2>
          <p className="mt-2 text-center text-muted-foreground">
            You haven&apos;t saved any recipes. Click the heart icon on a recipe to add it to your favorites.
          </p>
          <Link href="/explore" className="mt-6">
            <Button>Explore Recipes</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

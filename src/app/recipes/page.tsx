"use client";

import { Suspense } from "react";
import { RecipeGrid } from "@/components/recipe/recipe-grid";
import { allRecipes } from "@/data/recipes";
// import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "@/components/icons";
import { useRecognizedIngredients } from "@/context/ingredients-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function RecipesPageContent() {
  const { recognizedIngredients } = useRecognizedIngredients();

  return (
    <div className="container mx-auto px-4 py-8">
      {recognizedIngredients.length === 0 && (
        <div className="flex flex-col items-center justify-center text-center bg-card rounded-lg p-8 min-h-[400px]">
          <h3 className="font-headline text-2xl font-semibold">
            No Ingredients Scanned
          </h3>
          <p className="text-muted-foreground mt-2 mb-4">
            Upload a photo to find recipes you can make right now.
          </p>
          <Link href="/snap">
            <Button>Scan Ingredients</Button>
          </Link>
        </div>
      )}
      {recognizedIngredients.length > 0 && (
        <RecipeGrid
          allRecipes={allRecipes}
          recognizedIngredients={recognizedIngredients}
          pageTitle="Matching Recipes"
        />
      )}
    </div>
  );
}

export default function RecipesPage() {
  return (
    <Suspense fallback={<RecipePageSkeleton />}>
      <RecipesPageContent />
    </Suspense>
  );
}

function RecipePageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <LoadingSpinner className="h-12 w-12 text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">
          Finding delicious recipes for you...
        </p>
      </div>
    </div>
  );
}

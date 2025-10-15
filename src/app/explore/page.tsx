"use client";

import { Suspense } from "react";
import { RecipeGrid } from "@/components/recipe/recipe-grid";
import { allRecipes } from "@/data/recipes";
import { LoadingSpinner } from "@/components/icons";

function ExplorePageContent() {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <RecipeGrid allRecipes={allRecipes} pageTitle="Explore Recipes" />
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={<ExplorePageSkeleton />}>
      <ExplorePageContent />
    </Suspense>
  );
}

function ExplorePageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
        <LoadingSpinner className="h-12 w-12 text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">
          Loading all recipes...
        </p>
      </div>
    </div>
  );
}

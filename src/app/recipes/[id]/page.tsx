import { notFound } from 'next/navigation';
import Image from 'next/image';
import { allRecipes, getRecipeById } from '@/data/recipes';
import { getImageById } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { Clock, BarChart, Users, Soup, Star } from 'lucide-react';
import { SubstitutionSuggester } from '@/components/substitution-suggester';
import { Recipe } from '@/types';
import { Separator } from '@/components/ui/separator';
import RecipeCard from '@/components/recipe/recipe-card';

export async function generateStaticParams() {
  return allRecipes.map((recipe) => ({
    id: recipe.id.toString(),
  }));
}

export default function RecipePage({ params }: { params: { id: string } }) {
  const recipe = getRecipeById(parseInt(params.id, 10));

  if (!recipe) {
    notFound();
  }

  const recipeImage = getImageById(recipe.imageId);

  const recommendedRecipes = allRecipes
    .filter(
      (r) =>
        (r.cuisine === recipe.cuisine ||
          r.dietaryTags.some((tag) => recipe.dietaryTags.includes(tag))) &&
        r.id !== recipe.id
    )
    .slice(0, 3);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">{recipe.name}</h1>
          <p className="text-lg text-muted-foreground">{recipe.description}</p>
        </div>

        <div className="relative h-96 w-full overflow-hidden rounded-lg">
          {recipeImage && (
            <Image
              src={recipeImage.imageUrl}
              alt={recipe.name}
              fill
              priority
              className="object-cover"
              data-ai-hint={recipeImage.imageHint}
              placeholder="blur"
              blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
            />
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-5">
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-card p-4">
            <Clock className="h-6 w-6 text-accent-foreground" />
            <span className="font-semibold">{recipe.cookingTime} min</span>
            <span className="text-sm text-muted-foreground">Time</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-card p-4">
            <BarChart className="h-6 w-6 text-accent-foreground" />
            <span className="font-semibold">{recipe.difficulty}</span>
            <span className="text-sm text-muted-foreground">Difficulty</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-card p-4">
            <Users className="h-6 w-6 text-accent-foreground" />
            <span className="font-semibold">{recipe.servings} servings</span>
            <span className="text-sm text-muted-foreground">Servings</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-card p-4">
            <Soup className="h-6 w-6 text-accent-foreground" />
            <span className="font-semibold">{recipe.cuisine}</span>
            <span className="text-sm text-muted-foreground">Cuisine</span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 rounded-lg bg-card p-4">
            <Star className="h-6 w-6 text-accent-foreground" />
            <span className="font-semibold">{recipe.rating}/5</span>
            <span className="text-sm text-muted-foreground">Rating</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {recipe.dietaryTags.map((tag) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <h2 className="font-headline text-2xl font-semibold">Ingredients</h2>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              {recipe.ingredients.map((ing, index) => (
                <li key={index} className="flex justify-between">
                  <span>{ing.name}</span>
                  <span className="text-right">{`${ing.quantity} ${ing.unit}`}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h2 className="font-headline text-2xl font-semibold">Instructions</h2>
            <ol className="mt-4 list-decimal space-y-4 pl-5">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
        
        <Separator />
        
        <SubstitutionSuggester recipe={recipe} />

        <Separator />

        <div>
          <h2 className="font-headline text-3xl font-bold">You Might Also Like</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedRecipes.map((rec) => (
              <RecipeCard key={rec.id} recipe={rec} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

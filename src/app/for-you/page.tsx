"use client";

import Link from "next/link";
import { useFavoriteRecipes } from "@/context/favorite-recipes-context";
import { allRecipes } from "@/data/recipes";
import { Button } from "@/components/ui/button";
import { useActionState, useEffect, startTransition } from "react";
import { useFormStatus } from "react-dom";
import { getRecipeSuggestions } from "@/app/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Sparkles, User, Wand2 } from "lucide-react";
import { LoadingSpinner } from "@/components/icons";
import { motion } from "framer-motion";

const initialState = {
  message: "",
  suggestions: null,
  error: "",
};

function SubmitButton({ hasFavorites }: { hasFavorites: boolean }) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending || !hasFavorites}
      className="w-full md:w-auto"
    >
      {pending ? (
        <>
          <LoadingSpinner className="mr-2 h-5 w-5" />
          Finding Suggestions...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-5 w-5" />
          Get New Suggestions
        </>
      )}
    </Button>
  );
}

export default function ForYouPage() {
  const { favorites } = useFavoriteRecipes();
  const favoriteRecipes = allRecipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );
  const favoriteRecipeNames = favoriteRecipes.map((r) => r.name).join(", ");

  const [state, formAction] = useActionState(
    getRecipeSuggestions,
    initialState
  );

  // Wrap async call inside startTransition
  useEffect(() => {
    if (favoriteRecipes.length > 0) {
      const formData = new FormData();
      formData.append("favoriteRecipes", favoriteRecipeNames);

      startTransition(() => {
        formAction(formData);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (favoriteRecipes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <User className="h-8 w-8 text-primary" />
          </div>
          <h2 className="mt-6 font-headline text-2xl font-semibold">
            Get Personalized Suggestions
          </h2>
          <p className="mt-2 text-center text-muted-foreground">
            Add some recipes to your favorites, and we'll generate personalized
            recommendations just for you!
          </p>
          <Link href="/explore" className="mt-6">
            <Button>Explore Recipes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="font-headline text-3xl md:text-4xl font-bold">
          Suggestions For You
        </h1>
        <p className="text-muted-foreground mt-2">
          Based on your love for {favoriteRecipeNames}, here are some new ideas
          you might enjoy!
        </p>
      </motion.div>

      <form action={formAction}>
        <input
          type="hidden"
          name="favoriteRecipes"
          value={favoriteRecipeNames}
        />
        <div className="flex justify-center mb-8">
          <SubmitButton hasFavorites={favoriteRecipes.length > 0} />
        </div>
      </form>

      {state.error && !state.suggestions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {state.suggestions && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 space-y-6"
        >
          {state.suggestions.suggestions.map((suggestion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-primary" />
                    {suggestion.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{suggestion.reason}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {!state.suggestions && !state.error && (
        <div className="flex flex-col items-center justify-center h-full min-h-[200px]">
          <LoadingSpinner className="h-12 w-12 text-primary" />
          <p className="mt-4 text-lg text-muted-foreground">
            Finding suggestions for you...
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { generateRecipe } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoadingSpinner } from "@/components/icons";
import { AlertCircle, ChefHat, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const initialState = {
  message: "",
  recipe: null,
  error: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <LoadingSpinner className="mr-2 h-5 w-5" />
          Generating Recipe...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          Generate AI Recipe
        </>
      )}
    </Button>
  );
}

export default function RecommendationsPage() {
  const [state, formAction] = useActionState(generateRecipe, initialState);

  // Helper to render errors safely
  const renderError = (error: any) => {
    if (!error) return null;
    if (typeof error === "string") return error;
    if (typeof error === "object")
      return Object.values(error).flat().join(", ");
    return "Something went wrong.";
  };

  return (
    <div className="container mx-auto max-w-4xl py-12">
      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-3xl md:text-4xl font-bold">
              AI Recipe Generator
            </CardTitle>
            <CardDescription>
              Don't know what to cook? Enter the ingredients you have and let
              our AI create a unique recipe for you!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-6">
              {/* Ingredients */}
              <div className="space-y-2">
                <Label htmlFor="ingredients">Ingredients You Have</Label>
                <Input
                  id="ingredients"
                  name="ingredients"
                  placeholder="e.g., chicken breast, tomatoes, onion, garlic"
                  required
                />
                {typeof state.error === "object" &&
                  state.error?.ingredients && (
                    <p className="text-sm font-medium text-destructive">
                      {state.error.ingredients[0]}
                    </p>
                  )}
              </div>

              {/* Cuisine & Dietary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="cuisine">Cuisine (Optional)</Label>
                  <Input
                    id="cuisine"
                    name="cuisine"
                    placeholder="e.g., Italian, Mexican, Thai"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dietaryRestrictions">
                    Dietary Needs (Optional)
                  </Label>
                  <Select name="dietaryRestrictions">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a dietary need" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="vegetarian">Vegetarian</SelectItem>
                      <SelectItem value="vegan">Vegan</SelectItem>
                      <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                      <SelectItem value="dairy-free">Dairy-Free</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Submit */}
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </motion.div>

      {/* Error Alert */}
      {renderError(state.error || state.message) && !state.recipe && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {renderError(state.error || state.message)}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Recipe Display */}
      {state.recipe && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8"
        >
          <Card>
            <CardHeader className="text-center bg-muted/30">
              <ChefHat className="mx-auto h-10 w-10 text-primary" />
              <CardTitle className="font-headline text-3xl font-bold">
                {state.recipe.recipeName}
              </CardTitle>
              <CardDescription>{state.recipe.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-6 grid md:grid-cols-3 gap-8">
              {/* Ingredients */}
              <div className="md:col-span-1">
                <h3 className="font-headline text-xl font-semibold border-b pb-2 mb-4">
                  Ingredients
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {state.recipe.ingredients.map((ing: any, index: number) => (
                    <li key={index}>
                      {ing.quantity} {ing.unit} {ing.name}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Instructions */}
              <div className="md:col-span-2">
                <h3 className="font-headline text-xl font-semibold border-b pb-2 mb-4">
                  Instructions
                </h3>
                <ol className="list-decimal space-y-4 pl-5">
                  {state.recipe.instructions.map(
                    (step: string, index: number) => (
                      <li key={index}>{step}</li>
                    )
                  )}
                </ol>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

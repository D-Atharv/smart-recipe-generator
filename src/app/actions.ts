"use server";

import { recognizeIngredients as recognizeIngredientsFlow } from "@/ai/flows/ingredient-recognition-from-image";
import { getSubstitutionSuggestions as getSubstitutionSuggestionsFlow } from "@/ai/flows/ai-powered-substitution-suggestions";
import { generateRecipe as generateRecipeFlow } from "@/ai/flows/recipe-generation";
import { getRecipeSuggestions as getRecipeSuggestionsFlow } from "@/ai/flows/recipe-suggestions";
import { z } from "zod";

const recognizeSchema = z.object({
  photoDataUri: z.string(),
});

export async function recognizeIngredients(prevState: any, formData: FormData) {
  const validatedFields = recognizeSchema.safeParse({
    photoDataUri: formData.get("photoDataUri"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data.",
      ingredients: [],
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await recognizeIngredientsFlow({
      photoDataUri: validatedFields.data.photoDataUri,
    });
    return {
      message: "Ingredients recognized.",
      ingredients: result.ingredients,
      error: null,
    };
  } catch (error) {
    return {
      message: "An error occurred during ingredient recognition.",
      ingredients: [],
      error: "Recognition failed",
    };
  }
}

const suggestionSchema = z.object({
  ingredients: z.string(),
  dietaryRestrictions: z.string(),
  recipeName: z.string(),
});

export async function getSubstitutionSuggestions(
  prevState: any,
  formData: FormData
) {
  const validatedFields = suggestionSchema.safeParse({
    ingredients: formData.get("ingredients"),
    dietaryRestrictions: formData.get("dietaryRestrictions"),
    recipeName: formData.get("recipeName"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data.",
      suggestions: [],
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await getSubstitutionSuggestionsFlow(validatedFields.data);
    return {
      message: "Suggestions generated.",
      suggestions: result.suggestions,
      error: null,
    };
  } catch (error) {
    return {
      message: "An error occurred while generating suggestions.",
      suggestions: [],
      error: "Suggestion generation failed",
    };
  }
}

const recipeGenerationSchema = z.object({
  ingredients: z.string().min(1, "Please enter at least one ingredient."),
  cuisine: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
});

export async function generateRecipe(prevState: any, formData: FormData) {
  const validatedFields = recipeGenerationSchema.safeParse({
    ingredients: formData.get("ingredients"),
    cuisine: formData.get("cuisine"),
    dietaryRestrictions: formData.get("dietaryRestrictions"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data.",
      recipe: null,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await generateRecipeFlow(validatedFields.data);
    return {
      message: "Recipe generated.",
      recipe: result,
      error: null,
    };
  } catch (error) {
    return {
      message: "An error occurred while generating the recipe.",
      recipe: null,
      error: "Recipe generation failed",
    };
  }
}

const recipeSuggestionsSchema = z.object({
  favoriteRecipes: z.string(),
});

export async function getRecipeSuggestions(prevState: any, formData: FormData) {
  const validatedFields = recipeSuggestionsSchema.safeParse({
    favoriteRecipes: formData.get("favoriteRecipes"),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid form data.",
      suggestions: null,
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result = await getRecipeSuggestionsFlow(validatedFields.data);
    return {
      message: "Suggestions generated.",
      suggestions: result,
      error: null,
    };
  } catch (error) {
    return {
      message: "An error occurred while generating suggestions.",
      suggestions: null,
      error: "Suggestion generation failed",
    };
  }
}

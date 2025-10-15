"use server";

/**
 * @fileOverview Provides AI-powered recipe suggestions based on user preferences.
 *
 * - `getRecipeSuggestions` - A function that suggests recipes based on a user's favorite recipes.
 * - `RecipeSuggestionsInput` - The input type for the `getRecipeSuggestions` function.
 * - `RecipeSuggestionsOutput` - The return type for the `getRecipeSuggestions` function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const RecipeSuggestionsInputSchema = z.object({
  favoriteRecipes: z
    .string()
    .describe("A comma-separated list of the user's favorite recipe names."),
});
export type RecipeSuggestionsInput = z.infer<
  typeof RecipeSuggestionsInputSchema
>;

const RecipeSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(
      z.object({
        name: z.string().describe("The name of the suggested recipe."),
        reason: z
          .string()
          .describe(
            "A brief explanation for why the user might like this recipe, based on their favorites."
          ),
      })
    )
    .describe("A list of new recipe suggestions."),
});
export type RecipeSuggestionsOutput = z.infer<
  typeof RecipeSuggestionsOutputSchema
>;

export async function getRecipeSuggestions(
  input: RecipeSuggestionsInput
): Promise<RecipeSuggestionsOutput> {
  return recipeSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: "recipeSuggestionsPrompt",
  input: { schema: RecipeSuggestionsInputSchema },
  output: { schema: RecipeSuggestionsOutputSchema },
  prompt: `You are a culinary expert who provides personalized recipe recommendations.
  Based on the user's list of favorite recipes, suggest 3 new recipes they might enjoy.

  User's Favorite Recipes: {{{favoriteRecipes}}}

  For each suggestion, provide the recipe name and a short, compelling reason why it's a good match based on their stated preferences.
  Do not repeat any of the recipes from the user's favorite list.
  The suggestions should be for recipes that are commonly known or can be easily found.
  `,
});

const recipeSuggestionsFlow = ai.defineFlow(
  {
    name: "recipeSuggestionsFlow",
    inputSchema: RecipeSuggestionsInputSchema,
    outputSchema: RecipeSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

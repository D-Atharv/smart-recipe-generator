"use server";

/**
 * @fileOverview Provides AI-powered recipe generation.
 *
 * - `generateRecipe` - A function that generates a new recipe.
 * - `GenerateRecipeInput` - The input type for the `generateRecipe` function.
 * - `GenerateRecipeOutput` - The return type for the `generateRecipe` function.
 */

import { ai } from "@/ai/genkit";
import { z } from "genkit";

const GenerateRecipeInputSchema = z.object({
  ingredients: z
    .string()
    .describe("A comma-separated list of ingredients the user has."),
  cuisine: z
    .string()
    .optional()
    .describe("The desired cuisine type for the recipe."),
  dietaryRestrictions: z
    .string()
    .optional()
    .describe(
      "Dietary restrictions to consider (e.g., vegetarian, gluten-free)."
    ),
});
export type GenerateRecipeInput = z.infer<typeof GenerateRecipeInputSchema>;

const GenerateRecipeOutputSchema = z.object({
  recipeName: z.string().describe("The name of the generated recipe."),
  description: z
    .string()
    .describe("A brief, appetizing description of the recipe."),
  ingredients: z
    .array(
      z.object({
        name: z.string(),
        quantity: z.string(),
        unit: z.string(),
      })
    )
    .describe("The list of ingredients for the recipe."),
  instructions: z
    .array(z.string())
    .describe("The step-by-step cooking instructions."),
});
export type GenerateRecipeOutput = z.infer<typeof GenerateRecipeOutputSchema>;

export async function generateRecipe(
  input: GenerateRecipeInput
): Promise<GenerateRecipeOutput> {
  return recipeGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: "recipeGenerationPrompt",
  input: { schema: GenerateRecipeInputSchema },
  output: { schema: GenerateRecipeOutputSchema },
  prompt: `You are an expert chef who creates delicious and creative recipes. Generate a new recipe based on the following user inputs.

  Available Ingredients: {{{ingredients}}}
  {{#if cuisine}}
  Cuisine Preference: {{{cuisine}}}
  {{/if}}
  {{#if dietaryRestrictions}}
  Dietary Restrictions: {{{dietaryRestrictions}}}
  {{/if}}

  Create a complete recipe. The recipe should primarily use the available ingredients, but you can include a few common pantry staples if necessary. Ensure the instructions are clear and easy to follow.
  `,
});

const recipeGenerationFlow = ai.defineFlow(
  {
    name: "recipeGenerationFlow",
    inputSchema: GenerateRecipeInputSchema,
    outputSchema: GenerateRecipeOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);

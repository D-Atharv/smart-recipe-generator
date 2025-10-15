// Implemented the AI-Powered Substitution Suggestions flow.

'use server';

/**
 * @fileOverview Provides AI-powered suggestions for ingredient substitutions based on dietary restrictions.
 *
 * - `getSubstitutionSuggestions` - A function that suggests ingredient substitutions.
 * - `SubstitutionSuggestionsInput` - The input type for the `getSubstitutionSuggestions` function.
 * - `SubstitutionSuggestionsOutput` - The return type for the `getSubstitutionSuggestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SubstitutionSuggestionsInputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of ingredients in the recipe.'),
  dietaryRestrictions: z
    .string()
    .describe(
      'Dietary restrictions to consider when suggesting substitutions (e.g., vegetarian, gluten-free, dairy-free).'
    ),
  recipeName: z.string().describe('The name of the recipe.'),
});
export type SubstitutionSuggestionsInput = z.infer<typeof SubstitutionSuggestionsInputSchema>;

const SubstitutionSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      'An array of suggested ingredient substitutions based on the provided dietary restrictions.'
    ),
});
export type SubstitutionSuggestionsOutput = z.infer<typeof SubstitutionSuggestionsOutputSchema>;

export async function getSubstitutionSuggestions(
  input: SubstitutionSuggestionsInput
): Promise<SubstitutionSuggestionsOutput> {
  return substitutionSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'substitutionSuggestionsPrompt',
  input: {schema: SubstitutionSuggestionsInputSchema},
  output: {schema: SubstitutionSuggestionsOutputSchema},
  prompt: `You are a helpful AI assistant that suggests ingredient substitutions for recipes based on dietary restrictions.

  Recipe Name: {{{recipeName}}}
  Ingredients: {{{ingredients}}}
  Dietary Restrictions: {{{dietaryRestrictions}}}

  Please provide a list of ingredient substitutions that adhere to the specified dietary restrictions. Provide specific brand recommendations if possible. Return only the list of suggested substitutions.
  Use the following format:
  - Original ingredient: Suggested substitution
  `,
});

const substitutionSuggestionsFlow = ai.defineFlow(
  {
    name: 'substitutionSuggestionsFlow',
    inputSchema: SubstitutionSuggestionsInputSchema,
    outputSchema: SubstitutionSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

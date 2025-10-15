'use server';
/**
 * @fileOverview This file defines a Genkit flow for recognizing ingredients from an image.
 *
 * It takes an image as input and returns a list of identified ingredients.
 *
 * @fileOverview
 * - `recognizeIngredients`: An async function that takes an image data URI as input and returns a list of ingredients.
 * - `RecognizeIngredientsInput`: The input type for the recognizeIngredients function, which includes the image data URI.
 * - `RecognizeIngredientsOutput`: The output type for the recognizeIngredients function, which is a list of ingredient names.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecognizeIngredientsInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      'A photo of ingredients, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected the expected format
    ),
});
export type RecognizeIngredientsInput = z.infer<typeof RecognizeIngredientsInputSchema>;

const RecognizeIngredientsOutputSchema = z.object({
  ingredients: z.array(z.string()).describe('A list of identified ingredients.'),
});
export type RecognizeIngredientsOutput = z.infer<typeof RecognizeIngredientsOutputSchema>;

export async function recognizeIngredients(input: RecognizeIngredientsInput): Promise<RecognizeIngredientsOutput> {
  return recognizeIngredientsFlow(input);
}

const recognizeIngredientsPrompt = ai.definePrompt({
  name: 'recognizeIngredientsPrompt',
  input: {schema: RecognizeIngredientsInputSchema},
  output: {schema: RecognizeIngredientsOutputSchema},
  prompt: `You are an AI assistant designed to identify ingredients from a photo.  Please return a list of ingredients.

  Photo: {{media url=photoDataUri}}
  
  Respond with only ingredient names in array format. For example: ["flour", "sugar", "eggs"]`,
});

const recognizeIngredientsFlow = ai.defineFlow(
  {
    name: 'recognizeIngredientsFlow',
    inputSchema: RecognizeIngredientsInputSchema,
    outputSchema: RecognizeIngredientsOutputSchema,
  },
  async input => {
    const {output} = await recognizeIngredientsPrompt(input);
    return output!;
  }
);

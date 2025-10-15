'use client';

import { useActionState } from 'react';
import { Button } from './ui/button';
import { getSubstitutionSuggestions } from '@/app/actions';
import { Recipe } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { AlertCircle, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { useFormStatus } from 'react-dom';
import { LoadingSpinner } from './icons';

const initialState = {
  message: '',
  suggestions: [],
  error: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <LoadingSpinner className="mr-2 h-5 w-5" />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-5 w-5" />
          <span>Get AI Suggestions</span>
        </>
      )}
    </Button>
  );
}

export function SubstitutionSuggester({ recipe }: { recipe: Recipe }) {
  const [state, formAction] = useActionState(getSubstitutionSuggestions, initialState);

  const ingredientsString = recipe.ingredients.map((i) => i.name).join(', ');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl font-semibold">Need a Substitution?</CardTitle>
        <CardDescription>
          Select a dietary restriction and our AI will suggest alternative ingredients.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <input type="hidden" name="ingredients" value={ingredientsString} />
          <input type="hidden" name="recipeName" value={recipe.name} />

          <Select name="dietaryRestrictions" required>
            <SelectTrigger>
              <SelectValue placeholder="Select a dietary restriction" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vegetarian">Vegetarian</SelectItem>
              <SelectItem value="vegan">Vegan</SelectItem>
              <SelectItem value="gluten-free">Gluten-Free</SelectItem>
              <SelectItem value="dairy-free">Dairy-Free</SelectItem>
            </SelectContent>
          </Select>

          <SubmitButton />
        </form>

        {state.error && (
           <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
          </Alert>
        )}

        {state.suggestions && state.suggestions.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold font-headline">Suggestions:</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
              {state.suggestions.map((suggestion, index) => (
                <li key={index}>{suggestion}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

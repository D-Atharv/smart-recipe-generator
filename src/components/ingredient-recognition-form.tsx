'use client';

import { useEffect, useRef, useState } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { recognizeIngredients } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Upload } from 'lucide-react';
import { LoadingSpinner } from './icons';

const initialState = {
  message: '',
  ingredients: [],
  error: null,
};

function SubmitButton({ isSearching }: { isSearching: boolean }) {
  const { pending } = useFormStatus();
  const isDisabled = pending || isSearching;

  return (
    <Button type="submit" disabled={isDisabled} className="w-full">
      {isDisabled ? (
        <>
          <LoadingSpinner className="mr-2 h-4 w-4" />
          Finding Recipes...
        </>
      ) : (
        'Find Recipes with these Ingredients'
      )}
    </Button>
  );
}

export function IngredientRecognitionForm({
  onIngredientsRecognized,
  onSearchStart,
  isSearching,
}: {
  onIngredientsRecognized: (ingredients: string[]) => void;
  onSearchStart: () => void;
  isSearching: boolean;
}) {
  const [state, formAction] = useActionState(recognizeIngredients, initialState);
  const [photoDataUri, setPhotoDataUri] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.ingredients && state.ingredients.length > 0) {
      onIngredientsRecognized(state.ingredients);
    }
    // If the submission fails or returns no ingredients, reset the searching state
    if (state.error || (state.message && state.ingredients.length === 0)) {
       onIngredientsRecognized([]); // Resets parent state
    }
  }, [state, onIngredientsRecognized]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setPhotoDataUri(loadEvent.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormAction = (formData: FormData) => {
    if (!photoDataUri) return;
    onSearchStart();
    formAction(formData);
  };

  return (
    <form action={handleFormAction} className="space-y-6">
        <input
            type="hidden"
            name="photoDataUri"
            value={photoDataUri || ''}
        />
        <div
            className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
        >
            <Input
            ref={fileInputRef}
            id="picture"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
            />
            {photoDataUri ? (
            <Image src={photoDataUri} alt="Ingredients preview" fill className="object-contain rounded-lg p-2" />
            ) : (
            <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">
                <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
            </div>
            )}
        </div>

        {state.error && (
            <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.message}</AlertDescription>
            </Alert>
        )}

        {photoDataUri && <SubmitButton isSearching={isSearching} />}
    </form>
  );
}

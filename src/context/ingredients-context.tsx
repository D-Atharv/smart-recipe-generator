'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

interface RecognizedIngredientsContextType {
  recognizedIngredients: string[];
  setRecognizedIngredients: (ingredients: string[]) => void;
}

const RecognizedIngredientsContext = createContext<RecognizedIngredientsContextType | undefined>(undefined);

export function RecognizedIngredientsProvider({ children }: { children: ReactNode }) {
  const [recognizedIngredients, setRecognizedIngredients] = useState<string[]>([]);

  return (
    <RecognizedIngredientsContext.Provider value={{ recognizedIngredients, setRecognizedIngredients }}>
      {children}
    </RecognizedIngredientsContext.Provider>
  );
}

export function useRecognizedIngredients() {
  const context = useContext(RecognizedIngredientsContext);
  if (context === undefined) {
    throw new Error('useRecognizedIngredients must be used within a RecognizedIngredientsProvider');
  }
  return context;
}

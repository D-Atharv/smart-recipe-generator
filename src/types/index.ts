export type Ingredient = {
  name: string;
  quantity: number | string;
  unit: string;
};

export type Recipe = {
  id: number;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  cookingTime: number; // in minutes
  difficulty: "Easy" | "Medium" | "Hard";
  servings: number;
  nutritionalInfo: {
    calories: number;
    protein: number; // in grams
  };
  cuisine: string;
  dietaryTags: ("Vegetarian" | "Gluten-Free" | "Dairy-Free" | "Vegan")[];
  rating: number; // from 1 to 5
  imageId: string; // Corresponds to ID in placeholder-images.json
  matchCount?: number;
  relevanceScore?: number;
  textForEmbedding?: string;
};

import { Recipe } from "@/types";
import { semanticSearch, logicSearch } from "@/lib/semantic-search";

/** Combined search using recognizedIngredients only */
export function combinedSearch(
  queryEmbedding: number[] | null,
  recognizedIngredients: string[],
  dietaryFilters: string[],
  difficultyFilters: string[],
  allRecipes: Recipe[]
): (Recipe & any)[] {
  console.log("🚀 Starting combined search...");
  console.log("Recognized Ingredients:", recognizedIngredients);
  console.log("Dietary Filters:", dietaryFilters);
  console.log("Difficulty Filters:", difficultyFilters);
  console.log("Query Embedding:", queryEmbedding);

  if (recognizedIngredients.length === 0) {
    return [];
  }

  let results: (Recipe & any)[] = [];

  if (results.length === 0) {
    results = logicSearch(recognizedIngredients, allRecipes, dietaryFilters);
  }

  if (difficultyFilters.length > 0) {
    results = results.filter((r) => difficultyFilters.includes(r.difficulty));
  }

  return results;
}

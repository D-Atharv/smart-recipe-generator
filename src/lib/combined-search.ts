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

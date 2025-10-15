import { Recipe } from "@/types";
import recipeEmbeddings from "@/data/recipe_embeddings.json";

/** Cosine similarity */
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
  const dot = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
  const magA = Math.sqrt(vecA.reduce((acc, val) => acc + val ** 2, 0));
  const magB = Math.sqrt(vecB.reduce((acc, val) => acc + val ** 2, 0));
  return magA && magB ? dot / (magA * magB) : 0;
}

/** Get embedding for a recipe ID */
export function getEmbedding(id: number): number[] | undefined {
  return (recipeEmbeddings as any)[`recipe_${id}`];
}

/** Semantic search using cosine similarity */
export function semanticSearch(
  queryEmbedding: number[],
  recipes: Recipe[],
  topK = 10
): (Recipe & { similarity: number })[] {
  return recipes
    .map((recipe) => {
      const embedding = getEmbedding(recipe.id);
      const similarity = embedding
        ? cosineSimilarity(queryEmbedding, embedding)
        : 0;
      return { ...recipe, similarity };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);
}

/** Textual search */
export function textualSearch(query: string, recipes: Recipe[]): Recipe[] {
  const q = query.toLowerCase();
  return recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(q) ||
      recipe.description.toLowerCase().includes(q) ||
      recipe.ingredients.some((i) => i.name.toLowerCase().includes(q))
  );
}

/** Logic-based search: ingredients + dietary restrictions */
export function logicSearch(
  recognizedIngredients: string[],
  recipes: Recipe[],
  dietaryFilters: string[] = []
): (Recipe & { matchCount: number })[] {
  return recipes
    .map((recipe) => {
      const recipeIngredients = recipe.ingredients.map((i) =>
        i.name.toLowerCase()
      );
      let matchCount = recognizedIngredients.reduce((count, ing) => {
        return recipeIngredients.some(
          (ri) =>
            ri.includes(ing.toLowerCase()) || ing.toLowerCase().includes(ri)
        )
          ? count + 1
          : count;
      }, 0);

      return { ...recipe, matchCount };
    })
    .filter((r) => r.matchCount > 0)
    .filter((r) =>
      dietaryFilters.length > 0
        ? dietaryFilters.every((filter) =>
            r.dietaryTags.includes(filter as any)
          )
        : true
    )
    .sort((a, b) => (b.matchCount ?? 0) - (a.matchCount ?? 0));
}

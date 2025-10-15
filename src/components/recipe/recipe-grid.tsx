"use client";

import { useState, useMemo, useEffect } from "react";
import { Recipe } from "@/types";
import RecipeCard from "./recipe-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

const dietaryOptions: Recipe["dietaryTags"][number][] = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Dairy-Free",
];
const difficultyOptions: Recipe["difficulty"][] = ["Easy", "Medium", "Hard"];

export function RecipeGrid({
  allRecipes,
  recognizedIngredients = [],
  pageTitle,
}: {
  allRecipes: Recipe[];
  recognizedIngredients?: string[];
  pageTitle: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([]);
  const [difficultyFilters, setDifficultyFilters] = useState<string[]>([]);

  const handleDietaryChange = (tag: string) => {
    setDietaryFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleDifficultyChange = (level: string) => {
    setDifficultyFilters((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    );
  };

  const filteredRecipes = useMemo(() => {
    let recipes = [...allRecipes];
    const hasActiveSearch = recognizedIngredients.length > 0;

    // Calculate match count and relevance score for each recipe
    recipes = recipes.map((recipe) => {
      const recipeIngredients = recipe.ingredients.map((i) =>
        i.name.toLowerCase()
      );
      let matchCount = 0;
      if (hasActiveSearch) {
        matchCount = recognizedIngredients.reduce((count, recogIng) => {
          const isMatch = recipeIngredients.some(
            (recipeIng) =>
              recipeIng.includes(recogIng.toLowerCase()) ||
              recogIng.includes(recipeIng)
          );
          return isMatch ? count + 1 : count;
        }, 0);
      }
      // The relevance score is the percentage of recognized ingredients that are in the recipe.
      const relevanceScore = hasActiveSearch
        ? matchCount / recognizedIngredients.length
        : 0;
      return { ...recipe, matchCount, relevanceScore };
    });

    // Primary filtering based on recognized ingredients if a search is active
    if (hasActiveSearch) {
      recipes = recipes.filter((r) => (r.matchCount ?? 0) > 0);
    }

    // Search term filtering
    if (searchTerm) {
      recipes = recipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.some((ing) =>
            ing.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Secondary filtering based on UI controls
    if (dietaryFilters.length > 0) {
      recipes = recipes.filter((r) =>
        dietaryFilters.every((filter) => r.dietaryTags.includes(filter as any))
      );
    }
    if (difficultyFilters.length > 0) {
      recipes = recipes.filter((r) => difficultyFilters.includes(r.difficulty));
    }

    // Sorting
    recipes.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "time":
          return a.cookingTime - b.cookingTime;
        case "relevance":
        default:
          if (hasActiveSearch) {
            // Sort by relevance score first, then by match count.
            if ((b.relevanceScore ?? 0) !== (a.relevanceScore ?? 0)) {
              return (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0);
            }
            return (b.matchCount ?? 0) - (a.matchCount ?? 0);
          }
          // For non-search pages, relevance doesn't apply, so you could default to another sort or keep natural order
          return b.rating - a.rating;
      }
    });

    return recipes;
  }, [
    allRecipes,
    recognizedIngredients,
    sortBy,
    dietaryFilters,
    difficultyFilters,
    searchTerm,
  ]);

  const hasActiveIngredientSearch = recognizedIngredients.length > 0;

  // Set a default sort order when the component mounts if it's not a search page.
  useEffect(() => {
    if (!hasActiveIngredientSearch) {
      setSortBy("rating");
    } else {
      setSortBy("relevance");
    }
  }, [hasActiveIngredientSearch]);

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-headline text-3xl font-bold">{pageTitle}</h2>
        {hasActiveIngredientSearch && (
          <p className="text-muted-foreground">
            Showing recipes based on: {recognizedIngredients.join(", ")}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1 self-start">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-headline text-lg font-semibold mb-4">
                Filter & Sort
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="search">Search</Label>
                  <Input
                    id="search"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Sort by</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      {hasActiveIngredientSearch && (
                        <SelectItem value="relevance">Relevance</SelectItem>
                      )}
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="time">Cooking Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <Accordion
                  type="multiple"
                  defaultValue={["dietary", "difficulty"]}
                  className="w-full"
                >
                  <AccordionItem value="dietary">
                    <AccordionTrigger className="font-semibold">
                      Dietary Needs
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      {dietaryOptions.map((tag) => (
                        <div key={tag} className="flex items-center space-x-2">
                          <Checkbox
                            id={tag}
                            checked={dietaryFilters.includes(tag)}
                            onCheckedChange={() => handleDietaryChange(tag)}
                          />
                          <Label htmlFor={tag}>{tag}</Label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="difficulty">
                    <AccordionTrigger className="font-semibold">
                      Difficulty
                    </AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      {difficultyOptions.map((level) => (
                        <div
                          key={level}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={level}
                            checked={difficultyFilters.includes(level)}
                            onCheckedChange={() =>
                              handleDifficultyChange(level)
                            }
                          />
                          <Label htmlFor={level}>{level}</Label>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3">
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full bg-card rounded-lg p-8">
              <h3 className="font-headline text-2xl font-semibold">
                No Recipes Found
              </h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters or search terms.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

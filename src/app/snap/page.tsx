"use client";

import { useRouter } from "next/navigation";
import { IngredientRecognitionForm } from "@/components/ingredient-recognition-form";
import { useState, useRef } from "react";
import { useRecognizedIngredients } from "@/context/ingredients-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

export default function SnapPage() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const { setRecognizedIngredients } = useRecognizedIngredients();
  const [manualIngredients, setManualIngredients] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<"snap" | "manual">("snap");

  const hasSubmitted = useRef(false);

  const dietaryOptions = [
    "Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Nut-Free",
    "Keto",
  ];

  const handleIngredientsRecognized = (ingredients: string[]) => {
    if (hasSubmitted.current) return;
    hasSubmitted.current = true;

    setIsSearching(false);
    setRecognizedIngredients(ingredients);

    setTimeout(() => {
      router.push("/recipes");
    }, 0);
  };

  const handleManualSubmit = () => {
    if (!manualIngredients.trim()) return;

    const ingredientsArray = manualIngredients
      .split(",")
      .map((i) => i.trim())
      .filter(Boolean);

    if (ingredientsArray.length === 0) return;

    const finalIngredients = [...ingredientsArray, ...dietaryPreferences];
    setRecognizedIngredients(finalIngredients);
    router.push("/recipes");
  };

  const handleSearchStart = () => setIsSearching(true);

  const toggleDietaryPreference = (option: string) => {
    setDietaryPreferences((prev) =>
      prev.includes(option)
        ? prev.filter((p) => p !== option)
        : [...prev, option]
    );
  };

  return (
    <section className="w-full max-w-2xl mx-auto py-12 md:py-20 space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4"
      >
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
          Add your ingredients
        </h2>
        <p className="mt-4 text-muted-foreground text-lg md:text-xl">
          Snap a picture or manually input your ingredients and dietary
          preferences to get personalized AI recipes.
        </p>
      </motion.div>

      {/* Main Card */}
      <Card className="overflow-hidden shadow-md">
        <CardHeader className="text-center p-8 bg-muted/30 border-b">
          <CardTitle className="font-headline text-3xl md:text-4xl font-bold mb-4">
            Choose how to add ingredients
          </CardTitle>

          <div className="flex justify-center gap-4">
            <Button
              variant={activeTab === "snap" ? "default" : "outline"}
              onClick={() => setActiveTab("snap")}
              className={`transition-all duration-300 ${
                activeTab === "snap" ? "scale-105 shadow-sm" : "opacity-80"
              }`}
            >
              Snap a Photo
            </Button>
            <Button
              variant={activeTab === "manual" ? "default" : "outline"}
              onClick={() => setActiveTab("manual")}
              className={`transition-all duration-300 ${
                activeTab === "manual" ? "scale-105 shadow-sm" : "opacity-80"
              }`}
            >
              Manual Input
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-6">
          <AnimatePresence mode="wait">
            {activeTab === "snap" && (
              <motion.div
                key="snap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <IngredientRecognitionForm
                  onIngredientsRecognized={handleIngredientsRecognized}
                  onSearchStart={handleSearchStart}
                  isSearching={isSearching}
                />
                <p className="text-sm text-muted-foreground text-center mt-4">
                  Prefer typing instead?{" "}
                  <button
                    onClick={() => setActiveTab("manual")}
                    className="text-primary underline hover:opacity-80"
                  >
                    Switch to manual input
                  </button>
                </p>
              </motion.div>
            )}

            {activeTab === "manual" && (
              <motion.div
                key="manual"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="ingredients">
                      Ingredients (comma separated)
                    </Label>
                    <Input
                      id="ingredients"
                      value={manualIngredients}
                      onChange={(e) => setManualIngredients(e.target.value)}
                      placeholder="e.g., tomato, onion, garlic"
                    />
                  </div>

                  <div>
                    <Label className="mb-2 block font-medium">
                      Dietary Preferences
                    </Label>
                    <div className="flex flex-wrap gap-3">
                      {dietaryOptions.map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={option}
                            checked={dietaryPreferences.includes(option)}
                            onCheckedChange={() =>
                              toggleDietaryPreference(option)
                            }
                          />
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button onClick={handleManualSubmit} className="mt-2 w-full">
                    Get Recipes
                  </Button>

                  <p className="text-sm text-muted-foreground text-center mt-4">
                    Want to use your camera?{" "}
                    <button
                      onClick={() => setActiveTab("snap")}
                      className="text-primary underline hover:opacity-80"
                    >
                      Switch to Snap Mode
                    </button>
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </section>
  );
}

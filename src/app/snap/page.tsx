"use client";

import { useRouter } from "next/navigation";
import { IngredientRecognitionForm } from "@/components/ingredient-recognition-form";
import { useState } from "react";
import { useRecognizedIngredients } from "@/context/ingredients-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";

export default function SnapPage() {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);
  const { setRecognizedIngredients } = useRecognizedIngredients();

  const handleIngredientsRecognized = (ingredients: string[]) => {
    setIsSearching(false);
    setRecognizedIngredients(ingredients);
    router.push("/recipes");
  };

  const handleSearchStart = () => {
    setIsSearching(true);
  };

  return (
    <section className="w-full max-w-2xl mx-auto py-12 md:py-20 space-y-10">
      {/* Informational Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center px-4"
      >
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">
          Want to manually add your ingredients?
        </h2>
        <p className="mt-4 text-muted-foreground text-lg md:text-xl">
          You can snap a picture or manually input your ingredients and get
          personalized AI recipe suggestions. Just click{" "}
          <span className="font-semibold text-accent text-green-500">
            "Get AI Recipe"
          </span>{" "}
          in the navbar above to explore.
        </p>
      </motion.div>

      {/* Main Card */}
      <Card className="overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CardHeader className="text-center p-8 bg-muted/30">
            <h1 className="font-headline text-3xl md:text-4xl font-bold">
              Snap a pic, get a recipe!
            </h1>
            <CardDescription className="text-base md:text-lg">
              Upload a photo of your ingredients and let our AI find the perfect
              dish for you.
            </CardDescription>
          </CardHeader>
        </motion.div>

        <CardContent className="p-8">
          <IngredientRecognitionForm
            onIngredientsRecognized={handleIngredientsRecognized}
            onSearchStart={handleSearchStart}
            isSearching={isSearching}
          />
        </CardContent>
      </Card>
    </section>
  );
}

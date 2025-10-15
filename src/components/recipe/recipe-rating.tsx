"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

export function RecipeRating({
  initialRating,
  recipeName,
}: {
  initialRating: number;
  recipeName: string;
}) {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const { toast } = useToast();

  const handleRating = (rate: number) => {
    setRating(rate);
    toast({
      title: "Rating Submitted!",
      description: `You've rated ${recipeName} ${rate} out of 5 stars.`,
    });
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => {
        const starRating = index + 1;
        return (
          <button
            key={starRating}
            onClick={() => handleRating(starRating)}
            onMouseEnter={() => setHoverRating(starRating)}
            onMouseLeave={() => setHoverRating(0)}
            className="focus:outline-none"
            aria-label={`Rate ${starRating} out of 5 stars`}
          >
            <Star
              className={cn(
                "h-7 w-7 transition-colors",
                starRating <= (hoverRating || rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-muted-foreground/50"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

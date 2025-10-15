import Link from 'next/link';
import Image from 'next/image';
import { Recipe } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getImageById } from '@/lib/placeholder-images';
import { Clock, BarChart, Star } from 'lucide-react';
import FavoriteButton from './favorite-button';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const image = getImageById(recipe.imageId);

  return (
    <Link href={`/recipes/${recipe.id}`} className="group">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0 relative">
          <div className="aspect-[4/3] relative w-full">
            {image && (
              <Image
                src={image.imageUrl}
                alt={recipe.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw"
                data-ai-hint={image.imageHint}
                placeholder="blur"
                blurDataURL="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
              />
            )}
             <FavoriteButton recipeId={recipe.id} />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="font-headline text-xl leading-tight group-hover:text-accent-foreground">{recipe.name}</CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{recipe.cookingTime} min</span>
          </div>
          <div className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            <span>{recipe.difficulty}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{recipe.rating}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

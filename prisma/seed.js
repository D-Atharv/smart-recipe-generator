import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // ------------------------
  // Create Users
  // ------------------------
  const users = [];
  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: `User ${i}`,
        email: `user${i}@example.com`,
        password: `password${i}`,
      },
    });
    users.push(user);
  }

  // ------------------------
  // Create Ingredients
  // ------------------------
  const ingredientNames = [
    "Tomato", "Onion", "Garlic", "Salt", "Pepper",
    "Chicken", "Beef", "Carrot", "Potato", "Milk",
    "Cheese", "Butter", "Egg", "Flour", "Sugar",
    "Basil", "Oregano", "Spinach", "Mushroom", "Lemon",
    "Cucumber", "Corn", "Yogurt", "Honey", "Ginger",
    "Chili", "Cabbage", "Broccoli", "Coconut", "Apple"
  ];

  const ingredients = [];
  for (let name of ingredientNames) {
    const ing = await prisma.ingredient.create({
      data: { name, synonyms: [] },
    });
    ingredients.push(ing);
  }

  // ------------------------
  // Create Recipes
  // ------------------------
  const recipes = [];
  for (let i = 1; i <= 30; i++) {
    const ingIndices = [
      i % 30,
      (i + 1) % 30,
      (i + 2) % 30,
      (i + 3) % 30
    ];

    const recipe = await prisma.recipe.create({
      data: {
        title: `Recipe ${i}`,
        description: `This is a delicious recipe ${i}`,
        difficulty: ["easy", "medium", "hard"][i % 3],
        diet: ["vegan", "vegetarian", "none"][i % 3],
        imageUrl: `https://picsum.photos/seed/recipe${i}/400/300`,
        ingredients: {
          create: ingIndices.map((idx) => ({
            ingredient: { connect: { id: ingredients[idx].id } },
            quantity: Math.floor(Math.random() * 200) + 10,
            unit: ["grams", "ml", "piece"][Math.floor(Math.random() * 3)],
          })),
        },
      },
    });
    recipes.push(recipe);
  }

  // ------------------------
  // Create Ratings
  // ------------------------
  for (let i = 0; i < 50; i++) {
    await prisma.rating.create({
      data: {
        recipeId: recipes[i % recipes.length].id,
        userId: users[i % users.length].id,
        score: (i % 5) + 1,
        comment: `Rating comment ${i + 1}`,
      },
    });
  }

  // ------------------------
  // Create Favorites
  // ------------------------
  for (let i = 0; i < 50; i++) {
    await prisma.favorite.create({
      data: {
        recipeId: recipes[i % recipes.length].id,
        userId: users[(i + 1) % users.length].id,
      },
    });
  }

  console.log("Seed complete ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

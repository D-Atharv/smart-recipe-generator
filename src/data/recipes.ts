import { Recipe } from "@/types";
import recipeEmbeddings from "@/data/recipe_embeddings.json";

export const allRecipes: Recipe[] = [
  {
    id: 1,
    name: "Steamed Chicken Salad",
    description: "Healthy steamed chicken salad with fresh vegetables.",
    ingredients: [
      { name: "Chicken breast", quantity: 200, unit: "g" },
      { name: "Lettuce", quantity: 100, unit: "g" },
      { name: "Cucumber", quantity: 50, unit: "g" },
      { name: "Olive oil", quantity: 1, unit: "tbsp" },
      { name: "Lemon juice", quantity: 1, unit: "tbsp" },
      { name: "Salt", quantity: "to taste", unit: "" },
      { name: "Black pepper", quantity: "to taste", unit: "" },
    ],
    instructions: [
      "Steam chicken breast until cooked through.",
      "Chop lettuce and cucumber and place in a bowl.",
      "Slice the steamed chicken and add to the vegetables.",
      "Drizzle with olive oil and lemon juice.",
      "Season with salt and black pepper and toss well.",
      "Serve immediately.",
    ],
    cookingTime: 20,
    difficulty: "Easy",
    servings: 2,
    nutritionalInfo: { calories: 250, protein: 30 },
    cuisine: "International",
    dietaryTags: ["Gluten-Free"],
    rating: 4.5,
    imageId: "recipe_1",
    textForEmbedding: `
Name: Steamed Chicken Salad
Description: Healthy steamed chicken salad with fresh vegetables.
Ingredients: Chicken breast, Lettuce, Cucumber, Olive oil, Lemon juice, Salt, Black pepper
Instructions: Steam chicken breast until cooked through. Chop lettuce and cucumber and place in a bowl. Slice the steamed chicken and add to the vegetables. Drizzle with olive oil and lemon juice. Season with salt and black pepper and toss well. Serve immediately.
`,
  },
  {
    id: 2,
    name: "Spiced Mulled Apple Juice",
    description: "Warm and spiced apple juice perfect for cold evenings.",
    ingredients: [
      { name: "Apple juice", quantity: 500, unit: "ml" },
      { name: "Cinnamon stick", quantity: 1, unit: "" },
      { name: "Cloves", quantity: 3, unit: "" },
      { name: "Star anise", quantity: 1, unit: "" },
      { name: "Honey", quantity: 1, unit: "tbsp" },
    ],
    instructions: [
      "Pour apple juice into a saucepan.",
      "Add cinnamon, cloves, and star anise.",
      "Heat gently until warm but not boiling.",
      "Stir in honey and mix well.",
      "Serve warm in mugs.",
    ],
    cookingTime: 10,
    difficulty: "Easy",
    servings: 2,
    nutritionalInfo: { calories: 120, protein: 0 },
    cuisine: "International",
    dietaryTags: ["Vegan", "Gluten-Free"],
    rating: 4.2,
    imageId: "recipe_2",
    textForEmbedding: `
Name: Spiced Mulled Apple Juice
Description: Warm and spiced apple juice perfect for cold evenings.
Ingredients: Apple juice, Cinnamon stick, Cloves, Star anise, Honey
Instructions: Pour apple juice into a saucepan. Add cinnamon, cloves, and star anise. Heat gently until warm but not boiling. Stir in honey and mix well. Serve warm in mugs.
`,
  },
  {
    id: 3,
    name: "Refreshing Basil Tea",
    description: "A soothing herbal tea made with fresh basil leaves.",
    ingredients: [
      { name: "Fresh basil leaves", quantity: 10, unit: "leaves" },
      { name: "Water", quantity: 250, unit: "ml" },
      { name: "Honey", quantity: 1, unit: "tsp" },
      { name: "Lemon slice", quantity: 1, unit: "" },
    ],
    instructions: [
      "Boil water and pour into a teapot.",
      "Add fresh basil leaves and steep for 5 minutes.",
      "Strain into a cup.",
      "Add honey and lemon slice for flavor.",
      "Serve hot.",
    ],
    cookingTime: 10,
    difficulty: "Easy",
    servings: 1,
    nutritionalInfo: { calories: 20, protein: 0 },
    cuisine: "International",
    dietaryTags: ["Vegan", "Gluten-Free"],
    rating: 4.0,
    imageId: "recipe_3",
    textForEmbedding: `
Name: Refreshing Basil Tea
Description: A soothing herbal tea made with fresh basil leaves.
Ingredients: Fresh basil leaves, Water, Honey, Lemon slice
Instructions: Boil water and pour into a teapot. Add fresh basil leaves and steep for 5 minutes. Strain into a cup. Add honey and lemon slice for flavor. Serve hot.
`,
  },
  {
    id: 4,
    name: "Creamy Cinnamon Peach Milkshake",
    description: "Delicious and creamy milkshake with peach and cinnamon.",
    ingredients: [
      { name: "Peach", quantity: 2, unit: "" },
      { name: "Milk", quantity: 200, unit: "ml" },
      { name: "Vanilla ice cream", quantity: 2, unit: "scoops" },
      { name: "Cinnamon powder", quantity: 0.5, unit: "tsp" },
      { name: "Honey", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      "Peel and slice the peaches.",
      "Add peaches, milk, ice cream, cinnamon, and honey to a blender.",
      "Blend until smooth and creamy.",
      "Pour into a glass and sprinkle a pinch of cinnamon on top.",
      "Serve chilled.",
    ],
    cookingTime: 10,
    difficulty: "Easy",
    servings: 2,
    nutritionalInfo: { calories: 300, protein: 6 },
    cuisine: "International",
    dietaryTags: ["Vegetarian"],
    rating: 4.6,
    imageId: "recipe_4",
    textForEmbedding: `
Name: Creamy Cinnamon Peach Milkshake
Description: Delicious and creamy milkshake with peach and cinnamon.
Ingredients: Peach, Milk, Vanilla ice cream, Cinnamon powder, Honey
Instructions: Peel and slice the peaches. Add peaches, milk, ice cream, cinnamon, and honey to a blender. Blend until smooth and creamy. Pour into a glass and sprinkle a pinch of cinnamon on top. Serve chilled.
`,
  },
  {
    id: 5,
    name: "Sparkling Strawberry Mocktail",
    description: "Refreshing non-alcoholic strawberry drink with fizz.",
    ingredients: [
      { name: "Strawberries", quantity: 6, unit: "" },
      { name: "Lemon juice", quantity: 1, unit: "tbsp" },
      { name: "Sparkling water", quantity: 200, unit: "ml" },
      { name: "Mint leaves", quantity: 3, unit: "leaves" },
      { name: "Sugar", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      "Muddle strawberries with sugar and lemon juice.",
      "Add sparkling water and mix gently.",
      "Garnish with mint leaves.",
      "Serve chilled in glasses.",
    ],
    cookingTime: 5,
    difficulty: "Easy",
    servings: 1,
    nutritionalInfo: { calories: 50, protein: 0 },
    cuisine: "International",
    dietaryTags: ["Vegan", "Gluten-Free"],
    rating: 4.3,
    imageId: "recipe_5",
    textForEmbedding: `
Name: Sparkling Strawberry Mocktail
Description: Refreshing non-alcoholic strawberry drink with fizz.
Ingredients: Strawberries, Lemon juice, Sparkling water, Mint leaves, Sugar
Instructions: Muddle strawberries with sugar and lemon juice. Add sparkling water and mix gently. Garnish with mint leaves. Serve chilled in glasses.
`,
  },
  {
    id: 6,
    name: "Eggless Tiramisu Dessert",
    description: "Soft and creamy eggless tiramisu dessert with coffee flavor.",
    ingredients: [
      { name: "Mascarpone cheese", quantity: 250, unit: "g" },
      { name: "Coffee", quantity: 100, unit: "ml" },
      { name: "Ladyfinger biscuits", quantity: 12, unit: "" },
      { name: "Cocoa powder", quantity: 1, unit: "tbsp" },
      { name: "Sugar", quantity: 50, unit: "g" },
    ],
    instructions: [
      "Dip ladyfinger biscuits in coffee and layer in a dish.",
      "Mix mascarpone cheese with sugar until smooth.",
      "Layer the cream mixture over the biscuits.",
      "Repeat layers and dust with cocoa powder.",
      "Chill for 2 hours before serving.",
    ],
    cookingTime: 15,
    difficulty: "Medium",
    servings: 4,
    nutritionalInfo: { calories: 400, protein: 7 },
    cuisine: "Italian",
    dietaryTags: ["Vegetarian"],
    rating: 4.7,
    imageId: "recipe_6",
    textForEmbedding: `
Name: Eggless Tiramisu Dessert
Description: Soft and creamy eggless tiramisu dessert with coffee flavor.
Ingredients: Mascarpone cheese, Coffee, Ladyfinger biscuits, Cocoa powder, Sugar
Instructions: Dip ladyfinger biscuits in coffee and layer in a dish. Mix mascarpone cheese with sugar until smooth. Layer the cream mixture over the biscuits. Repeat layers and dust with cocoa powder. Chill for 2 hours before serving.
`,
  },
  {
    id: 7,
    name: "Buckwheat & Oat Waffles with Banana",
    description: "Healthy buckwheat and oat waffles served with bananas.",
    ingredients: [
      { name: "Buckwheat flour", quantity: 100, unit: "g" },
      { name: "Oat flour", quantity: 50, unit: "g" },
      { name: "Milk", quantity: 200, unit: "ml" },
      { name: "Banana", quantity: 1, unit: "" },
      { name: "Baking powder", quantity: 1, unit: "tsp" },
      { name: "Honey", quantity: 1, unit: "tbsp" },
    ],
    instructions: [
      "Mix buckwheat and oat flours with baking powder.",
      "Add milk and honey and whisk until smooth.",
      "Pour batter into a preheated waffle iron.",
      "Cook until golden brown.",
      "Serve with sliced banana on top.",
    ],
    cookingTime: 15,
    difficulty: "Medium",
    servings: 2,
    nutritionalInfo: { calories: 350, protein: 8 },
    cuisine: "International",
    dietaryTags: ["Vegetarian"],
    rating: 4.4,
    imageId: "recipe_7",
    textForEmbedding: `
Name: Buckwheat & Oat Waffles with Banana
Description: Healthy buckwheat and oat waffles served with bananas.
Ingredients: Buckwheat flour, Oat flour, Milk, Banana, Baking powder, Honey
Instructions: Mix buckwheat and oat flours with baking powder. Add milk and honey and whisk until smooth. Pour batter into a preheated waffle iron. Cook until golden brown. Serve with sliced banana on top.
`,
  },
  {
    id: 8,
    name: "No-Bake Lemon Bars",
    description:
      "Tangy and sweet lemon bars with a buttery crust, no baking needed.",
    ingredients: [
      { name: "Digestive biscuits", quantity: 100, unit: "g" },
      { name: "Butter", quantity: 50, unit: "g" },
      { name: "Lemon juice", quantity: 50, unit: "ml" },
      { name: "Condensed milk", quantity: 100, unit: "g" },
      { name: "Lemon zest", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      "Crush biscuits and mix with melted butter to form crust.",
      "Press crust into a tray and chill for 10 minutes.",
      "Mix condensed milk, lemon juice, and zest.",
      "Pour lemon mixture over crust and chill for 1 hour.",
      "Cut into bars and serve.",
    ],
    cookingTime: 15,
    difficulty: "Easy",
    servings: 4,
    nutritionalInfo: { calories: 250, protein: 3 },
    cuisine: "International",
    dietaryTags: ["Vegetarian"],
    rating: 4.5,
    imageId: "recipe_8",
    textForEmbedding: `
Name: No-Bake Lemon Bars
Description: Tangy and sweet lemon bars with a buttery crust, no baking needed.
Ingredients: Digestive biscuits, Butter, Lemon juice, Condensed milk, Lemon zest
Instructions: Crush biscuits and mix with melted butter to form crust. Press crust into a tray and chill for 10 minutes. Mix condensed milk, lemon juice, and zest. Pour lemon mixture over crust and chill for 1 hour. Cut into bars and serve.
`,
  },
  {
    id: 9,
    name: "Italian Classic Tiramisu",
    description:
      "Traditional Italian tiramisu with espresso-soaked ladyfingers.",
    ingredients: [
      { name: "Mascarpone cheese", quantity: 250, unit: "g" },
      { name: "Espresso", quantity: 100, unit: "ml" },
      { name: "Ladyfinger biscuits", quantity: 12, unit: "" },
      { name: "Cocoa powder", quantity: 1, unit: "tbsp" },
      { name: "Sugar", quantity: 50, unit: "g" },
      { name: "Egg yolks", quantity: 2, unit: "" },
    ],
    instructions: [
      "Whisk egg yolks with sugar until fluffy.",
      "Add mascarpone cheese and mix until smooth.",
      "Dip ladyfingers in espresso and layer in a dish.",
      "Spread cream mixture over biscuits.",
      "Repeat layers and dust with cocoa powder.",
      "Chill for 2 hours before serving.",
    ],
    cookingTime: 20,
    difficulty: "Medium",
    servings: 4,
    nutritionalInfo: { calories: 450, protein: 8 },
    cuisine: "Italian",
    dietaryTags: ["Vegetarian"],
    rating: 4.8,
    imageId: "recipe_9",
    textForEmbedding: `
Name: Italian Classic Tiramisu
Description: Traditional Italian tiramisu with espresso-soaked ladyfingers.
Ingredients: Mascarpone cheese, Espresso, Ladyfinger biscuits, Cocoa powder, Sugar, Egg yolks
Instructions: Whisk egg yolks with sugar until fluffy. Add mascarpone cheese and mix until smooth. Dip ladyfingers in espresso and layer in a dish. Spread cream mixture over biscuits. Repeat layers and dust with cocoa powder. Chill for 2 hours before serving.
`,
  },
  {
    id: 10,
    name: "No-Churn Strawberry Ice Cream",
    description:
      "Simple and creamy strawberry ice cream, no ice cream maker needed.",
    ingredients: [
      { name: "Strawberries", quantity: 200, unit: "g" },
      { name: "Whipping cream", quantity: 200, unit: "ml" },
      { name: "Condensed milk", quantity: 100, unit: "g" },
      { name: "Vanilla extract", quantity: 1, unit: "tsp" },
    ],
    instructions: [
      "Blend strawberries until smooth.",
      "Whip cream until soft peaks form.",
      "Fold condensed milk and vanilla into whipped cream.",
      "Gently mix in strawberry puree.",
      "Pour mixture into a container and freeze for 4-6 hours.",
      "Serve chilled.",
    ],
    cookingTime: 15,
    difficulty: "Easy",
    servings: 4,
    nutritionalInfo: { calories: 300, protein: 4 },
    cuisine: "International",
    dietaryTags: ["Vegetarian"],
    rating: 4.6,
    imageId: "recipe_10",
    textForEmbedding: `
Name: No-Churn Strawberry Ice Cream
Description: Simple and creamy strawberry ice cream, no ice cream maker needed.
Ingredients: Strawberries, Whipping cream, Condensed milk, Vanilla extract
Instructions: Blend strawberries until smooth. Whip cream until soft peaks form. Fold condensed milk and vanilla into whipped cream. Gently mix in strawberry puree. Pour mixture into a container and freeze for 4-6 hours. Serve chilled.
`,
  },
];

// export const getRecipeById = (id: number): Recipe | undefined => {
//   return allRecipes.find((recipe) => recipe.id === id);
// };

export const getRecipeById = (
  id: number
): (Recipe & { embedding?: number[] }) | undefined => {
  const recipe = allRecipes.find((recipe) => recipe.id === id);
  if (!recipe) return undefined;

  // Get embedding from JSON using the recipe ID
  const embedding = (recipeEmbeddings as any)[`recipe_${id}`];

  return { ...recipe, embedding };
};

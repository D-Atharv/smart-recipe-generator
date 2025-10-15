import json
from google import genai

client = genai.Client(api_key="APIKEY")


# List of texts to generate embeddings for
texts_for_embedding = [
    """
    Name: Steamed Chicken Salad
    Description: Healthy steamed chicken salad with fresh vegetables.
    Ingredients: Chicken breast, Lettuce, Cucumber, Olive oil, Lemon juice, Salt, Black pepper
    Instructions: Steam chicken breast until cooked through. Chop lettuce and cucumber and place in a bowl. Slice the steamed chicken and add to the vegetables. Drizzle with olive oil and lemon juice. Season with salt and black pepper and toss well. Serve immediately.
    """,
    """..."""
]

# Generate embeddings
response = client.models.embed_content(
    model="gemini-embedding-001",
    contents=texts_for_embedding,
)

for i, item in enumerate(response.embeddings):
    vector = item.values  # This is the list of floats (the actual embedding)
    print(f"Embedding for text {i+1}:")
    print(vector)  # prints the full embedding values
    print(f"Length = {len(vector)}\n")


# Create key-value dictionary (key = recipe index or id, value = embedding vector)
embeddings_dict = {
    f"recipe_{i+1}": item.values  # .value contains the actual embedding list
    for i, item in enumerate(response.embeddings)
}

# Save embeddings to JSON
with open("recipe_embeddings.json", "w") as f:
    json.dump(embeddings_dict, f)

print("Embeddings saved to recipe_embeddings.json")
// /ai/embeddings.ts
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";

const ai = genkit({
  plugins: [googleAI()],
});

/** Convert user input into Gemini embeddings */
export async function getTextEmbedding(text: string): Promise<number[]> {
  const response = await ai.embed({
    embedder: googleAI.embedder("text-embedding-004"),
    content: text,
  });

  // The embedding vector returned by Gemini
  return response[0]?.embedding ?? [];
}

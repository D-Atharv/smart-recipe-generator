// app/api/embedding/route.ts
import { NextResponse } from "next/server";
import { getTextEmbedding } from "@/ai/flows/embeddings";

export async function POST(req: Request) {
  const { text } = await req.json();
  const embedding = await getTextEmbedding(text);
  return NextResponse.json({ embedding });
}

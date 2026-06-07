import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(req:Request) {
  try {
    const { prompt } = await req.json();
    const { text } = await generateText({
      model: groq("llama-3.1-8b-instant"),
     prompt
    });

    return Response.json({ text });
  } catch (error) {
    console.error(error);
    return Response.json(
      { error: "API request failed", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}



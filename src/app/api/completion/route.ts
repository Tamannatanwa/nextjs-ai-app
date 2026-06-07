import { generateText } from "ai";
import { google } from "@ai-sdk/google";

export async function POST() {
  try {
    const { text } = await generateText({
    model: google("gemini-2.0-flash"),
      prompt: "Explain what an LLM is in simple terms.",
    });

    return Response.json({ text });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        error: "Gemini API request failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
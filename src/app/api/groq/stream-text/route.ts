import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await streamText({
    model: groq("meta-llama/llama-4-scout-17b-16e-instruct"),
    system: "You are a helpful assistant.",
    messages,
  });

  return response.toDataStreamResponse();
}

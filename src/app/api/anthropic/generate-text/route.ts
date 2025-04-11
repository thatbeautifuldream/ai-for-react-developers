import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await generateText({
    model: anthropic("claude-3-sonnet-20240229"),
    system: "You're a helpful assistant.",
    messages,
  });

  return Response.json(response);
}

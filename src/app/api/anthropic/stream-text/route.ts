import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await streamText({
    model: anthropic("claude-3-sonnet-20240229"),
    system: "You are a helpful assistant.",
    messages,
  });

  return response.toDataStreamResponse();
}

import { xai } from "@ai-sdk/xai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await streamText({
    model: xai("grok-2-1212"),
    system: "You are a helpful assistant.",
    messages,
  });

  return response.toDataStreamResponse();
}

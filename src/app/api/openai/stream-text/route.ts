import { openai } from "@ai-sdk/openai";
import { generateText, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();

  const response = await streamText({
    model: openai("gpt-4o-mini"),
    system: "You are a helpful assistant.",
    messages,
  });

  return response.toDataStreamResponse();
}

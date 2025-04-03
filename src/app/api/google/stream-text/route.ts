import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await streamText({
    model: google("gemini-2.0-flash-exp", { useSearchGrounding: true }),
    messages,
  });

  return response.toDataStreamResponse();
}

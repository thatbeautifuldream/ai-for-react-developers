import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await generateText({
    model: google("gemini-2.0-flash-exp", { useSearchGrounding: true }),
    messages,
  });

  return Response.json(response);
}

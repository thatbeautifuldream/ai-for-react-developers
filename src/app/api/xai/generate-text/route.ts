import { xai } from "@ai-sdk/xai";
import { generateText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await generateText({
    model: xai("grok-2-1212"),
    system: "You're a helpful assistant.",
    messages,
  });

  return Response.json(response);
}

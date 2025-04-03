import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();

  const response = await generateText({
    model: openai("gpt-4o-mini"),
    system: "You're a helpful assistant.",
    messages,
  });

  return Response.json(response);
}
	
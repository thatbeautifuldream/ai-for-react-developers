import { openai } from "@ai-sdk/openai";
import { generateText, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();

  // const response = await streamText({
  //   model: openai("gpt-4o-mini"),
  //   system:
  //     "You are a helpful assistant that provides information about my best projects and experiences.",
  //   messages,
  // });

  // return response.toDataStreamResponse();

  const response = await generateText({
    model: openai("gpt-4o-mini"),
    system:
      "You are a helpful assistant that provides information about my best projects and experiences.",
    messages,
  });

  return new Response(response.text);
}

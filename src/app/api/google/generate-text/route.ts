import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request, res: Response) {
  const { messages } = await req.json();

  const response = await generateText({
    model: google("gemini-2.0-flash-exp", { useSearchGrounding: true }),
    messages,
  });

  console.log({ response });

  return Response.json(response);
}

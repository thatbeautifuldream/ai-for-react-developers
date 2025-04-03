import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await generateText({
    model: google("gemini-2.0-flash-exp"),
    providerOptions: {
      google: { responseModalities: ["TEXT", "IMAGE"] },
    },
    messages,
  });

  return Response.json(result);
}

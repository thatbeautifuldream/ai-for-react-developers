import { openai } from "@ai-sdk/openai";
import { experimental_generateImage as generateImage } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const { image } = await generateImage({
    model: openai.image("dall-e-3"),
    prompt: prompt,
    size: "1024x1024",
  });

  return Response.json(image);
}

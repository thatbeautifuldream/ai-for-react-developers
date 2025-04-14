import { experimental_generateSpeech as generateSpeech } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { text, voice = "nova" } = await req.json();

  const result = await generateSpeech({
    model: openai.speech("tts-1"),
    text: text,
    voice: voice,
  });

  console.log(result);

  return new Response(result.audio.uint8Array, {
    headers: {
      "Content-Type": "audio/mpeg",
    },
  });
}

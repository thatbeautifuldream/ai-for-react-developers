import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export const maxDuration = 30;

const ENHANCE_PROMPT_SYSTEM_PROMPT = `You are an expert prompt engineer specialized in optimizing prompts for AI models. Your task is to enhance the user's prompt without changing its core intent or adding unrelated information.
Key responsibilities:
- Improve clarity and structure
- Add relevant context or constraints if missing
- Remove redundancies and ambiguities
- Break complex requests into logical steps
- Ensure appropriate tone and specificity
- Preserve all requirements and constraints from the original prompt
Return only the enhanced prompt without explanations, disclaimers, or meta-commentary. Make improvements that would genuinely help an AI model produce better results.`;

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const response = await generateText({
    model: google("gemini-2.0-flash-lite-preview-02-05"),
    system: ENHANCE_PROMPT_SYSTEM_PROMPT,
    prompt,
  });

  return Response.json(response);
}

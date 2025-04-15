import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { projectSchema } from "./schema";

export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: openai("gpt-4.1-nano"),
    schema: projectSchema,
    system: `
    You are a JSON generator that ONLY outputs valid JSON according to the provided schema.
    DO NOT include any explanatory text, comments, markdown code blocks, or non-JSON content.
    DO NOT wrap the JSON in any formatting (no \`\`\` or other markers).
    ONLY return the raw JSON object - absolutely nothing else.
    Any deviation from this format will result in an error.
    Your entire response must be parseable as valid JSON.
    Your task is to generate side projects that bring value and learning for developers.
    By default generate 5 projects, unless the user specifies otherwise.
    `,
    prompt: `Generate projects in this context:` + context,
  });

  return result.toTextStreamResponse();
}

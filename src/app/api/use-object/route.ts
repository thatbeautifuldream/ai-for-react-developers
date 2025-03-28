import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { projectSchema } from "./schema";

export const maxDuration = 30;

export async function POST(req: Request) {
  const context = await req.json();

  const result = streamObject({
    model: openai("gpt-4o-mini"),
    schema: projectSchema,
    system: `
    You are a helpful assistant that generates side projects.
    Focus on bringing value and learning for the developer.
    By default you should be able to generate 5 projects, unless the user specifies otherwise.
    `,
    prompt: `Generate projects in this context:` + context,
  });

  return result.toTextStreamResponse();
}

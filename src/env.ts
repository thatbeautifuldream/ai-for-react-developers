import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    OPEN_AI_API_KEY: z.string().min(1),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
    GROQ_API_KEY: z.string().min(1),
    ANTHROPIC_API_KEY: z.string().min(1),
    XAI_API_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: {
    OPEN_AI_API_KEY: process.env.OPEN_AI_API_KEY,
    GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
    XAI_API_KEY: process.env.XAI_API_KEY,
  },
});

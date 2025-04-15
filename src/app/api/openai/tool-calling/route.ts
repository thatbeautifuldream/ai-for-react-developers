import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await streamText({
    model: openai("gpt-4.1-nano"),
    system: `You are a helpful AI assistant that can search the web for real-time information.
When asked questions, use the web_search_preview tool to find relevant and up-to-date information.
Always cite your sources when providing information from web searches.
Keep your responses concise and focused on the user's query.`,
    tools: {
      web_search_preview: openai.tools.webSearchPreview({
        searchContextSize: "medium",
        userLocation: {
          type: "approximate",
          country: "IN",
          region: "Karnataka",
          city: "Bangalore",
        },
      }),
    },
    messages,
  });

  return response.toDataStreamResponse();
}

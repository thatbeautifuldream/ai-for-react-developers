import { create } from "zustand";

export type Provider = "openai" | "google" | "groq";
export type ApiType =
  | "generate-text"
  | "stream-text"
  | "stream-object"
  | "tool-calling"
  | "generate-image";

export type Model = {
  id: string;
  name: string;
  provider: Provider;
};

export type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
  id: string;
};

export type Example = {
  id: string;
  name: string;
  provider: Provider;
  apiType: ApiType;
  endpoint: string;
  description: string;
  supportsModels: string[];
};

type ChatState = {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  error: Error | null;
  selectedProvider: Provider;
  selectedApiType: ApiType | null;
  selectedModel: string | null;
  availableModels: Model[];
  examples: Example[];

  // Actions
  setInput: (input: string) => void;
  addMessage: (message: Omit<ChatMessage, "id">) => void;
  clearMessages: () => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setSelectedProvider: (provider: Provider) => void;
  setSelectedApiType: (apiType: ApiType | null) => void;
  setSelectedModel: (modelId: string | null) => void;
  generateResponse: (input: string) => Promise<void>;
};

const EXAMPLES: Example[] = [
  {
    id: "openai-generate-text",
    name: "OpenAI Text Generation",
    provider: "openai",
    apiType: "generate-text",
    endpoint: "/api/openai/generate-text",
    description: "Generate text using OpenAI models",
    supportsModels: ["gpt-3.5-turbo", "gpt-4", "gpt-4-turbo"],
  },
  {
    id: "openai-stream-text",
    name: "OpenAI Text Streaming",
    provider: "openai",
    apiType: "stream-text",
    endpoint: "/api/openai/stream-text",
    description: "Stream text generation using OpenAI models",
    supportsModels: ["gpt-3.5-turbo", "gpt-4", "gpt-4-turbo"],
  },
  {
    id: "openai-stream-object",
    name: "OpenAI Object Streaming",
    provider: "openai",
    apiType: "stream-object",
    endpoint: "/api/openai/stream-object",
    description: "Stream structured data using OpenAI models",
    supportsModels: ["gpt-3.5-turbo", "gpt-4", "gpt-4-turbo"],
  },
  {
    id: "openai-tool-calling",
    name: "OpenAI Tool Calling",
    provider: "openai",
    apiType: "tool-calling",
    endpoint: "/api/openai/tool-calling",
    description: "Use OpenAI function calling capabilities",
    supportsModels: ["gpt-3.5-turbo", "gpt-4", "gpt-4-turbo"],
  },
  {
    id: "google-generate-text",
    name: "Google Text Generation",
    provider: "google",
    apiType: "generate-text",
    endpoint: "/api/google/generate-text",
    description: "Generate text using Google AI models",
    supportsModels: ["gemini-pro", "gemini-1.5-pro"],
  },
  {
    id: "google-stream-text",
    name: "Google Text Streaming",
    provider: "google",
    apiType: "stream-text",
    endpoint: "/api/google/stream-text",
    description: "Stream text generation using Google AI models",
    supportsModels: ["gemini-pro", "gemini-1.5-pro"],
  },
  {
    id: "google-stream-object",
    name: "Google Object Streaming",
    provider: "google",
    apiType: "stream-object",
    endpoint: "/api/google/stream-object",
    description: "Stream structured data using Google AI models",
    supportsModels: ["gemini-pro", "gemini-1.5-pro"],
  },
  {
    id: "google-generate-image",
    name: "Google Image Generation",
    provider: "google",
    apiType: "generate-image",
    endpoint: "/api/google/generate-image",
    description: "Generate images using Google AI models",
    supportsModels: ["gemini-pro-vision"],
  },
  {
    id: "groq-generate-text",
    name: "Groq Text Generation",
    provider: "groq",
    apiType: "generate-text",
    endpoint: "/api/groq/generate-text",
    description: "Generate text using Groq models",
    supportsModels: ["llama2-70b", "mixtral-8x7b"],
  },
  {
    id: "groq-stream-text",
    name: "Groq Text Streaming",
    provider: "groq",
    apiType: "stream-text",
    endpoint: "/api/groq/stream-text",
    description: "Stream text generation using Groq models",
    supportsModels: ["llama2-70b", "mixtral-8x7b"],
  },
  {
    id: "groq-stream-object",
    name: "Groq Object Streaming",
    provider: "groq",
    apiType: "stream-object",
    endpoint: "/api/groq/stream-object",
    description: "Stream structured data using Groq models",
    supportsModels: ["llama2-70b", "mixtral-8x7b"],
  },
];

const MODELS: Model[] = [
  { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo", provider: "openai" },
  { id: "gpt-4", name: "GPT-4", provider: "openai" },
  { id: "gpt-4-turbo", name: "GPT-4 Turbo", provider: "openai" },
  { id: "gemini-pro", name: "Gemini Pro", provider: "google" },
  { id: "gemini-1.5-pro", name: "Gemini 1.5 Pro", provider: "google" },
  { id: "gemini-pro-vision", name: "Gemini Pro Vision", provider: "google" },
  { id: "llama2-70b", name: "Llama2 70B", provider: "groq" },
  { id: "mixtral-8x7b", name: "Mixtral 8x7B", provider: "groq" },
];

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  input: "",
  isLoading: false,
  error: null,
  selectedProvider: "openai",
  selectedApiType: "generate-text",
  selectedModel: "gpt-3.5-turbo",
  availableModels: MODELS,
  examples: EXAMPLES,

  setInput: (input) => set({ input }),

  addMessage: (message) =>
    set((state) => ({
      messages: [...state.messages, { ...message, id: crypto.randomUUID() }],
    })),

  clearMessages: () => set({ messages: [] }),

  setIsLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  setSelectedProvider: (provider) => {
    const state = get();
    const validApiTypes = state.examples
      .filter((example) => example.provider === provider)
      .map((example) => example.apiType);

    const defaultApiType = validApiTypes.includes("generate-text")
      ? "generate-text"
      : validApiTypes[0] || null;

    const validModels = state.availableModels
      .filter((model) => model.provider === provider)
      .map((model) => model.id);

    set({
      selectedProvider: provider,
      selectedApiType: defaultApiType,
      selectedModel: validModels[0] || null,
    });
  },

  setSelectedApiType: (apiType) => {
    set({ selectedApiType: apiType });

    // Update the selected model if needed
    const state = get();
    const currentExample = state.examples.find(
      (e) => e.provider === state.selectedProvider && e.apiType === apiType
    );

    if (currentExample) {
      const currentModelSupported = currentExample.supportsModels.includes(
        state.selectedModel || ""
      );
      if (!currentModelSupported && currentExample.supportsModels.length > 0) {
        set({ selectedModel: currentExample.supportsModels[0] });
      }
    }
  },

  setSelectedModel: (modelId) => set({ selectedModel: modelId }),

  generateResponse: async (input) => {
    const state = get();
    const { selectedProvider, selectedApiType, selectedModel, messages } =
      state;

    if (!selectedApiType || !selectedModel) {
      set({ error: new Error("Please select an API type and model") });
      return;
    }

    const currentExample = state.examples.find(
      (e) => e.provider === selectedProvider && e.apiType === selectedApiType
    );

    if (!currentExample) {
      set({ error: new Error("Selected API configuration is not available") });
      return;
    }

    try {
      set({ isLoading: true, error: null });

      // Add user message
      const userMessage = { role: "user" as const, content: input };
      set((state) => ({
        messages: [
          ...state.messages,
          { ...userMessage, id: crypto.randomUUID() },
        ],
      }));

      const response = await fetch(currentExample.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          model: selectedModel,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Add assistant message
      set((state) => ({
        messages: [
          ...state.messages,
          {
            role: "assistant",
            content: data.text || data.content || JSON.stringify(data),
            id: crypto.randomUUID(),
          },
        ],
      }));
    } catch (err) {
      set({
        error:
          err instanceof Error ? err : new Error("Failed to generate response"),
      });
      console.error("Error generating response:", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));

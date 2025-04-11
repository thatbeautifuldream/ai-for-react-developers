import { create } from "zustand";

export const LLM_PROVIDERS = [
  "openai",
  "google",
  "groq",
  "anthropic",
  "xai",
] as const;

export type TLLMProvider = (typeof LLM_PROVIDERS)[number];

interface AIState {
  selectedProvider: TLLMProvider;
  setSelectedProvider: (provider: TLLMProvider) => void;
}

export const useAIStore = create<AIState>((set) => ({
  selectedProvider: "google",
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
}));

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
  enabledProviders: Record<TLLMProvider, boolean>;
  setSelectedProvider: (provider: TLLMProvider) => void;
  onlyEnableProviders: (providers: TLLMProvider[]) => void;
}

export const useAIStore = create<AIState>((set) => ({
  selectedProvider: "google",
  enabledProviders: {
    openai: true,
    google: true,
    groq: true,
    anthropic: true,
    xai: true,
  },
  setSelectedProvider: (provider) => set({ selectedProvider: provider }),
  onlyEnableProviders: (providers: TLLMProvider[]) =>
    set((state) => ({
      enabledProviders: Object.fromEntries(
        LLM_PROVIDERS.map((p) => [p, providers.includes(p)])
      ) as Record<TLLMProvider, boolean>,
    })),
}));

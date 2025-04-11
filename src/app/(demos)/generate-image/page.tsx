"use client";

import { ChatImage } from "@/components/chat/chat-image";
import { ChatMessageInput } from "@/components/chat/chat-message-input";
import { ChatMessageList } from "@/components/chat/chat-message-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAIStore } from "@/store/ai-store";
import { useState } from "react";

type TImageGeneration = {
  id: string;
  prompt: string;
  image: { base64Data: string; mimeType: string } | null;
  error: Error | null;
  isLoading: boolean;
};

export default function Page() {
  const [prompt, setPrompt] = useState("");
  const [generations, setGenerations] = useState<TImageGeneration[]>([]);

  async function generateImage(prompt: string) {
    const generationId = crypto.randomUUID();
    setGenerations(prev => [...prev, {
      id: generationId,
      prompt,
      image: null,
      error: null,
      isLoading: true
    }]);

    try {
      const response = await fetch(`/api/openai/generate-image`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setGenerations(prev => prev.map(gen =>
        gen.id === generationId
          ? { ...gen, image: { base64Data: data.base64Data, mimeType: data.mimeType }, isLoading: false }
          : gen
      ));
    } catch (err) {
      setGenerations(prev => prev.map(gen =>
        gen.id === generationId
          ? { ...gen, error: err instanceof Error ? err : new Error("Failed to generate response"), isLoading: false }
          : gen
      ));
      console.error("Error generating image:", err);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (prompt.trim()) {
      generateImage(prompt.trim());
      setPrompt("");
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPrompt(e.target.value);
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      <div className="flex-1 flex flex-col h-full relative">
        <ScrollArea className="flex-1 p-4 h-[calc(100vh-100px)]">
          <div className="space-y-4">
            {generations.map((generation) => (
              <ChatImage
                key={generation.id}
                prompt={generation.prompt}
                image={generation.image}
                error={generation.error}
                isLoading={generation.isLoading}
              />
            ))}
          </div>
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary to-transparent pointer-events-none" />
        <div className="sticky bottom-0 p-4 bg-background">
          <ChatMessageInput
            isLoading={generations.some(gen => gen.isLoading)}
            onStop={() => { }}
            value={prompt}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

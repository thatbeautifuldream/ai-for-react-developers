"use client";

import { ChatMessageInput } from "@/components/chat/chat-message-input";
import { ChatMessageList } from "@/components/chat/chat-message-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

type TMessage = {
  role: "user" | "assistant";
  content: string;
  id: string;
};

export default function Page() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function generateText(input: string) {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/generate-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: input }],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: data.text,
          id: crypto.randomUUID(),
        },
      ]);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to generate response")
      );
      console.error("Error generating text:", err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = {
        role: "user" as const,
        content: input.trim(),
        id: crypto.randomUUID(),
      };
      setMessages((currentMessages) => [...currentMessages, userMessage]);
      generateText(input.trim());
      setInput("");
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      <div className="flex-1 flex flex-col h-full relative">
        <ScrollArea className="flex-1 p-4 h-[calc(100vh-100px)]">
          <ChatMessageList messages={messages} error={error} />
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary to-transparent pointer-events-none" />
        <div className="sticky bottom-0 p-4 bg-background">
          <ChatMessageInput
            isLoading={isLoading}
            onStop={() => {}}
            value={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

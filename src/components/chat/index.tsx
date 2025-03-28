"use client";

import { useChat } from "@ai-sdk/react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessageList } from "./chat-message-list";
import { ChatMessageInput } from "./chat-message-input";

type TChatProps = {
  api?: string;
};

export function Chat({ api }: TChatProps) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({ api });

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto">
      <div className="flex-1 flex flex-col h-full relative">
        <ScrollArea className="flex-1 p-4 h-[calc(100vh-100px)]">
          <ChatMessageList messages={messages} />
        </ScrollArea>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary to-transparent pointer-events-none" />
        <div className="sticky bottom-0 p-4 bg-background">
          <ChatMessageInput
            disabled={isLoading}
            value={input}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
}

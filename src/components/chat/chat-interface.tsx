import { ChatMessageInput } from "./chat-message-input";
import { ChatMessageList } from "./chat-message-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ModelSelectionGroup } from "@/components/model-selector";
import { useChatStore } from "@/store/chat-store";
import { FormEvent } from "react";

export function ChatInterface() {
    const {
        input,
        setInput,
        messages,
        isLoading,
        error,
        generateResponse
    } = useChatStore();

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (input.trim()) {
            generateResponse(input.trim());
            setInput("");
        }
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);
    }

    return (
        <div className="flex flex-col h-screen max-w-2xl mx-auto">
            <div className="p-4">
                <ModelSelectionGroup />
            </div>
            <div className="flex-1 flex flex-col h-full relative">
                <ScrollArea className="flex-1 p-4 h-[calc(100vh-180px)]">
                    <ChatMessageList messages={messages} error={error} />
                </ScrollArea>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary to-transparent pointer-events-none" />
                <div className="sticky bottom-0 p-4 bg-background">
                    <ChatMessageInput
                        isLoading={isLoading}
                        onStop={() => { }}
                        value={input}
                        onChange={handleInputChange}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
} 
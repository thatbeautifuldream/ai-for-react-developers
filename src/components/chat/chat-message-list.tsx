import { Message } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatMessage } from "./chat-message";

type TChatMessageListProps = {
  messages: Message[];
  error?: Error | null;
};

export function ChatMessageList({ messages, error }: TChatMessageListProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {error && (
          <div className="mb-4">
            An error occurred while generating response. Please try again.
          </div>
        )}
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChatMessage message={message} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

import { Message } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatMessage } from "./chat-message";

type TChatMessageListProps = {
  messages: Message[];
};

export function ChatMessageList({ messages }: TChatMessageListProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence>
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

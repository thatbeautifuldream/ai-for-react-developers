import { AnimatePresence, motion } from "framer-motion";
import { ChatMessage } from "./chat-message";
import { ChatMessage as ChatMessageType } from "@/store/chat-store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

type TChatMessageListProps = {
  messages: ChatMessageType[];
  error?: Error | null;
};

export function ChatMessageList({ messages, error }: TChatMessageListProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error.message || "An error occurred while generating response. Please try again."}
              </AlertDescription>
            </Alert>
          </motion.div>
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

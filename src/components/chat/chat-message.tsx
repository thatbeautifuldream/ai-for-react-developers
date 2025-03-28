import { Message } from "@ai-sdk/react";
import { Avatar } from "@/components/ui/avatar";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

type TChatMessageProps = {
  message: Message;
};

export function ChatMessage({ message }: TChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className="h-8 w-8">
        <div
          className={`w-full h-full flex items-center justify-center ${
            isUser ? "bg-primary" : "bg-secondary"
          }`}
        >
          {isUser ? <span className="text-white">U</span> : "AI"}
        </div>
      </Avatar>
      <div
        className={`p-3 max-w-[80%] rounded-sm ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        <Markdown remarkPlugins={[remarkGfm]}>
          {typeof message.content === "string" ? message.content : ""}
        </Markdown>
      </div>
    </div>
  );
}

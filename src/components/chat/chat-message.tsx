import { Message } from "@ai-sdk/react";
import { Avatar } from "@/components/ui/avatar";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";



type TChatMessageProps = {
  message: Message & { files?: Array<{ mimeType: string; base64Data: string }>, sources?: Array<{ id: string, url: string, title: string }> };
};

export function ChatMessage({ message }: TChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <Avatar className="h-8 w-8">
        <div
          className={`w-full h-full flex items-center justify-center ${isUser ? "bg-primary" : "bg-secondary"
            }`}
        >
          {isUser ? <span className="text-primary-foreground">U</span> : "AI"}
        </div>
      </Avatar>
      <div
        className={`p-3 max-w-[80%] rounded-sm ${isUser
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground"
          }`}
      >
        <Markdown remarkPlugins={[remarkGfm]}>
          {typeof message.content === "string" ? message.content : ""}
        </Markdown>

        {!isUser && message.files && message.files.length > 0 && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {message.files.map((file, index) => (
              <div key={index} className="relative w-full aspect-square rounded-lg overflow-hidden">
                <img
                  src={`data:${file.mimeType};base64,${file.base64Data}`}
                  alt={`Generated image ${index + 1}`}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}

        {!isUser && message.sources && message.sources.length > 0 && (
          <div className="mt-4 space-y-2">
            <div className="font-medium text-sm">Sources:</div>
            <div className="space-y-1">
              {message.sources.map((source, idx) => (
                <div key={source.id} className="text-sm">
                  {idx + 1}. <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{source.title}</a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

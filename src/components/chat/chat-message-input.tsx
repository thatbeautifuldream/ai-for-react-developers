import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, StopCircle, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

type TChatMessageInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  onStop?: () => void;
};

export function ChatMessageInput({
  value,
  onChange,
  onSubmit,
  isLoading,
  onStop,
}: TChatMessageInputProps) {
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhancePrompt = async () => {
    if (!value.trim()) return;

    try {
      setIsEnhancing(true);
      const response = await fetch("/api/openai/enhance-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: value }),
      });

      const enhancedPrompt = await response.json();

      const syntheticEvent = {
        target: { value: enhancedPrompt.text },
      } as React.ChangeEvent<HTMLTextAreaElement>;

      onChange(syntheticEvent);
    } catch (error) {
      console.error("Failed to enhance prompt:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2">
      <div className="relative">
        <Textarea
          value={value}
          onChange={onChange}
          placeholder="Type your message..."
          className={cn(
            "min-h-[80px] pr-20 resize-none",
            isLoading && "opacity-50"
          )}
          disabled={isLoading}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          {value.trim() && !isLoading && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleEnhancePrompt}
              disabled={isEnhancing}
              className="h-8 w-8"
              title="Enhance prompt"
            >
              <Wand2 className={cn("h-4 w-4", isEnhancing && "animate-pulse")} />
            </Button>
          )}
        </div>
      </div>
      <div className="flex justify-end gap-2">
        {isLoading && (
          <Button variant="destructive" size="icon" onClick={onStop}>
            <StopCircle className="h-4 w-4" />
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </div>
    </form>
  );
}

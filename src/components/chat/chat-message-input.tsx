import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, StopCircle, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAIStore } from "@/store/ai-store";

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
  const { selectedProvider } = useAIStore();
  const [isEnhancing, setIsEnhancing] = useState(false);

  const handleEnhancePrompt = async () => {
    if (!value.trim()) return;

    try {
      setIsEnhancing(true);
      const response = await fetch(`/api/${selectedProvider}/enhance-prompt`, {
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

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
      <div className="relative">
        <Textarea
          value={value}
          onChange={onChange}
          placeholder="Type your message..."
          className="min-h-[80px] resize-none pr-24 pb-10"
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
          {isLoading ? (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={onStop}
              className="h-8"
            >
              <StopCircle className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              size="sm"
              disabled={!value.trim()}
              className="h-8"
            >
              <Send className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </form>
  );
}

import { FormEvent, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, StopCircle, Wand2, Check, X, RefreshCw, Info } from "lucide-react";
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
  const [originalPrompt, setOriginalPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [showEnhanced, setShowEnhanced] = useState(false);
  const [isNewEnhancement, setIsNewEnhancement] = useState(false);
  const [baseInputChanged, setBaseInputChanged] = useState(false);

  useEffect(() => {
    if (originalPrompt && showEnhanced) {
      setBaseInputChanged(value !== originalPrompt);
    }
  }, [value, originalPrompt, showEnhanced]);

  useEffect(() => {
    if (isNewEnhancement) {
      const timer = setTimeout(() => {
        setIsNewEnhancement(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isNewEnhancement]);

  const handleEnhancePrompt = async () => {
    if (!value.trim()) return;

    try {
      setIsEnhancing(true);
      setOriginalPrompt(value);
      setBaseInputChanged(false);
      setEnhancedPrompt("");

      const response = await fetch(`/api/${selectedProvider}/enhance-prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: value }),
      });

      const enhancedPromptData = await response.json();
      setEnhancedPrompt(enhancedPromptData.text);
      setShowEnhanced(true);
    } catch (error) {
      console.error("Failed to enhance prompt:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleTryAgain = async () => {
    if (!originalPrompt.trim() || !baseInputChanged) return;

    try {
      setIsEnhancing(true);
      setOriginalPrompt(value);
      setBaseInputChanged(false);
      setEnhancedPrompt("Generating new enhancement...");

      const response = await fetch(`/api/${selectedProvider}/enhance-prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: value }),
      });

      const enhancedPromptData = await response.json();
      setEnhancedPrompt(enhancedPromptData.text);
      setIsNewEnhancement(true);
    } catch (error) {
      console.error("Failed to enhance prompt:", error);
      setEnhancedPrompt("Failed to generate a new enhancement. Please try again.");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleAcceptEnhanced = () => {
    const syntheticEvent = {
      target: { value: enhancedPrompt },
    } as React.ChangeEvent<HTMLTextAreaElement>;

    onChange(syntheticEvent);
    resetEnhancedState();
  };

  const handleRejectEnhanced = () => {
    resetEnhancedState();
  };

  const resetEnhancedState = () => {
    setShowEnhanced(false);
    setEnhancedPrompt("");
    setOriginalPrompt("");
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoading) {
      resetEnhancedState();
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
      {showEnhanced && (
        <div className={cn(
          "rounded-md border border-yellow-300 bg-yellow-50 dark:bg-yellow-950/30 p-3 mb-2 transition-all duration-300",
        )}>
          <p className="text-sm font-medium mb-2">Enhanced prompt:</p>
          <p className={cn(
            "text-sm mb-3",
            isEnhancing && "text-gray-400 dark:text-gray-500 italic",
            isNewEnhancement && "font-medium"
          )}>
            {enhancedPrompt || "Generating enhancement..."}
          </p>

          {!baseInputChanged && (
            <div className="flex items-center gap-2 mb-3 text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950/30 p-2 rounded-sm">
              <Info className="h-3 w-3 flex-shrink-0" />
              <span>Consider modifying your input text before trying again for better results.</span>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRejectEnhanced}
              disabled={isEnhancing}
              className="h-8"
            >
              <X className="h-4 w-4 mr-1" /> Reject
            </Button>
            <Button
              type="button"
              variant={baseInputChanged ? "outline" : "outline"}
              size="sm"
              onClick={handleTryAgain}
              disabled={isEnhancing || !baseInputChanged}
              className={cn(
                "h-8",
                !baseInputChanged && "opacity-50 cursor-not-allowed"
              )}
              title={!baseInputChanged ? "Modify your input text first" : "Try enhancing again"}
            >
              <RefreshCw className={cn("h-4 w-4 mr-1", isEnhancing && "animate-spin")} />
              {isEnhancing ? "Generating..." : "Try Again"}
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleAcceptEnhanced}
              disabled={isEnhancing}
              className="h-8"
            >
              <Check className="h-4 w-4 mr-1" /> Accept
            </Button>
          </div>
        </div>
      )}
      <div className="relative">
        <Textarea
          value={value}
          onChange={onChange}
          placeholder="Type your message..."
          className="min-h-[80px] resize-none pr-24 pb-10"
          disabled={isLoading}
        />
        <div className="absolute bottom-2 right-2 flex items-center gap-2">
          {value.trim() && !isLoading && !showEnhanced && (
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
              disabled={!value.trim() || showEnhanced}
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

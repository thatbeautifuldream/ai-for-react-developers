import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, StopCircle } from "lucide-react";

type TChatMessageInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={onChange}
        placeholder="Type your message..."
        className="flex-1"
        disabled={isLoading}
      />
      {isLoading && (
        <Button variant="destructive" size="icon" onClick={onStop}>
          <StopCircle className="h-4 w-4" />
        </Button>
      )}
      <Button type="submit" disabled={isLoading}>
        <Send className="h-4 w-4 mr-2" />
        Send
      </Button>
    </form>
  );
}

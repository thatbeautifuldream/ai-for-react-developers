import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

type TChatMessageInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
};

export function ChatMessageInput({
  value,
  onChange,
  onSubmit,
  disabled,
}: TChatMessageInputProps) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={onChange}
        placeholder="Type your message..."
        className="flex-1"
        disabled={disabled}
      />
      <Button type="submit" size="icon" disabled={disabled}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}

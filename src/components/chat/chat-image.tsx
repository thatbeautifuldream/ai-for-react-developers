import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type ChatImageProps = {
    prompt: string;
    image: { base64Data: string; mimeType: string } | null;
    error: Error | null;
    isLoading: boolean;
};

export function ChatImage({ prompt, image, error, isLoading }: ChatImageProps) {
    return (
        <div className="space-y-4">
            {/* User Message */}
            {prompt && <div className="flex gap-3 flex-row-reverse">
                <Avatar className="h-8 w-8">
                    <div className="w-full h-full flex items-center justify-center bg-primary">
                        <span className="text-primary-foreground">U</span>
                    </div>
                </Avatar>
                <div className="p-3 max-w-[80%] rounded-sm bg-primary text-primary-foreground">
                    <p>{prompt}</p>
                </div>
            </div>}

            {/* AI Response */}
            {prompt && <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                    <div className="w-full h-full flex items-center justify-center bg-secondary">
                        AI
                    </div>
                </Avatar>
                <div className="p-3 max-w-[80%] rounded-sm bg-secondary text-secondary-foreground">
                    {isLoading && (
                        <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <p>Generating an image for <code className="font-mono">"{prompt}"</code> ...</p>
                        </div>
                    )}

                    {error && (
                        <div className="text-destructive">
                            <p>Error: {error.message}</p>
                        </div>
                    )}

                    {image && (
                        <div className="mt-4">
                            <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={`data:${image.mimeType};base64,${image.base64Data}`}
                                    alt="Generated image"
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>}
        </div>
    );
} 
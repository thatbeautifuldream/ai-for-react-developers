"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAIStore } from "@/store/ai-store";
import { useEffect, useRef, useState } from "react";

export default function GenerateSpeech() {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);

    const { onlyEnableProviders } = useAIStore();

    useEffect(() => {
        onlyEnableProviders(["openai"]);
    }, [onlyEnableProviders]);

    const handleGenerateSpeech = async () => {
        if (!text.trim()) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("/api/openai/generate-speech", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            // Get the blob from the response
            const audioBlob = await response.blob();

            // Create a URL for the blob
            const url = URL.createObjectURL(audioBlob);

            // Set the audio source
            setAudioSrc(url);

            // Play the audio if ref is available
            if (audioRef.current) {
                audioRef.current.load();
                audioRef.current.play();
            }
        } catch (err) {
            console.error("Failed to generate speech:", err);
            setError(err instanceof Error ? err.message : "An unknown error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col space-y-6 max-w-3xl mx-auto p-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Text to Speech</h1>
                <p className="text-gray-500">Enter text to convert to speech using OpenAI's TTS-1 model</p>
            </div>

            <div className="space-y-4">
                <Textarea
                    placeholder="Enter text to convert to speech..."
                    className="min-h-[120px]"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isLoading}
                />

                <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                        {text.length} characters {text.length > 0 && `(~${Math.ceil(text.length / 15)} seconds)`}
                    </p>
                    <Button
                        onClick={handleGenerateSpeech}
                        disabled={isLoading || !text.trim()}
                    >
                        {isLoading ? "Generating..." : "Generate Speech"}
                    </Button>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
                    {error}
                </div>
            )}

            {audioSrc && (
                <div className="border rounded p-4 bg-gray-50">
                    <p className="font-medium mb-2">Generated Audio</p>
                    <audio
                        ref={audioRef}
                        controls
                        src={audioSrc}
                        className="w-full"
                    >
                        Your browser does not support the audio element.
                    </audio>
                </div>
            )}
        </div>
    );
}

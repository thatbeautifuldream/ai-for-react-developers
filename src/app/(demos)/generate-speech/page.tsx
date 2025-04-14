"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAIStore } from "@/store/ai-store";
import { useEffect, useRef, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Loader2, Download, RotateCcw } from "lucide-react";
import { Card } from "@/components/ui/card";

const EXAMPLE_PROMPTS = [
    "Welcome to the AI for React Developers. We're going to explore how to integrate OpenAI's text-to-speech capabilities.",
    "The quick brown fox jumps over the lazy dog. This pangram contains all the letters of the English alphabet.",
    "Artificial intelligence is transforming how we build software. With the right tools, developers can create more engaging experiences."
];

const VOICES = [
    { id: "alloy", name: "Alloy", description: "Neutral" },
    { id: "echo", name: "Echo", description: "Neutral" },
    { id: "fable", name: "Fable", description: "Warm" },
    { id: "onyx", name: "Onyx", description: "Male" },
    { id: "nova", name: "Nova", description: "Female" },
    { id: "shimmer", name: "Shimmer", description: "Female" }
];

export default function GenerateSpeech() {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [audioSrc, setAudioSrc] = useState<string | null>(null);
    const [selectedVoice, setSelectedVoice] = useState("nova");

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
                body: JSON.stringify({ text, voice: selectedVoice }),
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

    const handleDownload = () => {
        if (!audioSrc) return;

        const a = document.createElement("a");
        a.href = audioSrc;
        a.download = `speech-${selectedVoice}-${new Date().getTime()}.mp3`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleClear = () => {
        setText("");
        setAudioSrc(null);
        setError(null);
    };

    const handleExampleClick = (example: string) => {
        setText(example);
    };

    return (
        <div className="flex flex-col space-y-6 max-w-3xl mx-auto p-6">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Text to Speech</h1>
                <p className="text-gray-500">Enter text to convert to speech using OpenAI's TTS-1 model</p>
            </div>

            <div className="flex flex-col space-y-1">
                <label className="text-sm font-medium">Voice</label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                        {VOICES.map((voice) => (
                            <SelectItem key={voice.id} value={voice.id}>
                                {voice.name} - {voice.description}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-4">
                <Textarea
                    placeholder="Enter text to convert to speech..."
                    className="min-h-[120px]"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    disabled={isLoading}
                />

                <div className="flex justify-between items-center flex-wrap gap-2">
                    <p className="text-sm text-gray-500">
                        {text.length} characters {text.length > 0 && `(~${Math.ceil(text.length / 15)} seconds)`}
                    </p>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={handleClear}
                            disabled={isLoading || (!text && !audioSrc)}
                            title="Clear"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={handleGenerateSpeech}
                            disabled={isLoading || !text.trim()}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                "Generate Speech"
                            )}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-2 w-full">
                <p className="text-sm font-medium">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                    {EXAMPLE_PROMPTS.map((prompt, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="text-left text-xs"
                            onClick={() => handleExampleClick(prompt)}
                        >
                            {prompt.length > 40 ? prompt.substring(0, 40) + "..." : prompt}
                        </Button>
                    ))}
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded">
                    {error}
                </div>
            )}

            {audioSrc && (
                <Card className="p-4">
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <p className="font-medium">Generated Audio - {VOICES.find(v => v.id === selectedVoice)?.name}</p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleDownload}
                                className="flex items-center gap-1"
                            >
                                <Download className="h-4 w-4" />
                                Download
                            </Button>
                        </div>
                        <audio
                            ref={audioRef}
                            controls
                            src={audioSrc}
                            className="w-full"
                        >
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </Card>
            )}
        </div>
    );
}

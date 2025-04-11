"use client"

import { ChevronDownIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LLM_PROVIDERS, TLLMProvider, useAIStore } from "@/store/ai-store"
import Gemini from "./icons/gemini"
import Groq from "./icons/groq"
import OpenAI from "./icons/openai"
import Anthropic from "./icons/anthropic"
import XAI from "./icons/xai"

export default function LLMSelector() {
    const { selectedProvider, setSelectedProvider } = useAIStore()

    const handleValueChange = (newValue: TLLMProvider) => {
        setSelectedProvider(newValue)
    }

    function getLLMProviderIcon(provider: TLLMProvider) {
        switch (provider) {
            case "openai":
                return <OpenAI className="size-5" />
            case "google":
                return <Gemini className="size-5" />
            case "groq":
                return <Groq className="size-5" />
            case "anthropic":
                return <Anthropic className="size-5" />
            case "xai":
                return <XAI className="size-5" />
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_svg]:shrink-0">
                    {getLLMProviderIcon(selectedProvider)}
                    <span className="truncate">
                        {selectedProvider.charAt(0).toUpperCase() + selectedProvider.slice(1)}
                    </span>
                    <ChevronDownIcon className="-me-1 opacity-60" size={16} aria-hidden="true" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    {LLM_PROVIDERS.map((provider) => (
                        <DropdownMenuItem key={provider} onClick={() => handleValueChange(provider)}>
                            {getLLMProviderIcon(provider)}
                            <span className="truncate">{provider.charAt(0).toUpperCase() + provider.slice(1)}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

import { ChevronDown } from "lucide-react";
import {
    useChatStore,
    Provider,
    ApiType,
    Model
} from "@/store/chat-store";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function ProviderSelector() {
    const {
        selectedProvider,
        setSelectedProvider
    } = useChatStore();

    const providers: { id: Provider; name: string }[] = [
        { id: "openai", name: "OpenAI" },
        { id: "google", name: "Google AI" },
        { id: "groq", name: "Groq" },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1 w-[120px] justify-between">
                    {providers.find(p => p.id === selectedProvider)?.name || "Provider"}
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[180px]">
                <DropdownMenuLabel>AI Provider</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {providers.map((provider) => (
                        <DropdownMenuItem
                            key={provider.id}
                            onClick={() => setSelectedProvider(provider.id)}
                            className="cursor-pointer"
                        >
                            {provider.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function ApiTypeSelector() {
    const {
        selectedProvider,
        selectedApiType,
        setSelectedApiType,
        examples
    } = useChatStore();

    const availableApiTypes = examples
        .filter(example => example.provider === selectedProvider)
        .map(example => ({
            id: example.apiType,
            name: example.name,
            description: example.description
        }));

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1 w-[240px] justify-between">
                    {availableApiTypes.find(t => t.id === selectedApiType)?.name || "Select API Type"}
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[300px]">
                <DropdownMenuLabel>API Type</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {availableApiTypes.map((apiType) => (
                        <DropdownMenuItem
                            key={apiType.id}
                            onClick={() => setSelectedApiType(apiType.id)}
                            className="cursor-pointer flex flex-col items-start"
                        >
                            <span className="font-medium">{apiType.name}</span>
                            <span className="text-xs text-muted-foreground">{apiType.description}</span>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function ModelSelector() {
    const {
        selectedProvider,
        selectedApiType,
        selectedModel,
        setSelectedModel,
        availableModels,
        examples
    } = useChatStore();

    const currentExample = examples.find(
        e => e.provider === selectedProvider && e.apiType === selectedApiType
    );

    const supportedModelIds = currentExample?.supportsModels || [];

    const availableModelsForProvider = availableModels
        .filter(model =>
            model.provider === selectedProvider &&
            supportedModelIds.includes(model.id)
        );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1 w-[180px] justify-between">
                    {availableModels.find(m => m.id === selectedModel)?.name || "Select Model"}
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
                <DropdownMenuLabel>AI Model</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {availableModelsForProvider.map((model) => (
                        <DropdownMenuItem
                            key={model.id}
                            onClick={() => setSelectedModel(model.id)}
                            className="cursor-pointer"
                        >
                            {model.name}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export function ModelSelectionGroup() {
    return (
        <div className="flex flex-wrap gap-2 mb-4">
            <ProviderSelector />
            <ApiTypeSelector />
            <ModelSelector />
        </div>
    );
} 
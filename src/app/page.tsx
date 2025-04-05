"use client";

import { useChatStore } from "@/store/chat-store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect } from "react";

export default function Page() {
  const { examples, clearMessages } = useChatStore();

  // Group examples by provider
  const examplesByProvider = examples.reduce((acc, example) => {
    if (!acc[example.provider]) {
      acc[example.provider] = [];
    }
    acc[example.provider].push(example);
    return acc;
  }, {} as Record<string, typeof examples>);

  // Ensure messages are cleared when arriving at the home page
  useEffect(() => {
    clearMessages();
  }, [clearMessages]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 md:py-12">
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">AI for React Developers</h1>
        <p className="text-lg sm:text-xl text-muted-foreground">
          Explore different AI providers and their capabilities
        </p>
      </div>

      <div className="space-y-10 sm:space-y-12">
        {Object.entries(examplesByProvider).map(([provider, providerExamples]) => (
          <section key={provider} className="space-y-4 sm:space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold capitalize border-b pb-2">{provider}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {providerExamples.map((example) => (
                <Card key={example.id} className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle className="text-lg sm:text-xl">{example.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{example.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col flex-1 justify-between gap-4">
                    <div className="text-sm text-muted-foreground">
                      <strong>Supports models:</strong>{" "}
                      {example.supportsModels.join(", ")}
                    </div>
                    <Link href={`/${example.provider}/${example.apiType}`} className="w-full">
                      <Button className="w-full mt-2">Try it</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

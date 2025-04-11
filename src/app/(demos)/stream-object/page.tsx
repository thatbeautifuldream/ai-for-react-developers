"use client";

import { experimental_useObject as useObject } from "@ai-sdk/react";
import { Projects, projectSchema } from "../../api/openai/stream-object/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, StopCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useAIStore } from "@/store/ai-store";
export default function ProjectChat() {
  const [input, setInput] = useState("");
  const { selectedProvider } = useAIStore();

  const { object, submit, isLoading, stop, error } = useObject<Projects>({
    api: `/api/${selectedProvider}/stream-object`,
    schema: projectSchema,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    await submit(input);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] max-w-2xl mx-auto p-4">
      <ScrollArea className="flex-1 pr-4 mb-4">
        <div className="space-y-4">
          <AnimatePresence>
            {object?.projects?.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {error && (
                  <div className="mb-4">
                    An error occurred while generating projects. Please try
                    again.
                  </div>
                )}
                <Card>
                  <CardHeader>
                    <CardTitle>{project?.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {project?.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project?.technologies?.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs bg-secondary px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </ScrollArea>

      <div className="sticky bottom-0 bg-background pt-2">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask for project ideas..."
            className="flex-1"
            disabled={isLoading}
          />
          {isLoading && (
            <Button variant="destructive" onClick={() => stop()}>
              <StopCircle className="h-4 w-4" />
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            <Send className="h-4 w-4 mr-2" />
            Send
          </Button>
        </form>
      </div>
    </div>
  );
}

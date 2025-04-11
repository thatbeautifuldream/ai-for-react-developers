"use client";

import { Chat } from "@/components/chat";
import { useAIStore } from "@/store/ai-store";

export default function Home() {
  const { selectedProvider } = useAIStore();
  return <Chat api={`/api/${selectedProvider}/stream-text`} />;
}

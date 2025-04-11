"use client";

import { Chat } from "@/components/chat";
import DemoHeader from "@/components/demo-header";
import { useAIStore } from "@/store/ai-store";

export default function Home() {
  const { selectedProvider } = useAIStore();
  return (
    <>
      <DemoHeader title="Stream Text" />
      <Chat api={`/api/${selectedProvider}/stream-text`} />
    </>
  );
}

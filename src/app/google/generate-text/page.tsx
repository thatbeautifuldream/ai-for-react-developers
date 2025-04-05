"use client";

import { ChatInterface } from "@/components/chat/chat-interface";
import { useEffect } from "react";
import { useChatStore } from "@/store/chat-store";

export default function Page() {
  const { setSelectedProvider, setSelectedApiType } = useChatStore();

  // Set the correct provider and API type when this page loads
  useEffect(() => {
    setSelectedProvider('google');
    setSelectedApiType('generate-text');
  }, [setSelectedProvider, setSelectedApiType]);

  return <ChatInterface />;
}

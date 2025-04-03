import { Chat } from "@/components/chat";

export default function Home() {
  return <Chat api="/api/google/stream-text" />;
}

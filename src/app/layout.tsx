import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LLMSelector from "@/components/llm-selector";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI for React Developers",
  description: "AI for React Developers by Milind Mishra",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="fixed top-4 left-4 z-50">
          <LLMSelector />
        </div>
        {children}
      </body>
    </html>
  );
}

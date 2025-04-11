import ReactIcon from "@/components/icons/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  const demos = [
    {
      title: "Generate Text",
      description: "Generate text with AI using various models. Experience the power of natural language generation.",
      href: "/generate-text",
    },
    {
      title: "Stream Text",
      description: "Watch AI responses stream in real-time. See how streaming can enhance user experience with immediate feedback.",
      href: "/stream-text",
    },
    {
      title: "Stream Object",
      description: "Explore structured data streaming with AI. Perfect for dynamic content.",
      href: "/stream-object",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
              AI for <ReactIcon className="inline-block size-8 mx-2" /> React Developers
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore practical examples of integrating AI capabilities into React applications.
              From text generation to real-time streaming, discover how to enhance your apps with AI.
            </p>
          </div>

          {/* Demo Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {demos.map((demo) => (
              <Card key={demo.href} className="hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{demo.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-gray-600 mb-4">{demo.description}</p>
                  <div className="mt-auto">
                    <Button asChild className="w-full">
                      <Link href={demo.href}>Try Demo</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-50 border-t">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-gray-600">
          <p>Built using Vercel AI SDK by Milind Mishra</p>
        </div>
      </footer>
    </div>
  );
}

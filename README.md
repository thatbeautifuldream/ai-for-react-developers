# 🤖 AI for React Developers

> A cutting-edge Next.js application showcasing AI integration patterns and best practices for modern React development.

This project demonstrates various AI-powered features and tools using the latest web technologies, helping developers understand how to effectively integrate artificial intelligence into their React applications.

## 🔍 Project Overview

### 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4 with React 19
- **Styling**: TailwindCSS with custom animations
- **AI Integration**:
  - Vercel AI SDK integration (`ai` package)
  - Multiple provider SDKs (@ai-sdk/openai, @ai-sdk/google, @ai-sdk/groq)
  - React-specific hooks (@ai-sdk/react)
- **UI Components**:
  - Radix UI primitives for accessible components
  - Framer Motion for animations
  - Lucide React for icons
- **Type Safety**: TypeScript with Zod for schema validation

### ✨ Key Features

- **🧠 Multi-Model Support**: Integration with multiple AI providers:

  - **OpenAI**: GPT-3.5 Turbo, GPT-4, GPT-4 Turbo
  - **Google AI**: Gemini Pro, Gemini 1.5 Pro, Gemini Pro Vision
  - **Groq**: Llama2-70B, Mixtral-8x7B

- **🚀 Advanced AI Capabilities**:

  - **📝 Text Generation**: Basic completion for all supported models
  - **⚡ Streaming Responses**: Real-time text streaming for interactive UIs
  - **🔄 Structured Data**: Stream typed objects with schema validation
  - **🔧 Tool Calling**: Function calling with OpenAI models
  - **🖼️ Image Generation**: Create images using Gemini Pro Vision

- **📦 Vercel AI SDK Features**:

  - Streaming UI components with React suspense
  - Type-safe schema validation with Zod
  - Standardized API interfaces across providers
  - Edge runtime support for optimal performance

- **💅 Modern UI**: Responsive design with Tailwind CSS
- **🔌 API Routes**: Comprehensive API implementation showcasing different AI capabilities

## 🚀 Getting Started

> Follow these simple steps to get the project running on your local machine.

```bash
# Install dependencies
pnpm install

# Start the development server
pnpm run dev
```

Visit `http://localhost:3000` to explore the application.

## 📡 API Structure

> Each AI provider has dedicated API routes demonstrating different capabilities.

```javascript
// Available API routes organized by provider and capability
{
  openai: {
    generateText: '/api/openai/generate-text',
    streamText: '/api/openai/stream-text',
    streamObject: '/api/openai/stream-object',
    toolCalling: '/api/openai/tool-calling'
  },
  google: {
    generateText: '/api/google/generate-text',
    streamText: '/api/google/stream-text',
    streamObject: '/api/google/stream-object',
    generateImage: '/api/google/generate-image'
  },
  groq: {
    generateText: '/api/groq/generate-text',
    streamText: '/api/groq/stream-text',
    streamObject: '/api/groq/stream-object'
  }
}
```

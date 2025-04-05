# AI for React Developers

This project is a modern Next.js application that demonstrates AI integration and best practices for React developers. It showcases various AI-powered features and tools using the latest web technologies.

## Project Overview

### Tech Stack

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

### Key Features

- **Multi-Model Support**: Integration with multiple AI providers:

  - **OpenAI**: GPT-3.5 Turbo, GPT-4, GPT-4 Turbo
  - **Google AI**: Gemini Pro, Gemini 1.5 Pro, Gemini Pro Vision
  - **Groq**: Llama2-70B, Mixtral-8x7B

- **Advanced AI Capabilities**:

  - **Text Generation**: Basic completion for all supported models
  - **Streaming Responses**: Real-time text streaming for interactive UIs
  - **Structured Data**: Stream typed objects with schema validation
  - **Tool Calling**: Function calling with OpenAI models
  - **Image Generation**: Create images using Gemini Pro Vision

- **Vercel AI SDK Features**:

  - Streaming UI components with React suspense
  - Type-safe schema validation with Zod
  - Standardized API interfaces across providers
  - Edge runtime support for optimal performance

- **Modern UI**: Responsive design with Tailwind CSS
- **API Routes**: Comprehensive API implementation showcasing different AI capabilities

## Getting Started

```bash
pnpm install
pnpm run dev
```

Visit `http://localhost:3000` to explore the application.

## API Structure

Each AI provider has dedicated API routes demonstrating different capabilities:

- `/api/{provider}/generate-text` - Basic text generation
- `/api/{provider}/stream-text` - Streaming text responses
- `/api/{provider}/stream-object` - Structured data streaming
- `/api/openai/tool-calling` - Function calling with OpenAI
- `/api/google/generate-image` - Image generation with Google AI

# AI for React Developers

This project is a modern Next.js application that demonstrates AI integration and best practices for React developers. It showcases various AI-powered features and tools using the latest web technologies.

## Project Overview

### Tech Stack

- **Framework**: Next.js 15.2.4 with React 19
- **Styling**: TailwindCSS with custom animations
- **AI Integration**: OpenAI SDK integration (@ai-sdk/openai, @ai-sdk/react)
- **UI Components**:
  - Radix UI primitives for accessible components
  - Framer Motion for animations
  - Lucide React for icons
- **Type Safety**: TypeScript with Zod for schema validation

### Key Features

- **Chat Interface**: Real-time AI chat functionality
- **Tool Calling**: Demonstration of AI tool integration
- **Object Usage Examples**: Showcases object manipulation with AI
- **Modern UI**: Responsive design with Tailwind CSS
- **API Routes**: Backend API implementation in Next.js

### Detailed Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── chat/              # Chat feature implementation
│   ├── tool-calling/      # AI tool calling examples
│   ├── use-object/        # Object usage demonstrations
│   └── api/               # API routes
│       ├── chat/          # Chat-related API endpoints
│       ├── tool-calling/  # Tool integration endpoints
│       └── use-object/    # Object manipulation endpoints
├── components/            # Reusable React components
│   ├── ui/               # Core UI components
│   │   ├── avatar.tsx    # User avatar component
│   │   ├── button.tsx    # Custom button component
│   │   ├── card.tsx      # Card container component
│   │   ├── input.tsx     # Form input component
│   │   ├── scroll-area.tsx # Custom scrollable area
│   │   └── separator.tsx   # Visual separator component
│   └── chat/             # Chat-specific components
└── lib/                  # Utility functions and shared logic
```

### API Structure

The application features three main API categories:

1. **Chat API** (`/api/chat`)

   - Handles real-time chat communication
   - Integrates with OpenAI's API
   - Manages chat history and context

2. **Tool Calling API** (`/api/tool-calling`)

   - Manages AI tool integrations
   - Handles tool execution and responses
   - Provides tool registration and discovery

3. **Object Usage API** (`/api/use-object`)
   - Handles object manipulation requests
   - Manages state transformations
   - Processes object-related operations

### Component Library

The project includes a comprehensive set of UI components:

1. **Core UI Components** (`/components/ui/`)

   - `avatar.tsx`: User profile picture component with fallback
   - `button.tsx`: Customizable button with variants
   - `card.tsx`: Container component for content organization
   - `input.tsx`: Form input with validation support
   - `scroll-area.tsx`: Custom scrollable container
   - `separator.tsx`: Visual divider component

2. **Chat Components** (`/components/chat/`)
   - Chat interface components
   - Message bubbles
   - Chat input and controls

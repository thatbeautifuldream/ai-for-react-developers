import LLMSelector from '@/components/llm-selector'
import React from 'react'

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div className="fixed top-4 left-4 z-50">
                <LLMSelector />
            </div>
            {children}
        </div>
    )
}

export default Layout;
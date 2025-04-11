function DemoHeader({ title }: { title: string }) {
    return (
        <div className="fixed top-4 right-4 z-50">
            <span className="font-mono uppercase inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-yellow-600/20 ring-inset">
                {title}
            </span>
        </div>
    )
}

export default DemoHeader;
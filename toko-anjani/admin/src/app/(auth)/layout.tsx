export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full w-full bg-gradient-to-br from-background via-background to-primary/5">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />
            </div>
            <div className="relative flex items-center justify-center min-h-screen z-10">
                {children}
            </div>
        </div>
    )
}
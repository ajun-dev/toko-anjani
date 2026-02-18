export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="h-full w-full bg-gradient-to-br from-background via-background to-secondary/10">
            <div className="flex items-center justify-center min-h-screen">
                {children}
            </div>
        </div>
    )
}
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-background flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Toko Anjani</h1>
          <p className="mt-1 text-sm text-muted-foreground">Admin Panel</p>
        </div>

        {/* Sign Up Card */}
        <SignUp
          appearance={{
            baseTheme: undefined,
            elements: {
              // Card wrapper
              rootBox: "w-full",
              card: "bg-card text-card-foreground border border-border rounded-xl shadow-sm p-0",
              cardBox: "p-6 space-y-5",
              
              // Header
              headerTitle: "text-lg font-semibold text-foreground",
              headerSubtitle: "text-muted-foreground text-sm hidden",
              
              // Form elements
              formFieldLabel: "text-sm font-medium text-foreground",
              formFieldInput: 
                "w-full px-3 py-2 bg-background border border-input text-foreground placeholder:text-muted-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary h-9 text-sm",
              
              // Buttons
              formButtonPrimary:
                "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 px-3 rounded-md transition-colors duration-200 h-9 text-sm",
              formButtonSecondary:
                "w-full border border-input bg-background hover:bg-secondary text-foreground py-2 px-3 rounded-md transition-colors duration-200 font-medium h-9 text-sm",
              dividerLine: "bg-border",
              dividerText: "text-muted-foreground text-xs",
              
              // Social buttons
              socialButtonsBlockButton:
                "w-full border border-input bg-background hover:bg-secondary text-foreground py-2 px-3 rounded-md transition-colors duration-200 font-medium h-9 text-sm",
              socialButtonsBlockButtonText: "text-sm",
              
              // Links
              formResendCodeLink: "text-primary hover:underline text-xs",
              linkButton: "text-primary hover:underline text-xs",
              
              // Footer
              footerActionLink: "text-primary hover:underline text-xs",
              footerActionText: "text-muted-foreground text-xs",
              
              // Other elements
              formFieldHint: "text-xs text-muted-foreground mt-1",
              formFieldError: "text-xs text-destructive mt-1",
              identityPreview: "bg-secondary border border-input rounded-md p-2",
              identityPreviewText: "text-xs font-medium",
              dividerContainer: "relative my-4",
            },
            layout: {
              socialButtonsPlacement: "bottom",
              logoImageUrl: undefined,
              termsPageUrl: undefined,
            },
            variables: {
              colorPrimary: "hsl(var(--color-primary))",
              colorBackground: "hsl(var(--color-background))",
              colorText: "hsl(var(--color-foreground))",
              colorTextSecondary: "hsl(var(--color-muted-foreground))",
              colorInputBackground: "hsl(var(--color-background))",
              colorInputText: "hsl(var(--color-foreground))",
              fontFamily: "inherit",
            },
          }}
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
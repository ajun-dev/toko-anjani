import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Toko Anjani</h1>
          <p className="mt-2 text-muted-foreground">Admin Panel</p>
        </div>

        {/* Sign Up Form */}
        <SignUp
          appearance={{
            baseTheme: undefined,
            elements: {
              // Card wrapper
              rootBox: "w-full",
              card: "bg-card text-card-foreground border border-border rounded-xl shadow-sm p-0",
              cardBox: "p-6 space-y-6",
              
              // Header
              headerTitle: "text-2xl font-bold tracking-tight",
              headerSubtitle: "text-muted-foreground text-sm",
              
              // Form elements
              formFieldLabel: "text-sm font-medium text-foreground",
              formFieldInput: 
                "w-full px-3 py-2 bg-background border border-input text-foreground placeholder:text-muted-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary h-9",
              
              // Buttons
              formButtonPrimary:
                "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 px-4 rounded-md transition-colors duration-200 h-9",
              formButtonSecondary:
                "w-full border border-input bg-background hover:bg-secondary text-foreground py-2 px-4 rounded-md transition-colors duration-200 font-medium h-9",
              dividerLine: "bg-border",
              dividerText: "text-muted-foreground text-sm",
              
              // Social buttons
              socialButtonsBlockButton:
                "w-full border border-input bg-background hover:bg-secondary text-foreground py-2 px-4 rounded-md transition-colors duration-200 font-medium h-9",
              socialButtonsBlockButtonText: "text-sm font-medium",
              
              // Links
              formResendCodeLink: "text-primary hover:underline text-sm",
              linkButton: "text-primary hover:underline text-sm",
              
              // Footer
              footerActionLink: "text-primary hover:underline text-sm",
              footerActionText: "text-muted-foreground text-sm",
              
              // Other elements
              formFieldHint: "text-xs text-muted-foreground mt-1",
              formFieldError: "text-xs text-destructive mt-1",
              identityPreview: "bg-secondary border border-input rounded-md p-2",
              identityPreviewText: "text-sm font-medium",
              dividerContainer: "relative my-6",
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
              colorSuccessText: "hsl(22 100% 50%)",
              colorDangerText: "hsl(0 100% 50%)",
              colorNeutral: "hsl(var(--color-muted))",
              colorShellBackground: "hsl(var(--color-background))",
              colorShellText: "hsl(var(--color-foreground))",
              fontFamily: "inherit",
            },
          }}
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
}
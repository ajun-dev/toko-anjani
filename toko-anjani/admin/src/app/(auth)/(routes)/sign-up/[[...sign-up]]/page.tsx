import { SignUp } from "@clerk/nextjs";
import { ShieldAlert } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background via-background to-secondary/5 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Decorative top element */}
        <div className="mb-12 text-center">
          {/* Icon Badge */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <ShieldAlert className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          {/* Branding */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground">Toko Anjani</h1>
          <p className="mt-2 text-lg text-muted-foreground font-medium">Admin Panel</p>
          <p className="mt-1 text-sm text-muted-foreground">Kelola toko Anda dengan mudah</p>
        </div>

        {/* Sign Up Card */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent rounded-2xl" />
          
          <SignUp
            appearance={{
              baseTheme: undefined,
              elements: {
                // Card wrapper
                rootBox: "w-full",
                card: "relative bg-card text-card-foreground border border-border rounded-2xl shadow-xl p-0 backdrop-blur-sm",
                cardBox: "p-8 space-y-6",
                
                // Header
                headerTitle: "text-2xl font-bold tracking-tight text-foreground hidden",
                headerSubtitle: "text-muted-foreground text-sm hidden",
                
                // Form elements
                formFieldLabel: "text-sm font-semibold text-foreground",
                formFieldInput: 
                  "w-full px-4 py-3 bg-background border border-input text-foreground placeholder:text-muted-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-background transition-all duration-200 h-11 text-base",
                
                // Buttons
                formButtonPrimary:
                  "w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 px-4 rounded-lg transition-all duration-200 h-11 shadow-md hover:shadow-lg",
                formButtonSecondary:
                  "w-full border-2 border-border bg-background hover:bg-secondary hover:border-primary/30 text-foreground py-3 px-4 rounded-lg transition-all duration-200 font-semibold h-11",
                dividerLine: "bg-border",
                dividerText: "text-muted-foreground text-xs font-medium uppercase tracking-wider",
                
                // Social buttons
                socialButtonsBlockButton:
                  "w-full border-2 border-border bg-background hover:bg-secondary hover:border-primary/30 text-foreground py-3 px-4 rounded-lg transition-all duration-200 font-semibold h-11 flex items-center justify-center gap-2",
                socialButtonsBlockButtonText: "text-sm font-semibold",
                
                // Links
                formResendCodeLink: "text-primary hover:text-primary/80 text-sm font-semibold transition-colors",
                linkButton: "text-primary hover:text-primary/80 text-sm font-semibold transition-colors",
                
                // Footer
                footerActionLink: "text-primary hover:text-primary/80 font-semibold transition-colors",
                footerActionText: "text-muted-foreground text-sm",
                
                // Other elements
                formFieldHint: "text-xs text-muted-foreground mt-1.5 font-medium",
                formFieldError: "text-xs text-destructive mt-1.5 font-semibold",
                identityPreview: "bg-secondary/50 border border-secondary rounded-lg p-3 backdrop-blur-sm",
                identityPreviewText: "text-sm font-semibold text-foreground",
                dividerContainer: "relative my-7",
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
                borderRadius: "0.5rem",
              },
            }}
            redirectUrl="/dashboard"
          />
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Hanya untuk admin yang berwenang</p>
          <p className="mt-1">© 2025 Toko Anjani. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
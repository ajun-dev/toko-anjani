import { SignIn } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <SignIn
      appearance={{
        elements: {
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
          card: "bg-white",
        },
      }}
      redirectUrl="/dashboard"
    />
  )
}
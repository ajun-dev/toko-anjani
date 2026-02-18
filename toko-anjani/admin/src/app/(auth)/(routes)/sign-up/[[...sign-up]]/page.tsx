import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <SignUp
      appearance={{
        elements: {
          formButtonPrimary: "bg-blue-600 hover:bg-blue-700",
          card: "bg-white",
        },
      }}
      redirectUrl="/dashboard"
    />
  );
}
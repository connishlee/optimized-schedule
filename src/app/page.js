import { SignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <SignIn 
        routing="hash" 
        afterSignInUrl="/dashboard" 
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            card: "bg-[#1a1a1a]",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-400",
            formButtonPrimary: "bg-gradient-to-r from-purple-500 to-pink-500",
            formFieldInput: "bg-black/50 border-gray-700 text-white",
            dividerLine: "bg-gray-700",
            dividerText: "text-gray-400",
            formFieldLabel: "text-gray-300",
            footerActionLink: "text-purple-400",
            socialButtonsBlockButton: "border-gray-700",
            socialButtonsBlockButtonText: "text-white"
          }
        }}
      />
    </main>
  );
}
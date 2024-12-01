import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { userId } = await auth(); // No need to await directly
  if (userId) {
    return redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <SignIn
        routing="hash"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            card: "bg-[#1a1a1a]",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-300",
            formButtonPrimary: "bg-gradient-to-r from-purple-500 to-pink-500",
            formFieldInput: "bg-black/50 border-gray-700 text-white",
            dividerLine: "bg-gray-600",
            dividerText: "text-gray-200",
            formFieldLabel: "text-gray-600",

            socialButtonsBlockButton:
              "bg-gray-800 hover:bg-gray-600 transition-all duration-200",
            socialButtonsBlockButtonText: "text-white",
            footerActionLink: "text-gray-400 hover:text-gray-300",
          },
        }}
      />
    </main>
  );
}

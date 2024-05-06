import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignIn path="/sign-in" />;
    </div>
  )
}
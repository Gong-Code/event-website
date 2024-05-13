
import Link from "next/link";
import SignInForm from "../../_components/sign-in-form";


export default function SignInPage() {
  return (
    <div>
      <h1 className="text-center text-5xl font-bold mb-6">Login to your account</h1>
      <SignInForm />
      <p className="mt-6 text-center">
      Dont' have an account?
      <Link className="text-blue-500 underline" href="/sign-up"> Sign up</Link>
    </p>
    </div>
  )
}
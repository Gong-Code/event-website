import Link from "next/link";
import SignUpForm from "../../_components/sign-up-form";

export default function SignUpPage() {
  return (
  <div>
    <h1 className="text-center text-5xl font-bold mt-36 mb-6">Create an account</h1>
    <SignUpForm />
    <p className="mt-6 text-center">
      Already have an account?
      <Link className="text-blue-500 underline" href="/sign-in"> Login</Link>
    </p>
  </div>
  )
}



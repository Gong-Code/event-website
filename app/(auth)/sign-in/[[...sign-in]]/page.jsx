'use client'

import Link from "next/link";
import SignInForm from "../../_components/sign-in-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/app/(root)/admin/_components/auth-provider";


export default function SignInPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
      if (user) {
          router.push('/admin');     
      } 
          
  }, [user, router]);

  return (
    <div>
      <h1 className="text-center text-5xl font-bold mt-36 mb-6">Login to your account</h1>
      <SignInForm />
      <p className="mt-6 text-center">
      Dont' have an account?
      <Link className="text-blue-500 underline" href="/sign-up"> Sign up</Link>
    </p>
    </div>
  )
}
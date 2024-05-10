"use client"

import { SignInButton, SignOutButton, useAuth, useUser } from "@clerk/nextjs";
// import Link from "next/link";




const Navbar = () => {

  const { sessionId } = useAuth();
  const { user } = useUser()

  return (
    <div className="flex gap-1">
      <a href="/">
        <button>Home</button>
      </a>
      {!sessionId && <SignInButton />}
      {sessionId &&  <SignOutButton signOutOptions={{ sessionId }} />}
      <a href="/sign-up">
        <button>Sign Up</button>
      </a>   
      {user && <a href="/admin">
        <button>Admin</button>
      </a>}
    </div>

    
  )
}
export default Navbar
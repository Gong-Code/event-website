"use client"

import { SignInButton, SignOutButton, useAuth, useUser } from "@clerk/nextjs";
// import Link from "next/link";




const Navbar = () => {

  const { sessionId } = useAuth();
  const { user } = useUser()

  return (
    <div className="fixed top-0 flex justify-between w-full px-10 py-4 bg-tertiary text-primary">
      <a href="/" className="rounded hover:bg-secondary">
        <button>Home</button>
      </a>
      <div className="flex">
        {!sessionId && <SignInButton className=" mx-3 px-3 py-2 rounded hover:bg-secondary" />}
        {sessionId &&  <SignOutButton signOutOptions={{ sessionId }} className=" mx-3 px-3 py-2 rounded hover:bg-secondary" />}
        <a href="/sign-up" className="mx-3  rounded hover:bg-secondary">
          <button>Sign Up</button>
        </a>   
        {user && <a href="/admin" className="px-3 py-2 rounded hover:bg-secondary">
          <button>Admin</button>
        </a>}
      </div>
    </div>

    
  )
}
export default Navbar
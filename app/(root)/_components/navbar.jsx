"use client"

import { SignInButton, SignOutButton, useAuth, useUser } from "@clerk/nextjs";
// import Link from "next/link";




const Navbar = () => {

  const { sessionId } = useAuth();
  const { user } = useUser()

  return (
    <div className="fixed top-0 flex justify-between w-full px-10 py-4 bg-tertiary text-primary border-b border-tertiary">
        <img src="../assets/placeholder.jpg" alt="logo" className="flex w-16 h-16 rounded-full" />
      <a href="/"  className="px-0 py-4 rounded ">
        <button>Home</button>
      </a>
      <div className="flex justify-between px-10 py-4 bg-tertiary text-primary">

        {/* Alva wants to remove row 26 for the signin button and instead add a button like row 23-25 instead for the sign in*/}
        {/* <a href="/sign-in"> classname="mx-3 bg-tertiary rounded hover:bg-secondary"}
          <button>Sign In</button>
        </a> */}
        {!sessionId && <SignInButton className=" mx-3 px-3 py-2 rounded" />}
        {sessionId &&  <SignOutButton signOutOptions={{ sessionId }} className=" mx-3 px-3 py-2 rounded" />}
        <a href="/sign-up" className="mx-3 bg-tertiary rounded">
          <button>Sign Up</button>
        </a>
          <img src="../assets/placeholder.jpg" alt="profile" className=" invisible w-10 mx-3 h-10 rounded-full " />
        {user && <a href="/admin" className="rounded hover:border-tertiary">
          <button>Admin</button>
        </a>}
      </div>
    </div>

    
  )
}
export default Navbar
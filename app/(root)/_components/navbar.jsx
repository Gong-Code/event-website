"use client"

import { SignInButton, SignOutButton, useAuth, useUser } from "@clerk/nextjs";
// import Link from "next/link";




const Navbar = () => {

  const { sessionId } = useAuth();
  const { user } = useUser()

  return (
    <div className="fixed top-0 flex justify-between w-full px-10 py-4 bg-secondary-muted text-tertiary border-b border-tertiary">
        <img src="https://i.gyazo.com/0b860b89ade2ae5d1686a3ceef3d5451.webp" alt="logo" className="sticky w-14 h-14 rounded-full" />
      <a href="/"  className="rounded">
        <button className="py-2 mt-7">Home</button>
      </a>
      <div className="flex justify-between text-primary">

        {/* Alva wants to remove row 26 for the signin button and instead add a button like row 23-25 instead for the sign in*/}
        {/* <a href="/sign-in"> classname="mx-3 bg-tertiary rounded hover:bg-secondary"}
          <button>Sign In</button>
        </a> */}
        {!sessionId && <SignInButton className=" mx-3 px-3 py-2 h-9 rounded text-primary" />}
        {sessionId &&  <SignOutButton signOutOptions={{ sessionId }} className=" mx-3 h-9 rounded text-primary" />}
        <a href="/sign-up" className="mx-3 rounded text-primary">
          <button>Sign Up</button>
        </a>
          <img src="../assets/placeholder.jpg" alt="profile" className=" invisible w-10 mx-3 h-10 rounded-full " />
        {user && <a href="/admin" className="rounded text-tertiary">
          <button>Admin</button>
        </a>}
      </div>
    </div>

    
  )
}
export default Navbar
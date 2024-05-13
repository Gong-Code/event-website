"use client"

import SignOutButton from "@/app/(auth)/_components/sign-out-button";
import Image from "next/image";
import { useAuth } from "../admin/_components/auth-provider";
// import Link from "next/link";

const Navbar = () => {

  const { user } = useAuth()

  return (
    <div className="flex justify-between w-full px-10 py-4 bg-secondary-muted text-tertiary border-b border-tertiary">
        <Image src="/assets/logo.webp" alt="logo" width={50} height={50} className="sticky w-14 h-14 rounded-full" />
      <a href="/"  className="rounded">
        <button className="py-2 mt-7">Home</button>
      </a>
      <div className="flex justify-between text-primary">
        {user ? <SignOutButton /> :
        <a href="/sign-in" className="mx-3 rounded text-primary">
          <button>Sign in</button>
        </a>
        }
        
        <a href="/sign-up" className="mx-3 rounded text-primary">
          <button>Sign Up</button>
        </a>
          <Image src="/assets/placeholder.jpg" alt="profile" width={40} height={40} className="invisible w-10 mx-3 h-10 rounded-full" />
        {user && <a href="/admin" className="rounded text-tertiary">
          <button>Admin</button>
        </a>}
      </div>
    </div>

    
  )
}
export default Navbar
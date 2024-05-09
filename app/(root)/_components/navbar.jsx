"use client"

import { SignInButton, SignOutButton, useAuth } from "@clerk/nextjs";



const Navbar = () => {

  const { sessionId } = useAuth();

  if (!sessionId) {
    return (
      <div>
        <SignInButton />
      </div>
    );
  }

  return (
    <SignOutButton signOutOptions={{ sessionId }} />
  )
}
export default Navbar
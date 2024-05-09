"use client"

import { SignInButton, SignOutButton, SignUpButton, useAuth } from "@clerk/nextjs";



const Navbar = () => {

  const { sessionId } = useAuth();

  return (
    <div className="flex gap-1">
      {!sessionId && <SignInButton />}
      {sessionId &&  <SignOutButton signOutOptions={{ sessionId }} />}
      <SignUpButton />
    </div>

    
  )
}
export default Navbar
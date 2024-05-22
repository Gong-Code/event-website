'use client'

import { auth } from "@/firebase.config"
import { signOut } from "firebase/auth"

function SignOutButton({ onSignOut }) {

  const handleSignOut = async () => {
    await signOut(auth)
    if (onSignOut) {
      onSignOut();
    }
  }

  return (
    <div onClick={handleSignOut}><button>Sign Out</button></div>
  )
}
export default SignOutButton
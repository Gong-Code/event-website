'use client'

import { auth } from "@/firebase.config"
import { signOut } from "firebase/auth"

function SignOutButton() {

  const handleSignOut = async () => {
    await signOut(auth)
  }

  return (
    <div onClick={handleSignOut}><button>Sign Out</button></div>
  )
}
export default SignOutButton
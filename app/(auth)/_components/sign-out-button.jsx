'use client'

function SignOutButton() {

  const handleSignOut = async () => {
    await signOut(auth)
  }

  return (
    <div onClick={handleSignOut}><button>SignOutButton</button></div>
  )
}
export default SignOutButton
'use client'

import EventsList from "./_components/EventsList"
import { useClerk } from "@clerk/clerk-react";
const AdminPage = () => {
  const { signOut } = useClerk();

  return (
    <div>
      <div className="mt-40 flex justify-center">My Dashboard</div>
      <div className="mt-40 flex justify-center">
        <EventsList />
      </div>
      <button onClick={signOut}>Log Out</button>
    </div>
  )
}
export default AdminPage
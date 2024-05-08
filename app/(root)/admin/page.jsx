'use client'

import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import EventsList from "./_components/EventsList"

const AdminPage = () => {
  const { isSignedIn, user, isLoading } = useUser();
  const router = useRouter();
 
  if (isLoading) return;
  if (!isSignedIn) router.push('/sign-in');
  console.log(user)
  return (
    <>
    <div className="mt-40 flex justify-center">My Dashboard</div>
    <div className="mt-40 flex justify-center">
      <EventsList />
    </div>
    
    
    </>
  )
}
export default AdminPage
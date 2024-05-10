'use client'

import Navbar from "../_components/navbar";
import EventsList from "./_components/EventsList"

const AdminPage = () => {
  

  return (
    <div>
      <Navbar />
      <div className="mt-40 flex justify-center">My Dashboard</div>
      <div className="mt-40 flex justify-center">
        <EventsList />
      </div>
    </div>
  )
}
export default AdminPage
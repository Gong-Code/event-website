'use client'



import { useEffect, useState } from "react";
import { UsersList } from "../_components/UsersList";
import { getAllUsers } from "@/app/api/users/route";

import { useState } from "react";


const UsersPage = () => {

  const [users, setUsers] = useState(null);

  
    // FETCH USERS

    const fetchUsers = async () => {
      
          const fetchedUsers = await getAllUsers();
          setUsers(fetchedUsers);
  };

  useEffect(() => {
    fetchUsers(); 
  }, []);



  return (
    <div className="flex flex-col justify-center text-center mt-20 gap-10">
      <h1>Users</h1>
      <UsersList users={users} />
    </div>
  );
  
}
export default UsersPage
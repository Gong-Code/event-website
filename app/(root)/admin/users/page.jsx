'use client'


import { useState } from "react";

const UsersPage = () => {

  const [users, setUsers] = useState(null);

  
    // FETCH USERS
    const fetchUsers = async (userId) => {
      if (userId) {
          const fetchedUsers = await getAllUsers(userId);
          setEvents(fetchedUsers);
      
      }else {
          console.log('User is not logged in');
      }
     
  };



  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
        ))}
        </tbody>
    </table>
  );
  
}
export default UsersPage
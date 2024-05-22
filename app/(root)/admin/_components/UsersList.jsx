'use client';

import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";


export const UsersList = () => {
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        const db = getFirestore();
        const usersCol = collection(db, "users");
        const userSnapshot = await getDocs(usersCol);
        const userList = userSnapshot.docs.map(doc => doc.data());
        setUsers(userList);
        console.log('userList', userList);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (

        <div className='bg-primary rounded-xl border-b border-gray-900/10 shadow-sm overflow-x-auto'>
        {users && users.length ? (
            <table className='text-slate-900 w-full table-auto'>
                <thead className='border-b border-gray-900/10 pb-12'>
                    <tr>
                        <th className='flex p-4 font-semibold text-sm '>
                            Users
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.uid}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            {/* Render user data here */}
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No users found</p>
        )}
    </div>
    );
};

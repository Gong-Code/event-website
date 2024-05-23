'use client'

import { demoteToUser, upgradeToAdmin } from "@/app/lib/user.db";
import { db } from "@/firebase.config";
import { collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";


export const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [Admin, setAdmin] = useState([]);

    const fetchUsers = async () => {
        const db = getFirestore();
        const usersCol = collection(db, "users");
        const userSnapshot = await getDocs(usersCol);
        const userList = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsers(userList);
        console.log('userList', userList);
    }


    const fetchAdmins = async () => {
        const db = getFirestore();
        const adminsCol = collection(db, "admins");
        const adminSnapshot = await getDocs(adminsCol);
        const adminList = adminSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAdmin(adminList);
        console.log('adminList', adminList);
    }

    useEffect(() => {
        fetchUsers();
        fetchAdmins();
    }, []);

    const handleUpgrade = async (userId) => {
        try {
            await upgradeToAdmin(userId);
            
            await fetchUsers();
            await fetchAdmins();
        } catch (error) {
            console.error("Failed to upgrade user:", error);
        }
    };

    const handleDemote = async (userId) => {
        try {
            await demoteToUser(userId);
            await fetchAdmins();
            await fetchUsers();
            
        } catch (error) {
            console.error("Failed to upgrade user:", error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const userDocRef = doc(db, "users", id);
            await deleteDoc(userDocRef);
            await fetchAdmins();
            await fetchUsers();
            toast.success('User deleted successfully');
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    }

    const handleDeleteAdmin = async (id) => {
        try {
            const adminDocRef = doc(db, "admins", id);
            await deleteDoc(adminDocRef);
            await fetchAdmins();
            await fetchUsers();
            toast.success('Admin deleted successfully');
        } catch (error) {
            console.error("Failed to delete admin:", error);
        }
    };

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
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            {/* Render user data here */}
                            <td>
                                <button className="text-slate-200 with:fit-content" onClick={() => 
                                    handleUpgrade(user.id)}>
                                    Upgrade to Admin
                                </button>
                               
                            </td>
                            <td>
                                 <button className="text-slate-200 bg-red-500 with:fit-content" onClick={() => 
                                    handleDeleteUser(user.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <thead className='border-b border-gray-900/10 pb-12'>
                   <tr>
                        <th className='flex p-4 font-semibold text-sm '>
                        Admins
                       </th>
                 </tr>
               </thead>
                <tbody>
                   {Admin.map((admin) => (
                        <tr key={admin.id}>                          
                            <td>{admin.name}</td>
                            <td>{admin.email}</td>
                            {/* Render user data here */}
                            <td>
                                <button className="text-slate-200" onClick={() => 
                                handleDemote(admin.id)}>
                                Demote to User
                            </button>
                            </td>
                            <td>
                                <button className="text-slate-200 bg-red-500 with:fit-content" onClick={() => 
                                    handleDeleteAdmin(admin.id)}>
                                    Delete
                                </button>
                            </td>
                            
                            
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

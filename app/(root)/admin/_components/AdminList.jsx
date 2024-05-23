'use client';

import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

export const AdminList = () => {
    const [admins, setAdmins] = useState([]);

    const fetchAdmins = async () => {
        const db = getFirestore();
        const adminsCol = collection(db, "admins");
        const adminSnapshot = await getDocs(adminsCol);
        const adminList = adminSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setAdmins(adminList);
        console.log('adminList', adminList);
    }

    useEffect(() => {
        fetchAdmins();
    }, []);

    return (
        <div className='bg-primary rounded-xl border-b border-gray-900/10 shadow-sm overflow-x-auto'>
        {admins && admins.length ? (
            <table className='text-slate-900 w-full table-auto'>
                <thead className='border-b border-gray-900/10 pb-12'>
                    <tr>
                        <th className='flex p-4 font-semibold text-sm '>
                            Admins
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.id}>                          
                            <td>{admin.name}</td>
                            <td>{admin.email}</td>
                            {/* Render user data here */}
                        </tr>
                    ))}
                </tbody>
            </table>
        ) : (
            <p>No admins found</p>
        )}
        </div>
    );
};
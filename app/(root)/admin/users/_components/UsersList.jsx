'use client';

import { demoteToUser, upgradeToAdmin } from '@/app/lib/user.db';
import { db } from '@/firebase.config';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    getFirestore,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { TbSquareRoundedArrowUp } from 'react-icons/tb';
import { TbSquareRoundedArrowDown } from 'react-icons/tb';

export const UsersList = () => {
    const [users, setUsers] = useState([]);
    const [admins, setAdmins] = useState([]);

    const fetchUsers = async () => {
        const db = getFirestore();
        const usersCol = collection(db, 'users');
        const userSnapshot = await getDocs(usersCol);
        const userList = userSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setUsers(userList);
    };

    const fetchAdmins = async () => {
        const db = getFirestore();
        const adminsCol = collection(db, 'admins');
        const adminSnapshot = await getDocs(adminsCol);
        const adminList = adminSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setAdmins(adminList);
    };

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
            console.error('Failed to upgrade user:', error);
        }
    };

    const handleDemote = async (userId) => {
        try {
            await demoteToUser(userId);
            await fetchAdmins();
            await fetchUsers();
        } catch (error) {
            console.error('Failed to upgrade user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            const userDocRef = doc(db, 'users', id);
            await deleteDoc(userDocRef);
            await fetchAdmins();
            await fetchUsers();
            toast.success('User deleted successfully');
        } catch (error) {
            console.error('Failed to delete user:', error);
        }
    };

    const handleDeleteAdmin = async (id) => {
        try {
            const adminDocRef = doc(db, 'admins', id);
            await deleteDoc(adminDocRef);
            await fetchAdmins();
            await fetchUsers();
            toast.success('Admin deleted successfully');
        } catch (error) {
            console.error('Failed to delete admin:', error);
        }
    };

    return (
        <div className='bg-primary rounded-xl border-b border-gray-900/10 shadow-sm overflow-x-auto'>
            {users && users.length ? (
                <table className='text-slate-900 w-full table-auto mb-2'>
                    <thead className='border-b border-gray-900/10 pb-12'>
                        <tr>
                            <th
                                colSpan={4}
                                className='p-4 text-left font-semibold text-sm bg-slate-700/10'>
                                Users
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className='text-sm border-b border-gray-900/10'>
                                <td className='px-4 py-3 text-left text-ellipsis overflow-hidden truncate'>
                                    {user.name}
                                </td>
                                <td>{user.email}</td>
                                <td
                                    colSpan={2}
                                    className='pr-4 flex gap-2 justify-end items-center'>
                                    <button
                                        className='mt-1.5 secondary w-fit text-xs flex items-center gap-1'
                                        onClick={() => handleUpgrade(user.id)}>
                                        <TbSquareRoundedArrowUp className='size-4' />
                                        <span>Upgrade</span>
                                    </button>
                                    <button
                                        className='mt-1.5 error w-fit text-primary text-xs flex items-center gap-1'
                                        onClick={() =>
                                            handleDeleteUser(user.id)
                                        }>
                                        <MdDeleteForever className='size-4' />
                                        <span>Delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <thead className='border-b border-gray-900/10 pb-12'>
                        <tr>
                            <th
                                colSpan={4}
                                className='p-4 text-left font-semibold text-sm bg-slate-700/10'>
                                Admins
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {admins.map((admin) => (
                            <tr
                                key={admin.id}
                                className='text-sm border-b border-gray-900/10 last:border-0'>
                                <td className='px-4 py-3 text-left text-ellipsis overflow-hidden truncate'>
                                    {admin.name}
                                </td>
                                <td>{admin.email}</td>
                                <td
                                    colSpan={2}
                                    className='pr-4 flex gap-2 justify-end items-center'>
                                    <button
                                        className='mt-1.5 secondary w-fit text-xs flex items-center gap-1'
                                        onClick={() => handleDemote(admin.id)}>
                                        <TbSquareRoundedArrowDown className='size-4' />
                                        <span>Demote</span>
                                    </button>
                                    <button
                                        className='mt-1.5 error w-fit text-primary text-xs flex items-center gap-1'
                                        onClick={() =>
                                            handleDeleteAdmin(admin.id)
                                        }>
                                        <MdDeleteForever className='size-4' />
                                        <span>Delete</span>
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

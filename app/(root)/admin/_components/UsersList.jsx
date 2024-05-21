'use client';

import { useEffect, useState } from 'react';

import { useAuth } from './auth-provider';
import { useEvents } from './events-provider';
import { getAllUsers } from '@/app/lib/database';

export const UsersList = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);

    // FETCH USERS
    const fetchUsers = async (userId) => {
        const fetchedUsers = await getAllUsers(userId);
        setUsers(fetchedUsers);
    };

    // DISPLAY USERS
    useEffect(() => {
        fetchUsers();
    }, [user]);

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
                            <tr
                                key={user.uid}
                                className='border-b border-gray-900/10 last:border-0'>
                                <td className='px-4 py-2 text-left text-sm font-medium text-ellipsis overflow-hidden'>
                                    {user.uid}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className='flex justify-center items-center my-2'>
                    <p className='text-secondary font-semibold'>
                        No users found!
                    </p>
                </div>
            )}
        </div>
    );
};

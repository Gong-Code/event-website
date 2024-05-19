'use client';


import { getAllUsers } from '@/app/api/users/route';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const UsersList = () => {
    const [users, setUsers] = useState(null);

    // FETCH EVENTS
    const fetchEvents = async () => {
        const fetchedEvents = await getAllUsers();
        setUsers(fetchedEvents);
    };

    // DISPLAY EVENTS
    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className='bg-primary rounded-xl border-b border-gray-900/10 shadow-sm overflow-x-auto'>
            {users && users.length ? (
                <table className='text-slate-900 w-full table-auto'>
                    <thead className='border-b border-gray-900/10 pb-12'>
                        <tr>
                            <th></th>
                            <th className='p-4 text-left font-semibold text-sm'>
                                Event name
                            </th>
                            <th className='p-4 text-left font-semibold text-sm'>
                                Location
                            </th>
                            <th className='p-4 text-left font-semibold text-sm'>
                                Date
                            </th>
                            <th className='p-4 text-right font-semibold text-sm'>
                                Available spots
                            </th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.name}
                                className='border-b border-gray-900/10 last:border-0'>
                                <td className='w-[60px] invisible md:visible px-3 py-3'>
                                    <Image
                                        className='h-10 w-10 rounded-full bg-gray-50'
                                        src={
                                            `${user.image}` ||
                                            '/assets/placeholder.jpg'
                                        }
                                        alt='user image'
                                        width={40}
                                        height={40}
                                    />
                                </td>
                                <td className='px-4 py-2 text-left text-sm font-medium text-ellipsis overflow-hidden'>
                                    {user.name}
                                </td>
                                <td className='px-4 py-2 text-left text-sm text-ellipsis overflow-hidden'>
                                    {user.name}
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

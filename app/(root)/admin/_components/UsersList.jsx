'use client';


import { getAllUsers } from '@/app/api/users/route';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useAuth } from './auth-provider';
import { useEvents } from './events-provider';
import { getAllEvents } from '@/app/api/events/route';

export const UsersList = () => {
    const { user, authLoaded } = useAuth();
    const { events, setEvents } = useEvents();

    // FETCH USERS
    const fetchEvents = async (userId) => {
        const fetchedEvents = await getAllEvents(userId);
        setEvents(fetchedEvents);
    };

     // DISPLAY USERS
     useEffect(() => {
        window.onload = () => {
            if (authLoaded && user) {
                
                const userId = user?.uid
                
                if (userId) {
                    fetchEvents(userId);
                }
                
           }
        
        }
        
    }, [user, authLoaded]);

    useEffect(() => {
        if (user) {
            const userId = user.uid;
            
            if (userId) {
                fetchEvents(userId);
            }
        }
    }, [user]);

    return (
        <div className='bg-primary rounded-xl border-b border-gray-900/10 shadow-sm overflow-x-auto'>
            {events && events.length ? (
                <table className='text-slate-900 w-full table-auto'>
                    <thead className='border-b border-gray-900/10 pb-12'>
                        <tr>
                            
                            <th className='flex p-4 font-semibold text-sm '>
                                Users
                            </th>
                            
                            
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr
                                key={event.name}
                                className='border-b border-gray-900/10 last:border-0'>
                                
                                <td className='px-4 py-2 text-left text-sm font-medium text-ellipsis overflow-hidden'>
                                    {event.user}
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
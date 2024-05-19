'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GoArrowRight } from 'react-icons/go';
import { useEvents } from './events-provider';
import { useEffect } from 'react';
import { getAllEvents } from '@/app/api/events/route';
import { useAuth } from './auth-provider';

export const EventsList = () => {
    const { events, setEvents } = useEvents();
    const { user, authLoaded } = useAuth();
  
    // FETCH EVENTS
    const fetchEvents = async (userId) => {
        if (userId) {
            const fetchedEvents = await getAllEvents(userId);
            setEvents(fetchedEvents);
        
        }else {
            console.log('User is not logged in');
        }
       
    };

    // DISPLAY EVENTS
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
                        {events.map((event) => (
                            <tr
                                key={event.name}
                                className='border-b border-gray-900/10 last:border-0'>
                                <td className='w-[60px] invisible md:visible px-3 py-3'>
                                    <Image
                                        className='h-10 w-10 rounded-full bg-gray-50'
                                        src={
                                            `${event.image}` ||
                                            '/assets/placeholder.jpg'
                                        }
                                        alt='event image'
                                        width={40}
                                        height={40}
                                    />
                                </td>
                                <td className='px-4 py-2 text-left text-sm font-medium text-ellipsis overflow-hidden'>
                                    {event.name}
                                </td>
                                <td className='px-4 py-2 text-left text-sm text-ellipsis overflow-hidden'>
                                    {event.location}
                                </td>
                                <td className='px-4 py-2 text-left text-sm text-ellipsis overflow-hidden'>
                                    {event.date}
                                </td>
                                <td className='px-4 py-2 text-right text-sm text-ellipsis overflow-hidden'>
                                    {event.numberOfSpots}
                                </td>
                                <td className='px-4'>

                                    <Link href={`/admin/${event.id}`}>
                                        <button className='readmore flex whitespace-nowrap items-center gap-2'>
                                            <span>Manage</span>
                                            <GoArrowRight className='size-4 font-semibold' />
                                        </button>
                                    </Link>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className='flex justify-center items-center my-2'>
                    <p className='text-secondary font-semibold'>
                        No events found! Get started by{' '}
                        <Link
                            href='/admin/new'
                            className='underline underline-offset-4 decoration-2 decoration-[var(--tertiary)] hover:decoration-[var(--secondary-muted)]'>
                            creating an event.
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
};

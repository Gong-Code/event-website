'use client';

import { getAllEvents } from '@/app/api/events/route';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GoArrowRight } from 'react-icons/go';

export const EventsList = () => {
    const [events, setEvents] = useState([]);

    // FETCH EVENTS
    const fetchEvents = async () => {
        const fetchedEvents = await getAllEvents();
        setEvents(fetchedEvents);
    };

    // DISPLAY EVENTS
    useEffect(() => {
        fetchEvents();
    }, []);

    console.log(events);

    return (
        <>
            <div className='bg-primary rounded-xl border-b border-gray-900/10 shadow-sm'>
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
                        {events && events.length ? events.map((event) => (
                                <tr key={event.name} className='border-b border-gray-900/10 last:border-0'>
                                    <td className='px-6 py-3'>
                                        <Image
                                            className='h-10 w-10 rounded-full bg-gray-50'
                                            src={
                                                `${event.image}` ||
                                                '/assets/placeholder.jpg'
                                            }
                                            alt='event image'
                                            width={500}
                                            height={500}
                                        />
                                    </td>
                                    <td className='px-4 py-2 text-left text-sm font-medium'>
                                        {event.name}
                                    </td>
                                    <td className='px-4 py-2 text-left text-sm'>
                                        {event.location}
                                    </td>
                                    <td className='px-4 py-2 text-left text-sm'>
                                        {event.date}
                                    </td>
                                    <td className='px-4 py-2 text-right text-sm'>
                                        {event.numberOfSpots}
                                    </td>
                                    <td className='px-4'>
                                        <button className='readmore flex items-center gap-2'>
                                            <span>Read more</span>
                                            <GoArrowRight className='size-4 font-semibold' />
                                        </button>
                                    </td>
                                </tr> )) : (
                    <div className='flex justify-center items-center my-2'>
                        <p className='text-secondary font-semibold'>No events found! Get started by <Link href="/admin/new" className='underline underline-offset-4 decoration-2 decoration-[var(--tertiary)] hover:decoration-[var(--secondary-muted)]'>creating an event.</Link></p>
                    </div>
                )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

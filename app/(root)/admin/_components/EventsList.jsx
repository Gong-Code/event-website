'use client'

import { getAllEvents } from '@/app/api/events/route';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { GoArrowRight } from "react-icons/go";

export const EventsList = () => {

const [events, setEvents] = useState([])

// FETCH EVENTS
const fetchEvents = async () => {
    const fetchedEvents = await getAllEvents();
    setEvents(fetchedEvents);
};

// DISPLAY EVENTS
useEffect(() => {
    fetchEvents();
}, []);

    return (
        <div className='relative bg-primary py-2 rounded-3xl px-8 mx-4'>
            <ul
                role='list'
                className='divide-y divide-gray-300 mx-auto'>
                {events ? events.map((event) => (
                    <li
                        key={event.date}
                        className='flex mx-auto justify-between max-w-7xl items-center'>
                        <div className='flex items-center gap-6'>
                            <Image
                                className='h-12 w-12 rounded-full bg-gray-50'
                                src={event.imageUrl}
                                alt=''
                                width={500}
                                height={500}
                            />
                            <div className='min-w-0 flex-auto'>
                                <p className='text-sm font-bold text-gray-900 border-b-2 border-b-tertiary'>
                                    {event.name}
                                </p>
                                <div className='flex gap-2 items-center my-3'>
                                    <span className='font-semibold text-gray-900 text-xs'>
                                        Date:{' '}
                                    </span>
                                    <span className='text-xs text-gray-500'>
                                        {event.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='shrink-0 flex flex-col items-end'>
                            <button className="readmore flex items-center gap-2"><span>Read more</span><GoArrowRight className="size-4 font-semibold"/></button>
                        </div>
                    </li>
                )) : (
                    <div className='flex justify-center items-center my-2'>
                        <p className='text-secondary font-semibold'>No events found! Get started by <Link href="/admin/new" className='decoration-[var(--tertiary)] hover:decoration-[var(--secondary-muted)]'>creating an event.</Link></p>
                    </div>
                )}
            </ul>
        </div>
    );
};

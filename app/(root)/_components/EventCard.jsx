'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export const EventCard = ({
    name,
    image,
    location,
    date,
    eventId,
    numberOfSpots,
    userId,
    bookedUsers
}) => {
    const router = useRouter();
    
    const numberOfBookedUsers = bookedUsers ? bookedUsers.length : 0;

    const goToEvent = () => {
        router.push(
            `/${eventId}`
        );
    };

    return (
        <div
            onClick={goToEvent}
            className='p-6 rounded-3xl border-dashed border-2 border-slate-600 transform transition duration-500 hover:scale-110 hover:border-tertiary cursor-pointer m-5 max-w-96 w-[150px}'>
            <h3 className='py-4'>{name}</h3>
            <Image
                src={`${image}` || '/assets/placeholder.jpg'}
                width={200}
                height={200}
                alt='Event image'
            />
            <p>{date}</p>
            <p>{location}</p>
            <p>
                {numberOfBookedUsers}/{numberOfSpots}
            </p>
        </div>
    );
};

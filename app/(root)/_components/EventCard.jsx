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
    bookedUsers,
}) => {
    const router = useRouter();

    const numberOfBookedUsers = bookedUsers ? bookedUsers.length : 0;

    const goToEvent = () => {
        router.push(`/${eventId}`);
    };

    return (
        <div
            onClick={goToEvent}
            className='p-6 bg-primary hover:bg-primary-muted hover:scale-105 rounded-md shadow-lg ring-1 ring-gray-900/5 transform transition duration-500 cursor-pointer m-5 max-w-96 w-[370px] h-[340px] text-gray-800 flex flex-col'>
            <div className='justify-center text-left'>
                <h3 className='mb-2 w-fit px-3 bg-tertiary font-semibold text-primary'>
                    {name}
                </h3>
                <div className='w-full h-[150px]'>
                    <Image
                        src={`${image}` || '/assets/placeholder.jpg'}
                        width={200}
                        height={200}
                        alt='Event image'
                        className='w-full h-[150px] object-cover rounded-md'
                    />
                </div>
                <div className='flex flex-col gap-2 mt-4 text-sm'>
                    <span>
                        <span className='font-semibold'>Location: </span>
                        {location}
                    </span>
                    <span>
                        <span className='font-semibold'>Date: </span>
                        {date}
                    </span>
                    <span>
                        <span className='font-semibold'>Booked: </span>
                        {numberOfBookedUsers}/{numberOfSpots}
                    </span>
                </div>
            </div>
        </div>
    );
};

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
    bookedUsers,
}) => {
    const router = useRouter();

    const numberOfBookedUsers = bookedUsers ? bookedUsers.length : 0;

    const isMaxUsers = Number(numberOfBookedUsers) === Number(numberOfSpots);

    const goToEvent = () => {
        router.push(`/${eventId}`);
    };

    return (
        <div
            onClick={goToEvent}
            className={`p-6 bg-primary rounded-md shadow-lg ring-1 ring-gray-900/5 transform transition duration-500 cursor-pointer m-5 max-w-96 w-full sm:w-[370px] h-[360px] sm:h-auto text-gray-800 flex flex-col ${
                isMaxUsers
                    ? 'opacity-80'
                    : 'hover:bg-primary-muted hover:scale-105'
            }`}>
            <div className='justify-center text-left'>
                <h3 className='mb-2 w-fit px-3 bg-tertiary font-semibold text-primary'>
                    {name}
                </h3>
                <div className='w-full h-[150px]'>
                    <Image
                        src={image || '/assets/placeholder.jpg'}
                        width={200}
                        height={200}
                        alt='Event image'
                        className='w-full h-[150px] object-cover rounded-md'
                    />
                    {isMaxUsers && (
                        <h3 className='font-medium w-fit px-3 bg-error text-primary border border-slate-100/70 -rotate-45 absolute right-0 bottom-[150px] uppercase shadow-md z-10'>
                            Sold out
                        </h3>
                    )}
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

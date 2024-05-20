'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Event = ({ name, image, location, date, eventId, numberOfSpots, maxUsers, userId }) => {
    const router = useRouter()
    const goToEvent = () => {
        router.push(`/event/detail?name=${name}&image=${image}&location=${location}&date=${date}&numberOfSpots=${numberOfSpots}&maxUsers=${maxUsers}&eventId=${eventId}&userId=${userId}`)
   }

    return (
        <div onClick={goToEvent} className='p-6 rounded-3xl border-dashed border-2 border-slate-600 transform transition duration-500 hover:scale-110 hover:border-tertiary cursor-pointer m-5 max-w-96 w-[150px}'>
            <h3 className='py-4'>{name}</h3>
            <Image
                src={`${image}` || '/assets/placeholder.jpg'}
                width={200}
                height={200}
                alt='Event image'
            />
            <p>{date}</p>
            <p>{location}</p>
            <p>{0}/{numberOfSpots}</p>
        </div>
    );
};

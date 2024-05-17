'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Event = ({ name, image, location, date, numberOfSpots, maxUsers }) => {
    const router = useRouter()
    const goToEvent = () => {
        router.push(`/event/detail?name=${name}&image=${image}&location=${location}&date=${date}&numberOfSpots=${numberOfSpots}&maxUsers=${maxUsers}`)
   }

    return (
        <div onClick={goToEvent} className='border p-10 rounded border-tertiary'>
            <p className='text-xl font-bold'>{name}</p>
            <Image
                src={image}
                width={200}
                height={500}
                alt='Placeholder image'
            />
            <p className='text-base'>{location}</p>
            <p className='text-base'>{date}</p>
            <p className=''>{numberOfSpots}/{maxUsers}</p>
        </div>
    );
};

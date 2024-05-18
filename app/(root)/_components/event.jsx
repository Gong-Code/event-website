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
        <div onClick={goToEvent} className='p-6 rounded-3xl border-dashed border-2 border-tertiary'>
            <h1 className='py-4'>{name}</h1>
            <Image
                src={image}
                width={400}
                height={400}
                alt='Placeholder image'
            />
            <p className='text-base'>{location}</p>
            <p className='text-base'>{date}</p>
            <p className=''>{numberOfSpots}/{maxUsers}</p>
        </div>
    );
};

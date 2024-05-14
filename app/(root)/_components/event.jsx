'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Event = ({ name, img, address, date, numberOfPlaces, users, id, maxUsers }) => {
    const router = useRouter()
    const goToEvent = () => {
        router.push(`/event/${id}?name=${name}&img=${img}&address=${address}&date=${date}&numberOfPlaces=${numberOfPlaces}&users=${users}&maxUsers=${maxUsers}`)
   }

    return (
        <div onClick={goToEvent} className='border p-10 rounded border-tertiary'>
            <p className='text-xl font-bold'>{name}</p>
            <Image
                src={img}
                width={200}
                height={500}
                alt='Placeholder image'
            />
            <p className='text-base'>{address}</p>
            <p className='text-base'>{date}</p>
            <p className=''>{numberOfPlaces}/{maxUsers}</p>
        </div>
    );
};

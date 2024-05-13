'use client'

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

export const Event = ({ name, img, address, date, numberOfPlaces, users, id }) => {
    const router = useRouter()
    const goToEvent = () => {
        router.push(`/event/${id}`)
   }

    return (
        <div onClick={goToEvent} className='border p-2 rounded border-green-400'>
            <p>{name}</p>
            <Image
                src={img}
                width={200}
                height={500}
                alt='Placeholder image'
            />
            <p>{address}</p>
            <p>{date}</p>
            <p>{numberOfPlaces}</p>
            <p>{users.map((item, i) => {
                return <span key={i}>{item}</span>
            })}</p>
        </div>
    );
};

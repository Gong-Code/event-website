import Image from 'next/image';
import React from 'react';

export const Event = ({ name, img }) => {
    return (
        <div className='border p-2 rounded border-green-400'>
            {name}
            <Image
                src={img}
                width={200}
                height={500}
                alt='Placeholder image'
            />
        </div>
    );
};

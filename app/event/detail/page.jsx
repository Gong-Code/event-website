'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

const EventDetailsPage = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const image = searchParams.get('image');
    const location = searchParams.get('location');
    const date = searchParams.get('date');
    const numberOfSpots = searchParams.get('numberOfSpots');
    const maxUsers = searchParams.get('maxUsers');

    const isMaxUsers = Number(numberOfSpots) === Number(maxUsers);

    return (
        <div className='flex flex-col p-8 justify-center w-full items-center'>
            <p className='text-2xl'>{name}</p>
            <Image
                src={image}
                width={500}
                height={500}
                alt='event'
            />
            <p className='text-lg'>
                <span className='font-bold'>Where?</span> {location}
            </p>
            <p className='text-lg'>
                <span className='font-bold'>When?</span> {date}
            </p>
            <p className='text-lg'>
                Availability:{' '}
                <span className='font-bold'>{maxUsers - numberOfSpots}</span>{' '}
                places left
            </p>
            <div className='w-2/4'>
                <button
                    className={`text-lg mt-4 ${isMaxUsers ? 'opacity-50' : ''}`}>
                    Book now!
                </button>
            </div>
        </div>
    );
};

export default EventDetailsPage;

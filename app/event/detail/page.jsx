'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import bookEvent from '@/app/api/events/booked/route';

const EventDetailsPage = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const image = searchParams.get('image');
    const location = searchParams.get('location');
    const date = searchParams.get('date');
    const numberOfSpots = searchParams.get('numberOfSpots');
    const maxUsers = searchParams.get('maxUsers');
    const eventId = searchParams.get('eventId');
    const userId = searchParams.get('userId');

    const isMaxUsers = Number(numberOfSpots) === Number(maxUsers);

    const bookEventFunction = () => {
        bookEvent(userId, eventId).then(() => {
            console.log('Event booked');
        })
    }

    return (
        <div className='flex flex-col p-10 justify-center w-full items-center gap-2'>
            <h1 className='my-5'>{name}</h1>
            <Image
                src={image}
                width={400}
                height={400}
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
                <button onClick={bookEventFunction}
                    className={`text-lg mt-4 ${isMaxUsers ? 'opacity-50' : ''}`}>
                    Book now!
                </button>
            </div>
        </div>
    );
};

export default EventDetailsPage;

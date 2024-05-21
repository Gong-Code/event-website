'use client';

import { bookEvent, getEventById } from '@/app/lib/event.db';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const EventDetailsPage = () => {
    const [event, setEvent] = useState({
        bookedUsers: []
    
    })
    
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const image = searchParams.get('image');
    const location = searchParams.get('location');
    const date = searchParams.get('date');
    const numberOfSpots = searchParams.get('numberOfSpots');
    const eventId = searchParams.get('eventId');
    const userId = searchParams.get('userId');
    const numberOfBookedUsers = searchParams.get('numberOfBookedUsers');

    const isMaxUsers = Number(numberOfBookedUsers) === Number(numberOfSpots);

    
    useEffect(() => {
        getEventById(eventId)
            .then(event => {
                setEvent(event)
            })
    }, [])

    const bookEventFunction = () => {

        if (isMaxUsers || event && event.bookedUsers && event.bookedUsers.includes(userId)) return;
        bookEvent(userId, eventId).then(() => {
            setEvent(prevState => ({
                ...prevState,
                bookedUsers: [...prevState.bookedUsers, userId]
            }))
        })
    }

    return (
        <div className='flex flex-col p-10 justify-center w-full items-center gap-2'>
            <h1 className='my-5'>{event && event.name}</h1>
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
                <span className='font-bold'>{numberOfSpots - numberOfBookedUsers}</span>{' '}
                spots left
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

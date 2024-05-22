'use client';

import { useEvents } from '@/app/(root)/admin/_components/events-provider';
import { getEventById } from '@/app/lib/event.db';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useUsers } from '../(root)/_components/users-provider';

const EventDetailsPage = () => {

    const { id } = useParams();
    const { event, setEvent } = useEvents();
    const { bookEventFunction, isMaxUsers, numberOfBookedUsers } = useUsers()
    
    useEffect(() => {
        const fetchEvent = async () => {
            const event = await getEventById(id);
            setEvent(event);
        };

        fetchEvent();
    }, [id]);

    // const [event, setEvent] = useState({
    //     bookedUsers: [],
    // });


    return (
        <div className='flex flex-col p-10 justify-center w-full items-center gap-2'>
            {event && (
                <>
                <h1 className='my-5'>{event.name}</h1>
                <Image
                    src={event.image}
                    width={400}
                    height={400}
                    alt='event'
                />
                <p className='text-lg'>
                    <span className='font-bold'>Where?</span> {event.location}
                </p>
                <p className='text-lg'>
                    <span className='font-bold'>When?</span> {event.date}
                </p>
                <p className='text-lg'>
                    Availability:{' '}
                    <span className='font-bold'>
                        {event.numberOfSpots - numberOfBookedUsers}
                    </span>{' '}
                    spots left
                </p>
                <div className='w-2/4'>
                    <button
                        onClick={bookEventFunction}
                        className={`text-lg mt-4 ${
                            isMaxUsers ? 'opacity-50' : ''
                        }`}>
                        Book now!
                    </button>
                </div>
                </>
            )}
        </div>
    );
};

export default EventDetailsPage;

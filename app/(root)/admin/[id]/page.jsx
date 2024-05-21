'use client';


import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getEventById } from '@/app/lib/event.db';

const ManageEventDetailPage = () => {
    const [event, setEvent] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchEvent = async () => {
            const event = await getEventById(id);
            setEvent(event);
        };

        fetchEvent();
    }, [id]);

    return (
        <div className='mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 mt-10 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8'>
            {event && (
                <>
                    <div>
                        <div className='flex justify-between'>
                            <div>
                                <h2 className='text-3xl font-bold tracking-tight text-primary sm:text-4xl'>
                                    {event.name}
                                </h2>
                                <p className='my-6 text-primary-muted leading-6'>
                                    {event.description}
                                </p>
                            </div>
                        </div>
                        <dl className='divide-y divide-gray-100/10 outline-gray-100/20 outline outline-1 p-6'>
                            <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                                <dt className='text-sm font-semibold leading-6 text-primary-muted'>
                                    Location
                                </dt>
                                <dd className='mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0'>
                                    {event.location}
                                </dd>
                            </div>
                            <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                                <dt className='text-sm font-semibold leading-6 text-primary-muted'>
                                    Date
                                </dt>
                                <dd className='mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0'>
                                    {event.date}
                                </dd>
                            </div>
                            <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                                <dt className='text-sm font-semibold leading-6 text-primary-muted'>
                                    Number of available spots
                                </dt>
                                <dd className='mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0'>
                                    {event.numberOfSpots}
                                </dd>
                            </div>
                            <div className='p-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0'>
                                <dt className='text-sm font-semibold leading-6 text-primary-muted'>
                                    Attending users
                                </dt>
                                <dd className='mt-1 text-sm leading-6 text-gray-300 sm:col-span-2 sm:mt-0'>
                                    LOREM IPSUM
                                </dd>
                            </div>
                        </dl>
                        <div className='flex gap-4 mt-6'>
                            <Link href={`/`}>
                                <button className='secondary flex whitespace-nowrap items-center gap-2'>
                                    <span>Update</span>
                                    {/* <GoArrowRight className='size-4 font-semibold' /> */}
                                </button>
                            </Link>
                            <Link href={`/`}>
                                <button className='error flex whitespace-nowrap items-center gap-2'>
                                    <span>Delete</span>
                                    {/* <GoArrowRight className='size-4 font-semibold' /> */}
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <Image
                            src={`${event.image}` || '/assets/placeholder.jpg'}
                            width={400}
                            height={400}
                            alt='event'
                            className='rounded-lg'
                        />
                    </div>
                </>
            )}
        </div>
    );
};
export default ManageEventDetailPage;

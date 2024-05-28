'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { EventCard } from './(root)/_components/EventCard';
import { useState, useEffect } from 'react';
import { useAuth } from './(root)/admin/_components/auth-provider';
import { getAllEvents } from './lib/event.db';
import { useUsers } from './(root)/_components/users-provider';
import Loading from './(root)/_components/Loading';
import { useEvents } from './(root)/_components/events-provider';

const LandingPage = () => {
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();
    const { events } = useEvents();

    const {
        onSort,
        inc,
        onSearch,
        searchValue,
        eventList,
        setEventList,
        setEventListOriginal,
        removeEventFunction
    } = useUsers();

    const checkDatesOnEvents = () => {
        events.forEach((event) => {
            const eventDate = new Date(event.date);
            const currentDate = new Date();
            if (eventDate < currentDate) {
                removeEventFunction(event.id);
            }
        });
    }

    useEffect(() => {
        setEventList(events)
        setEventListOriginal(events);
        checkDatesOnEvents();
    }, [events]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className='flex flex-col py-12 md:py-28 px-6 md:px-16 lg:px-36 justify-center items-center'>
            <div className='flex flex-col'>
                <h1 className='text-tertiary'>Welcome to Vibe Events</h1>
                <p className='text-base'>
                    We display all the current events happening around
                    Stockholm. See anything interesting? Do not forget to sign
                    up for the event in time!
                </p>
            </div>
            <div className='flex mt-10 md:mt-20 space-x-5'>
                <button
                    className='flex gap-3 items-center'
                    onClick={onSort}>
                    <span>
                        {<FontAwesomeIcon icon={inc ? faSortUp : faSortDown} />}
                    </span>{' '}
                    <span>Sort by availability</span>
                </button>
                <input
                    type='text'
                    value={searchValue}
                    onChange={onSearch}
                    className='text-black text-sm placeholder:text-sm'
                    placeholder='Search for an event...'
                />
            </div>
            <h3 className='flex mt-16 justify-center items-center'>
                Check out the current events!
            </h3>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 p-2 mt-2'>
                {eventList.map((item, i) => {
                    return (
                        <EventCard
                            name={item.name}
                            key={i}
                            image={item.image}
                            location={item.location}
                            date={item.date}
                            numberOfSpots={item.numberOfSpots}
                            eventId={item.id}
                            userId={user?.uid}
                            bookedUsers={item.bookedUsers}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default LandingPage;

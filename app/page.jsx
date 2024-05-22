'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { EventCard } from './(root)/_components/EventCard';
import { useState, useEffect } from 'react';
import { useAuth } from './(root)/admin/_components/auth-provider';
import { getAllEvents } from './lib/event.db';
import { useUsers } from './(root)/_components/users-provider';

const LandingPage = () => {
    const [loading, setLoading] = useState(false);

    const { user } = useAuth();
    const {
        onSort,
        inc,
        onSearch,
        searchValue,
        eventList,
        setEventList,
        setEventListOriginal,
    } = useUsers();

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const events = await getAllEvents();
                setEventList(events);
                setEventListOriginal(events);
            } catch (error) {
                console.error('Could not fetch events:', error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col py-32 justify-center items-center px-8 mt-8'>
            <div className='flex flex-col '>
                <h1 className='text-tertiary'>Welcome to Vibe Events</h1>
                <p className='text-base'>
                    We display all the current events happening around
                    Stockholm. See anything interesting? Do not forget to sign
                    up for the event in time!
                </p>
            </div>
            <div className='flex mt-20 space-x-5'>
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

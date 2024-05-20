'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { Event } from './(root)/_components/event';
import { useState, useEffect } from 'react';
import { getAllEvents } from '@/app/api/events/route';
import { useAuth } from './(root)/admin/_components/auth-provider';
import { set } from 'zod';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase.config';

const img = '/assets/placeholder.jpg';

const LandingPage = () => {
    const { user, authLoaded } = useAuth();
    const [searchValue, setSearchValue] = useState('');
    const [eventList, setEventList] = useState([]);
    const [inc, setInc] = useState(true);
    const [eventListOriginal, setEventListOriginal] = useState([]);

    const onSearch = (e) => {
        setSearchValue(e.target.value);
        const newList = eventListOriginal.filter((x) =>
            x.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setEventList(newList);
    };

    const onSort = () => {
        if (inc) {
            const newList = eventListOriginal.sort(
                (a, b) => a.numberOfSpots - b.numberOfSpots
            );
            setEventList(newList);
            setInc(false);
        } else {
            const newList = eventListOriginal.sort(
                (a, b) => b.numberOfSpots - a.numberOfSpots
            );
            setEventList(newList);
            setInc(true);
        }
    };

    const fetchEvents = async () => {
        let events = [];

        try {
            const querySnapshot = await getDocs(collection(db, 'events'));

            for (let docSnapshot of querySnapshot.docs) {
                let event = { id: docSnapshot.id, ...docSnapshot.data() };
                console.log(event);
                events.push(event);
            }

            setEventList(events);
            console.log(events);
        } catch (error) {
            console.error('Could not fetch collection:', error.message);
            return [];
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className='flex flex-col py-32 justify-center items-center p-2 mt-8'>
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
            <div className='grid lg:grid-cols-3 p-2 mt-2'>
                {eventList.map((item, i) => {
                    return (
                        <Event
                            name={item.name}
                            key={i}
                            image={item.image}
                            location={item.location}
                            date={item.date}
                            numberOfSpots={item.numberOfSpots}
                            maxUsers={200}
                            eventId={item.id}
                            userId={user?.uid}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default LandingPage;

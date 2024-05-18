'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';
import { Event } from './(root)/_components/event';
import { useState, useEffect } from 'react';
import { getAllEvents } from '@/app/api/events/route';

const img = '/assets/placeholder.jpg';

const LandingPage = () => {
    const [searchValue, setSearchValue] = useState('')
    const [eventList, setEventList] = useState([])
    const [inc, setInc] = useState(true)
    const [eventListOriginal, setEventListOriginal] = useState([])

    const onSearch = (e) => {
        setSearchValue(e.target.value)
        const newList = eventListOriginal.filter(x => x.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setEventList(newList)
    }

    const onSort = () => {
        if(inc) {
            const newList = eventListOriginal.sort((a, b) => a.numberOfSpots - b.numberOfSpots)
            setEventList(newList)
            setInc(false)
        } else {
            const newList = eventListOriginal.sort((a, b) => b.numberOfSpots - a.numberOfSpots)
            setEventList(newList)
            setInc(true)
        }
    }

    useEffect(() => {
        getAllEvents().then((res) => {
            setEventList(res)
            setEventListOriginal(res)
            console.log(res)
        })
    }, [])

    return (
        <div className='flex py-32 justify-center flex-col items-center w-full p-2 mt-8'>
            <div>
                <h1 className='text-tertiary'>Welcome to Vibe Events</h1>
                <p className='text-base'>
                    We display all the current events happening around
                    Stockholm. See anything interesting? Do not forget to sign up for the event in time!
                </p>
                <div className='flex justify-center items-center mt-8'>
                    <Image
                        src={img}
                        width={500}
                        height={500}
                        alt='Placeholder image'
                    />
                </div>
            </div>
            <div className='flex mt-20 space-x-5'>
                <button className="flex gap-3 items-center" onClick={onSort}>
                    {<FontAwesomeIcon icon={inc ? faSortUp : faSortDown} />} Sort by availability
                </button>
                <input type="text" value={searchValue} onChange={onSearch} className='text-black ' placeholder='Search for an event...' />
            </div>
            <p className='flex text-lg mt-8 justify-center items-center'>
                Check out the current events!
            </p>
            <div className='p-2 flex gap-4 mt-2 cursor-pointer'>
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
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default LandingPage;

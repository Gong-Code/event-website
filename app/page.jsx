'use client'

import Image from 'next/image';
import { Event } from './(root)/_components/event';
import { useState } from 'react';

const img = '/assets/placeholder.jpg';
const list = [
    {
        name: 'International Soup day',
        img,
        address: 'Earth',
        date: '24-05-22 17.00',
        numberOfPlaces: 15,
        users: ['dinomon'],
        id: 'abc',
        maxUsers: 15
    },
    {
        name: 'Opera in Hagaparken',
        img,
        address: 'Earth',
        date: '24-06-23 17.00',
        numberOfPlaces: 15,
        users: ['dinomon'],
        id: 'def',
        maxUsers: 30
    },
    {
        name: 'Våffeldagen',
        img,
        address: 'Earth',
        date: '24-07-25 17.00',
        numberOfPlaces: 5,
        users: ['dinomon'],
        id: 'ghi',
        maxUsers: 25
    },
];

const LandingPage = () => {
    const [searchValue, setSearchValue] = useState('')
    const [eventList, setEventList] = useState(list)
    const [inc, setInc] = useState(true)

    const onSearch = (e) => {
        setSearchValue(e.target.value)
        const newList = list.filter(x => x.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setEventList(newList)
    }

    const onSort = () => {
        if(inc) {
            const newList = list.sort((a, b) => a.numberOfPlaces - b.numberOfPlaces)
            setEventList(newList)
            setInc(false)
        } else {
            const newList = list.sort((a, b) => b.numberOfPlaces - a.numberOfPlaces)
            setEventList(newList)
            setInc(true)
        }
    }

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
                <button onClick={onSort}>{inc ? 'inc' : 'dec'}</button>
                <input type="text" value={searchValue} onChange={onSearch} className='text-black ' placeholder='Search for an event...' />
            </div>
            <p className='flex text-lg mt-8 justify-center items-center'>
                Check out the current events!
            </p>
            <div className='p-2 flex gap-4 mt-2'>
                {eventList.map((item, i) => {
                    return (
                        <Event
                            name={item.name}
                            key={i}
                            img={img}
                            address={item.address}
                            date={item.date}
                            numberOfPlaces={item.numberOfPlaces}
                            users={item.users}
                            id={item.id}
                            maxUsers={item.maxUsers}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default LandingPage;

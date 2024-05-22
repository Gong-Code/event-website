'use client';

import { createContext, useContext, useState } from 'react';
import { useEvents } from '../admin/_components/events-provider';
import { useAuth } from '../admin/_components/auth-provider';
import { useParams } from 'next/navigation';
import { bookEvent } from '@/app/lib/event.db';

export const UsersContext = createContext();

const UsersContextProvider = ({ children }) => {
    const [inc, setInc] = useState(true);
    const [eventList, setEventList] = useState([]);
    const [eventListOriginal, setEventListOriginal] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const { event, setEvent } = useEvents();
    const { user } = useAuth();
    const { id } = useParams();

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

    const numberOfBookedUsers =
        event && event.bookedUsers ? event.bookedUsers.length : 0;

    const isMaxUsers =
        event && Number(numberOfBookedUsers) === Number(event.numberOfSpots);

    const bookEventFunction = () => {
        if (
            isMaxUsers ||
            (event &&
                event.bookedUsers &&
                event.bookedUsers.includes(user?.uid))
        )
            return;
        bookEvent(user?.uid, id).then(() => {
            setEvent((prevState) => ({
                ...prevState,
                bookedUsers: [...(prevState.bookedUsers || []), user?.uid],
            }));
        });
    };

    const value = {
        onSearch,
        onSort,
        inc,
        searchValue,
        eventList,
        setEventList,
        setEventListOriginal,
        bookEventFunction,
        isMaxUsers,
        numberOfBookedUsers,
    };

    return (
        <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
    );
};

export default UsersContextProvider;

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context)
        throw new Error('useUsers must be used within an UsersContextProvider');
    return context;
};

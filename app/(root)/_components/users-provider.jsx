'use client';

import { createContext, useContext, useState } from 'react';
import { useEvents } from './events-provider';
import { useAuth } from '../admin/_components/auth-provider';
import { useParams } from 'next/navigation';
import { bookEvent, undoBookedEvent } from '@/app/lib/event.db';
import toast from 'react-hot-toast';

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

    const currentlyBookedUsers =
        event && event.bookedUsers ? event.bookedUsers : [];

    const numberOfBookedUsers =
        event && event.bookedUsers ? event.bookedUsers.length : 0;

    const isMaxUsers =
        event && Number(numberOfBookedUsers) === Number(event.numberOfSpots);

    const hasBooked =
        event &&
        event.bookedUsers &&
        event.bookedUsers.some((u) => u.id === user?.uid);

    const bookEventFunction = () => {
        if (isMaxUsers || hasBooked) return;

        if (!user || !user.uid) {
            toast.error('You need to be logged in to book an event.');
            return;
        }

        bookEvent(user?.uid, user?.email, id)
            .then(() => {
                setEvent((prevState) => ({
                    ...prevState,
                    bookedUsers: [
                        ...currentlyBookedUsers,
                        { id: user?.uid, email: user?.email },
                    ],
                }));
                toast.success('Event booked successfully!');
            })
            .catch(() => {
                toast.error('Failed to book event, please try again.');
            });
    };

    const undoBookedEventFunction = () => {
        if (!currentlyBookedUsers) return;
        undoBookedEvent(user?.uid, id)
            .then(() => {
                setEvent((prevState) => ({
                    ...prevState,
                    bookedUsers: currentlyBookedUsers.filter(
                        (x) => x.id !== user?.uid
                    ),
                }));
                toast.success('Event booking undone successfully!');
            })
            .catch(() => {
                toast.error('Failed to undo booking, please try again.');
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
        hasBooked,
        undoBookedEventFunction,
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

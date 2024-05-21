'use client';

import { getAllEvents } from '@/app/lib/event.db';
import { createContext, useContext, useEffect, useState } from 'react';

export const EventsContext = createContext();

const EventsContextProvider = ({ children }) => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        let isMounted = true

        const fetchEvents = async () => {
            const fetchedEvents = await getAllEvents();
            setEvents(fetchedEvents);
        };
        fetchEvents();


        return () => {
            isMounted = false;
        }
    }, []);    


    const value = {
        events,
        setEvents
    };

    return (
        <EventsContext.Provider value={value}>
            {children}
        </EventsContext.Provider>
    );
};

export default EventsContextProvider;

export const useEvents = () => {
    const context = useContext(EventsContext);
    if (!context)
        throw new Error('useEvents must be used within an EventsContextProvider');
    return context;
};

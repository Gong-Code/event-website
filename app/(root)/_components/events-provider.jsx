'use client';

import { getAllEvents } from '@/app/lib/event.db';
import { createContext, useContext, useEffect, useState } from 'react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebase.config';
import toast from 'react-hot-toast';

export const EventsContext = createContext();

const EventsContextProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [event, setEvent] = useState(null);

    // Function for fetching events

    const fetchEvents = async () => {
        try {
            const fetchedEvents = await getAllEvents();
            setEvents(fetchedEvents);
        } catch (error) {
            console.error('Could not fetch events:', error.message);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // If event is null, initialFormData will be an object with all properties set to their default values. If event is not null, initialFormData will be an object with properties set to the values of event properties, or their default values if the event properties are undefined.

    const initialFormData = event
        ? {
              name: event.name || '',
              location: event.location || '',
              date: event.date || '',
              numberOfSpots: event.numberOfSpots || 0,
              description: event.description || '',
              image: event.image || '',
          }
        : {
              name: '',
              location: '',
              date: '',
              numberOfSpots: 0,
              description: '',
              image: '',
          };

    const [formData, setFormData] = useState(initialFormData);
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;
        if (name === 'date') {
            let date = new Date(value);
            formattedValue = date
                .toLocaleString('sv-SE', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                })
                .replace(',', '');
        }

        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: formattedValue,
        }));
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            const toastId = toast.loading('Uploading file...');

            reader.onabort = () => toast.error('File reading was aborted');
            reader.onerror = () => toast.error('File reading has failed');

            reader.onload = async () => {
                try {
                    if (reader.readyState === 2) {
                        setImage(file);
                    } else {
                        setImage(null);
                    }

                    const fileRef = ref(storage, `events/${formData.name}`);
                    await uploadBytes(fileRef, file);
                    const downloadURL = await getDownloadURL(fileRef);

                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        coverPhoto: file,
                        image: downloadURL,
                    }));

                    toast.success('File uploaded successfully!', {
                        id: toastId,
                    });
                } catch (error) {
                    let errorMessage =
                        'Failed to upload file, please try again.';

                    if (error.code === 'storage/unauthorized') {
                        errorMessage =
                            'You do not have permission to upload this file.';
                    } else if (error.code === 'storage/canceled') {
                        errorMessage = 'File upload was canceled.';
                    }

                    toast.error(errorMessage, {
                        id: toastId,
                    });
                }
            };

            reader.readAsArrayBuffer(file);
        }
    };

    const value = {
        events,
        setEvents,
        event,
        setEvent,
        handleChange,
        handleFileChange,
        image,
        formData,
        setFormData,
        initialFormData,
        fetchEvents
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
        throw new Error(
            'useEvents must be used within an EventsContextProvider'
        );
    return context;
};

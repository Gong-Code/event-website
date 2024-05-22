'use client';

import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from '../_components/auth-provider';

import { FaCheckCircle } from 'react-icons/fa';

import { addNewEvent } from '@/app/lib/event.db';
import { useRouter } from 'next/navigation';

import withAdminAuth from '@/app/hoc/withAdminAuth';

const CreateNewEventPage = () => {

    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { formData, initialFormData, setFormData, handleChange, handleFileChange, image } = useEvents()


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await addNewEvent(user, formData, initialFormData, setFormData);

            toast.success('Event created successfully!');
            setFormData(initialFormData);

            router.push('/admin');
        } catch (error) {
            toast.error('Failed to create event, please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='my-10 flex flex-col justify-center'>
            <form
                onSubmit={handleSubmit}
                className='bg-primary rounded-3xl p-12 mx-4 md:mx-20 lg:mx-64'>
                <div className='space-y-12'>
                    <div className='pb-12'>
                        <h2 className='text-base font-semibold leading-7 text-gray-900'>
                            Add new event
                        </h2>
                        <p className='mt-1 text-sm leading-6 text-gray-600'>
                            Please fill in the relevant information for the
                            event.
                        </p>

                        <div className='border-b border-gray-900/10 pb-12'>
                            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                <div className='sm:col-span-3'>
                                    <label
                                        htmlFor='event-name'
                                        className='block text-sm font-medium leading-6 text-gray-900'>
                                        Event name
                                    </label>
                                    <div className='mt-2'>
                                        <input
                                            type='text'
                                            name='name'
                                            id='event-name'
                                            value={formData.name}
                                            onChange={handleChange}
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6'
                                        />
                                    </div>
                                </div>

                                <div className='sm:col-span-3'>
                                    <label
                                        htmlFor='location'
                                        className='block text-sm font-medium leading-6 text-gray-900'>
                                        Event location
                                    </label>
                                    <div className='mt-2'>
                                        <input
                                            type='text'
                                            name='location'
                                            id='location'
                                            value={formData.location}
                                            onChange={handleChange}
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6'
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            <div className='sm:col-span-3'>
                                <label
                                    htmlFor='dateandtime'
                                    className='block text-sm font-medium leading-6 text-gray-900'>
                                    Pick a time and date
                                </label>
                                <div className='mt-2'>
                                    <div className='flex sm:max-w-md'>
                                        <input
                                            id='dateandtime'
                                            name='date'
                                            aria-label='Date and time'
                                            type='datetime-local'
                                            value={formData.date}
                                            onChange={handleChange}
                                            className='block flex-1 border-0 bg-white py-1.5 pl-3 text-gray-900 focus:ring-2 sm:text-sm sm:leading-6 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='sm:col-span-3'>
                                <label
                                    htmlFor='attendees'
                                    className='block text-sm font-medium leading-6 text-gray-900'>
                                    Maximum number of attendees
                                </label>
                                <div className='mt-2'>
                                    <div className='flex sm:max-w-md'>
                                        <input
                                            id='attendees'
                                            name='numberOfSpots'
                                            aria-label='attendees'
                                            type='number'
                                            value={formData.numberOfSpots}
                                            onChange={handleChange}
                                            className='block flex-1 border-0 bg-white py-1.5 pl-3 text-gray-900 focus:ring-2 sm:text-sm sm:leading-6 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary'
                                            placeholder='100'
                                            min={1}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='col-span-full'>
                                <label
                                    htmlFor='event-description'
                                    className='block text-sm font-medium leading-6 text-gray-900'>
                                    Event description
                                </label>
                                <div className='mt-2'>
                                    <textarea
                                        id='event-description'
                                        name='description'
                                        rows={3}
                                        value={formData.description}
                                        onChange={handleChange}
                                        className='block w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6'
                                    />
                                </div>
                            </div>

                            <div className='col-span-full'>
                                <label
                                    htmlFor='cover-photo'
                                    className='block text-sm font-medium leading-6 text-gray-900'>
                                    Event cover photo
                                </label>
                                <div
                                    className={`mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-900/25 px-6 py-10 ${
                                        image && 'hidden'
                                    }`}>
                                    <div className='text-center'>
                                        <PhotoIcon
                                            className='mx-auto h-12 w-12 text-gray-300 transition duration-550 hover:text-gray-500'
                                            aria-hidden='true'
                                        />
                                        <div className='mt-4 flex items-center text-sm leading-6 text-gray-600'>
                                            <label
                                                htmlFor='file-upload'
                                                className='relative cursor-pointer rounded-md font-semibold text-tertiary focus-within:outline-none focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 hover:opacity-75'>
                                                <span>Upload a file</span>
                                                <input
                                                    id='file-upload'
                                                    name='file-upload'
                                                    type='file'
                                                    className='sr-only'
                                                    onChange={handleFileChange}
                                                />
                                            </label>
                                            <p className='pl-1'>
                                                or drag and drop
                                            </p>
                                        </div>
                                        <p className='text-xs leading-5 text-gray-600'>
                                            PNG, JPG, GIF up to 10MB
                                        </p>
                                    </div>
                                </div>
                                {image && (
                                    <div className='mt-2 flex items-center gap-2 text-green-900 font-semibold'>
                                        <span>
                                            <FaCheckCircle />
                                        </span>
                                        <p>Image uploaded!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-6 flex items-center justify-end gap-x-6'>
                    <button type='submit'>Create event</button>
                </div>
            </form>
        </main>
    );
};

export default withAdminAuth(CreateNewEventPage);

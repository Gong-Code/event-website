'use client';

import { Fragment, useRef, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogPanel,
    Transition,
    TransitionChild,
} from '@headlessui/react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { updateEventById } from '@/app/lib/database';
import toast from 'react-hot-toast';
import { useParams } from 'next/navigation';

export const UpdateEventDialog = ({ isOpen, onClose, event }) => {
    const initialFormData = {
        name: event.name,
        location: event.location,
        date: event.date,
        numberOfSpots: event.numberOfSpots,
        description: event.description,
        image: event.image
    }
    const [formData, setFormData] = useState(initialFormData);
    const cancelButtonRef = useRef(null);
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        console.log(formData); // Check if formData is being updated correctly
    
        try {
            await updateEventById(id, formData);
            console.log(id, formData); // Check if updateEventById is being called correctly
    
            toast.success('Event updated successfully!');
            onClose();
        } catch (error) {
            console.error(error); // Log any errors
            toast.error('Failed to update event, please try again.');
        }
    };

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

    return (
        <Transition
            show={isOpen}
            as={Fragment}>
            <Dialog
                className='relative z-10'
                initialFocus={cancelButtonRef}
                onClose={onClose}>
                <TransitionChild
                    as={Fragment}
                    enter='ease-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in duration-200'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'>
                    <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
                </TransitionChild>

                <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
                    <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
                        <TransitionChild
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                            enterTo='opacity-100 translate-y-0 sm:scale-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'>
                            <DialogPanel className='relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'>
                                <div className='flex flex-col sm:items-start'>
                                    <div className='bg-gray-50 px-6 py-4 min-w-[400px] flex'>
                                        <DialogTitle
                                            as='h3'
                                            className='text-base font-semibold leading-6 text-gray-900'>
                                            Update event details
                                        </DialogTitle>
                                    </div>
                                    <div className='bg-white px-2'>
                                        <div className='text-center sm:ml-4 sm:text-left'>
                                            <form onSubmit={handleSubmit}>
                                                <div className='space-y-2'>
                                                    <div className='pb-12'>
                                                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6'>
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
                                                                        // placeholder={
                                                                        //     event.name
                                                                        // }
                                                                        value={
                                                                            formData.name
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6'
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className='sm:col-span-3'>
                                                                <label
                                                                    htmlFor='location'
                                                                    className='block text-sm font-medium leading-6 text-gray-900'>
                                                                    Event
                                                                    location
                                                                </label>
                                                                <div className='mt-2'>
                                                                    <input
                                                                        type='text'
                                                                        name='location'
                                                                        id='location'
                                                                        // placeholder={
                                                                        //     event.location
                                                                        // }
                                                                        value={
                                                                            formData.location
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6'
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                                                            <div className='sm:col-span-3'>
                                                                <label
                                                                    htmlFor='dateandtime'
                                                                    className='block text-sm font-medium leading-6 text-gray-900'>
                                                                    Pick a time
                                                                    and date
                                                                </label>
                                                                <div className='mt-2'>
                                                                    <div className='flex sm:max-w-md'>
                                                                        <input
                                                                            id='dateandtime'
                                                                            name='date'
                                                                            aria-label='Date and time'
                                                                            type='datetime-local'
                                                                            // placeholder={
                                                                            //     event.date
                                                                            // }
                                                                            value={
                                                                                formData.date
                                                                            }
                                                                            onChange={
                                                                                handleChange
                                                                            }
                                                                            className='block flex-1 border-0 bg-white py-1.5 pl-3 text-gray-900 focus:ring-2 sm:text-sm sm:leading-6 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary placeholder:text-gray-400'
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='sm:col-span-3'>
                                                                <label
                                                                    htmlFor='attendees'
                                                                    className='block text-sm font-medium leading-6 text-gray-900'>
                                                                    Maximum
                                                                    number of
                                                                    attendees
                                                                </label>
                                                                <div className='mt-2'>
                                                                    <div className='flex sm:max-w-md'>
                                                                        <input
                                                                            id='attendees'
                                                                            name='numberOfSpots'
                                                                            aria-label='attendees'
                                                                            type='number'
                                                                            // placeholder={
                                                                            //     event.numberOfSpots
                                                                            // }
                                                                            value={
                                                                                formData.numberOfSpots
                                                                            }
                                                                            onChange={
                                                                                handleChange
                                                                            }
                                                                            className='block flex-1 border-0 bg-white py-1.5 pl-3 text-gray-900 focus:ring-2 sm:text-sm sm:leading-6 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-secondary placeholder:text-gray-400'
                                                                            min={
                                                                                1
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className='col-span-full'>
                                                                <label
                                                                    htmlFor='event-description'
                                                                    className='block text-sm font-medium leading-6 text-gray-900'>
                                                                    Event
                                                                    description
                                                                </label>
                                                                <div className='mt-2'>
                                                                    <textarea
                                                                        id='event-description'
                                                                        name='description'
                                                                        rows={3}
                                                                        // placeholder={
                                                                        //     event.description
                                                                        // }
                                                                        value={
                                                                            formData.description
                                                                        }
                                                                        onChange={
                                                                            handleChange
                                                                        }
                                                                        className='block w-full rounded-md bg-white border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-secondary sm:text-sm sm:leading-6'
                                                                    />
                                                                </div>
                                                            </div>

                                                            <div className='col-span-full'>
                                                                <label
                                                                    htmlFor='cover-photo'
                                                                    className='block text-sm font-medium leading-6 text-gray-900'>
                                                                    Event cover
                                                                    photo
                                                                </label>
                                                                <div className='mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-900/25 px-4 py-4'>
                                                                    <div className='text-center'>
                                                                        <PhotoIcon
                                                                            className='mx-auto size-6 text-gray-300 transition duration-550 hover:text-gray-500'
                                                                            aria-hidden='true'
                                                                        />
                                                                        <div className=' flex items-center text-sm text-gray-600'>
                                                                            <label
                                                                                htmlFor='file-upload'
                                                                                className='relative cursor-pointer rounded-md font-semibold text-tertiary focus-within:outline-none focus-within:ring-2 focus-within:ring-secondary focus-within:ring-offset-2 hover:opacity-75'>
                                                                                <span>
                                                                                    Upload
                                                                                    a
                                                                                    file
                                                                                </span>
                                                                                <input
                                                                                    id='file-upload'
                                                                                    name='file-upload'
                                                                                    type='file'
                                                                                    className='sr-only'
                                                                                    // onChange={
                                                                                    //     handleFileChange
                                                                                    // }
                                                                                />
                                                                            </label>
                                                                            <p className='pl-1'>
                                                                                or
                                                                                drag
                                                                                and
                                                                                drop
                                                                            </p>
                                                                        </div>
                                                                        <p className='my-0 text-xs text-gray-600'>
                                                                            PNG,
                                                                            JPG,
                                                                            GIF
                                                                            up
                                                                            to
                                                                            10MB
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className='bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                                    <button
                                        type='submit'
                                        className='w-full justify-center px-3 py-2 sm:ml-3 sm:w-auto'>
                                        Update
                                    </button>
                                    <button
                                        type='button'
                                        className='mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                                        onClick={onClose}
                                        ref={cancelButtonRef}>
                                        Cancel
                                    </button>
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

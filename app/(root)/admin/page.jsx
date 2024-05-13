'use client';

import { EventsList } from './_components/EventsList';

import { FaPlus } from "react-icons/fa";

const AdminPage = () => {
    return (
        <>
            <header className='bg-primary shadow'>
                <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl font-bold tracking-tight text-tertiary'>
                        Dashboard
                    </h1>
                </div>
            </header>
            <main className='my-10 flex flex-col justify-center'>
                <div className='flex justify-between px-8 py-6 lg:px-36'>
                    <h2>
                        All events
                    </h2>
                    <button className="flex items-center gap-2"><span>Add new</span><FaPlus /></button>
                </div>
                <EventsList />
            </main>
        </>
    );
};
export default AdminPage;

'use client';

import Navbar from '../_components/navbar';
import { EventsList } from './_components/EventsList';



const AdminPage = () => {
    

    return (
        <>
            <Navbar />
            <header className='bg-primary shadow-md shadow-secondary'>
                <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                        Dashboard
                    </h1>
                </div>
            </header>
            <main className='mt-40 flex justify-center'>
                <EventsList />
            </main>
        </>
    );
};
export default AdminPage;


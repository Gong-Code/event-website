'use client';

import { EventsList } from './_components/EventsList';
import { useClerk } from '@clerk/clerk-react';


const AdminPage = () => {
    const { signOut } = useClerk();

    return (
        <>
            <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-end'>
                    <button onClick={signOut}>Log out</button>
                </div>
            </nav>
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


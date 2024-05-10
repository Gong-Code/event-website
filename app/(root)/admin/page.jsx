'use client';

import Navbar from '../_components/navbar';
import { EventsList } from './_components/EventsList';



const AdminPage = () => {
    

    return (
        <>
            <Navbar />
            <header className='bg-primary shadow'>
                <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl font-bold tracking-tight text-tertiary'>
                        Dashboard
                    </h1>
                </div>
            </header>
            <main className='my-10 flex flex-col justify-center'>
              <h2 className="flex max-w-7xl px-4 py-6 sm:px-6 lg:px-8">All events</h2>
                <EventsList />
            </main>
        </>
    );
};
export default AdminPage;


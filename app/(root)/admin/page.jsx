'use client';


import { EventsList } from './_components/EventsList';

import { FaPlus } from "react-icons/fa";
import { useAuth } from './_components/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';



const AdminPage = () => {

    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/sign-in');     
        } 
            
    }, [user, router]);
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

'use client';

import Link from 'next/link';
import SignInForm from '../../_components/sign-in-form';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/app/(root)/admin/_components/auth-provider';

export default function SignInPage() {
    const { user, isAdmin } = useAuth();
    const router = useRouter();

    useEffect(() => {
        
        if (user && !isAdmin) {
            console.log('is user');
            router.push('/');
        } else if (isAdmin){
            console.log('is admin');
        }
    }, [user, isAdmin, router]);

    return (
        <div className='flex min-h-full my-10 flex-1 flex-col justify-center bg-primary rounded-3xl p-12 mx-4 md:mx-20 lg:mx-64'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900'>
                    Sign in to your account
                </h2>
            </div>
            <SignInForm />
            <p className='mt-10 text-center text-sm text-gray-500'>
                Don{"'"}t have an account?{' '}
                <Link
                    className='font-semibold leading-6 text-tertiary hover:opacity-75'
                    href='/sign-in'>
                    {' '}
                    Register
                </Link>
            </p>
        </div>
    );
}


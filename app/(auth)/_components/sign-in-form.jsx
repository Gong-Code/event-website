'use client';

import { useAuth } from '@/app/(root)/admin/_components/auth-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdErrorOutline } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
    email: z.string().email({ message: 'You need to enter a valid email' }),
    password: z.string().min(1, { message: 'You need to enter a password' }),
});

const SignInForm = () => {
    const { login } = useAuth();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    function onSubmit(values) {
        login(values);
        router.push('/');
    }

    return (
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
            <form
                className='space-y-6'
                onSubmit={form.handleSubmit(onSubmit)}>
                {/* Email input */}
                <div>
                    <label
                        htmlFor='email'
                        className='block text-sm font-medium leading-6 text-gray-900'>
                        Email address
                    </label>
                    <div className='mt-2'>
                        <input
                            id='email'
                            name='email'
                            type='email'
                            {...form.register('email')}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiary sm:text-sm sm:leading-6'
                        />
                        {form.formState.errors.email && (
                            <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                                <MdErrorOutline />
                                <span className='text-xs'>
                                    {form.formState.errors.email.message}
                                </span>
                            </span>
                        )}
                    </div>
                </div>

                {/* Password input */}
                <div>
                    <div className='flex items-center justify-between'>
                        <label
                            htmlFor='password'
                            className='block text-sm font-medium leading-6 text-gray-900'>
                            Password
                        </label>
                    </div>
                    <div className='mt-2'>
                        <input
                            id='password'
                            name='password'
                            type='password'
                            {...form.register('password')}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiary sm:text-sm sm:leading-6'
                        />
                        {form.formState.errors.password && (
                            <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                                <MdErrorOutline />
                                <span className='text-xs'>
                                    {form.formState.errors.password.message}
                                </span>
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <button
                        type='submit'
                        className='flex w-full justify-center rounded-md bg-tertiary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary'>
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    );
};
export default SignInForm;

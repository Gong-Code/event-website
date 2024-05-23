'use client';

import { useAuth } from '@/app/(root)/admin/_components/auth-provider';
import { addNewUser } from '@/app/lib/user.db';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { MdErrorOutline } from 'react-icons/md';
import { z } from 'zod';

const formSchema = z
    .object({
        email: z.string().email({ message: 'You need to enter a valid email' }),
        firstName: z
            .string()
            .min(1, { message: 'You need to enter a first name' }),
        lastName: z
            .string()
            .min(1, { message: 'You need to enter a last name' }),
        password: z.string().min(6, {
            message: 'The password must be at least 6 characters long',
        }),
        confirmPassword: z.string(),
    })
    .refine(
        (values) => {
            return values.password === values.confirmPassword;
        },
        {
            message: 'Passwords must match',
            path: ['confirmPassword'],
        }
    );

const SignUpForm = () => {
    const { register } = useAuth();
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (values) => {
        try {
            const uid = await register(values);
            await addNewUser(
                {
                    name: `${values.firstName} ${values.lastName}`,
                    email: values.email,
                    password: values.password,
                },
                uid
            );
            router.push('/');
            console.log('User added successfully');
        } catch (error) {
            console.error('Could not add user to database!', error);
        }
    };

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
                                    {form.formState.errors.email?.message}
                                </span>
                            </span>
                        )}
                    </div>
                </div>

                {/* First name input */}
                <div>
                    <div className='flex items-center justify-between'>
                        <label
                            htmlFor='first-name'
                            className='block text-sm font-medium leading-6 text-gray-900'>
                            First name
                        </label>
                    </div>
                    <div className='mt-2'>
                        <input
                            id='first-name'
                            name='first-name'
                            type='text'
                            {...form.register('firstName')}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiary sm:text-sm sm:leading-6'
                        />
                        {form.formState.errors.firstName && (
                            <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                                <MdErrorOutline />
                                <span className='text-xs'>
                                    {form.formState.errors.email.message}
                                </span>
                            </span>
                        )}
                    </div>
                </div>

                {/* Last name input */}
                <div>
                    <div className='flex items-center justify-between'>
                        <label
                            htmlFor='last-name'
                            className='block text-sm font-medium leading-6 text-gray-900'>
                            Last name
                        </label>
                    </div>
                    <div className='mt-2'>
                        <input
                            id='last-name'
                            name='last-name'
                            type='text'
                            {...form.register('lastName')}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiary sm:text-sm sm:leading-6'
                        />
                        {form.formState.errors.lastName && (
                            <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                                <MdErrorOutline />
                                <span className='text-xs'>
                                    {form.formState.errors.lastName.message}
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

                {/* Confirm password input */}
                <div>
                    <div className='flex items-center justify-between'>
                        <label
                            htmlFor='confirm-password'
                            className='block text-sm font-medium leading-6 text-gray-900'>
                            Confirm password
                        </label>
                    </div>
                    <div className='mt-2'>
                        <input
                            id='confirm-password'
                            name='confirm-password'
                            type='password'
                            {...form.register('confirmPassword')}
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-tertiary sm:text-sm sm:leading-6'
                        />
                        {form.formState.errors.confirmPassword && (
                            <span className='text-error text-xs mt-[2px] flex gap-1 items-center'>
                                <MdErrorOutline />
                                <span className='text-xs'>
                                    {
                                        form.formState.errors.confirmPassword
                                            .message
                                    }
                                </span>
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <button
                        type='submit'
                        className='flex w-full justify-center rounded-md bg-tertiary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-tertiary'>
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    );
};
export default SignUpForm;

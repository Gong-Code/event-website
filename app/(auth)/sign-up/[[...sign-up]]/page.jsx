import Link from 'next/link';
import SignUpForm from '../../_components/sign-up-form';

export default function SignUpPage() {
    return (
        <div className='flex min-h-full my-10 flex-1 flex-col justify-center bg-primary rounded-3xl p-12 mx-4 md:mx-20 lg:mx-64'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <h2 className='mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900'>
                    Register account
                </h2>
            </div>
            <SignUpForm />
            <p className='mt-10 text-center text-sm text-gray-500'>
                Already have an account?{' '}
                <Link
                    className='font-semibold leading-6 text-tertiary hover:opacity-75'
                    href='/sign-in'>
                    {' '}
                    Login
                </Link>
            </p>
        </div>
    );
}

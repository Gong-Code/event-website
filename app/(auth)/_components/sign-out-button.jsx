'use client';

import { auth } from '@/firebase.config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

function SignOutButton({ onSignOut }) {
    const router = useRouter();

    const handleSignOut = async () => {
        await signOut(auth);
        if (onSignOut) {
            onSignOut();
            router.push('/');
        }
    };

    return (
        <div onClick={handleSignOut}>
            <button>Sign Out</button>
        </div>
    );
}
export default SignOutButton;

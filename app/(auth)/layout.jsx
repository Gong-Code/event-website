'use client'

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";


export default function AuthLayout({ children }) {

    const { user } = useUser();
    const router = useRouter();

    if (!user) {
        console.log('User is logged in');
        router.push('/admin');
    } else {
        router.push('/');
        console.log('User is not logged in');
    }

    return (
        <div>
            { children }
        </div>
        );
}

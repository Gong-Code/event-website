'use client'

import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function AuthLayout({ children }) {
    const { user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (isLoading && !user) {
            router.push('/');
        } 
    }, [user, isLoading, router]);

  
    return (
        <div>
            {children}
        </div>
    )
} 
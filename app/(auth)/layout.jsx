'use client'


import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "../(root)/admin/_components/auth-provider";


export default function AuthLayout({ children }) {
    const { user, authLoaded } = useAuth;
    const router = useRouter();

    useEffect(() => {
        if (authLoaded && !user) {
            router.push('/');
        } 
    }, [user, authLoaded, router]);

  
    return (
        <div className="flex items-center justify-center">
            {children}
        </div>
    )
} 
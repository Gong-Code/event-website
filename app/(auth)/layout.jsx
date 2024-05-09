'use client'


import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function AuthLayout({ children }) {

    
const { isSignedIn, user, isLoading } = useUser();
  const router = useRouter();
 
  useEffect(() => {
    if (!isLoading && !isSignedIn) {
      router.push('/');
    }
  }, [isSignedIn, isLoading, router]);

  if (isLoading) return null;;
  console.log(user)
   
    return (
        <div>
            
            { children }
        </div>
        );
}

import { useAuth } from "@/app/(root)/admin/_components/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from 'react';



const withAdminAuth = (WrappedComponent) => {
  return (props) => {
    const { user, isAdmin, authLoaded } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (authLoaded && (!user || !isAdmin)) {
        console.log('Not an admin or not logged in')
        router.push('/');
      }
    }, [user, isAdmin, authLoaded, router]);

    if (!authLoaded) {
      return <p>Loading...</p>;
    }

    // if (authLoaded && (user && !isAdmin)) {
    //   console.log('User is not an admin');
    //   router.push('/');
    //    // Returnerar null om användaren inte är admin
    // }

    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;

//GET funktion ska vara här, hämta alla event

import { useAuth } from '@/app/(root)/admin/_components/auth-provider';
import { db } from '@/firebase.config';
import {
    collection,
    getDocs,
} from 'firebase/firestore';

export const getAllEvents = async (userId) => {
    

    if (!userId) {
        
        console.log('userId is undefined');
        return [];
    }
    console.log('userId', userId);
    let events = [];
    
    try {
        const querySnapshot = await getDocs(collection(db, 'events','users', userId));
        
        querySnapshot.forEach((doc) => {
    
            events.push({ id: doc.id, ...doc.data() });
        });
        
        return events;
    } catch (error) {
        console.log('Could not fetch collection:', error.message);
    }
};


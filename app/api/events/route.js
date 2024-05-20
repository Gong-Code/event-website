//GET funktion ska vara här, hämta alla event


import { db } from '@/firebase.config';
import { getAuth } from 'firebase/auth';
import {
    collection,
    getDocs,
} from 'firebase/firestore';

export const getAllEvents = async () => {
    
  
    let events = [];
    
    try {

        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
            throw new Error('User is not logged in');
        }

        const querySnapshot = await getDocs(collection(db, 'events', 'users', user.uid));
        
        querySnapshot.forEach((doc) => {
    
            events.push({ id: doc.id, ...doc.data() });
        });
        
        return events;
    } catch (error) {
        console.log('Could not fetch collection:', error.message);
    }
};


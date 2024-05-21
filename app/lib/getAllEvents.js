import { db } from '@/firebase.config';
import {
    collection,
    getDocs
} from 'firebase/firestore';

export const getAllEvents = async () => {
    let events = [];

    try {
        const querySnapshot = await getDocs(collection(db, 'events'));

        for (let docSnapshot of querySnapshot.docs) {
            let event = { id: docSnapshot.id, ...docSnapshot.data() };
            console.log(event)
            events.push(event);
        }

        return events;
    } catch (error) {
        console.error('Could not fetch collection:', error.message);
        return [];
    }
};
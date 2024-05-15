//POST ska vara här, skicka med user ID

import { db } from "@/firebase.config";
import { setDoc } from "firebase/firestore";

export const addNewEvent = async (inputValue) => {
    try {
        const id = uuid4();
        await setDoc(doc(db, 'events', id), {
            id: id,
            event: inputValue,
        });
    } catch (error) {
        console.log('Error adding event:', error.message);
    }
};
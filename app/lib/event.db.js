import { db } from '@/firebase.config';
import {
    collection,
    getDoc,
    getDocs,
    doc, 
    addDoc,
    setDoc,
    updateDoc
} from 'firebase/firestore';
import toast from "react-hot-toast";

export const getAllEvents = async () => {
    let events = [];

    try {
        const querySnapshot = await getDocs(collection(db, 'events'));

        for (let docSnapshot of querySnapshot.docs) {
            let event = { id: docSnapshot.id, ...docSnapshot.data() };
            events.push(event);
        }

        return events;
    } catch (error) {
        console.error('Could not fetch collection:', error.message);
        return [];
    }
};

export const getEventById = async (id) => {
    const docRef = doc(db, 'events', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    } else {
        console.log('No such document!');
        return null;
    }
};

export const addNewEvent = async (user, formData, initialFormData, setFormData) => {
    
    try {
        const docRef = await addDoc(collection(db, 'events'), {
            name: formData.name,
            location: formData.location,
            date: formData.date,
            numberOfSpots: formData.numberOfSpots,
            description: formData.description,
            image: formData.image,
            createdByUser: user.uid
        })

        await setDoc(docRef, {
            events: docRef.id,
            
        }, { merge: true });

        setFormData(initialFormData);
        
        
    } catch (error) {
        toast.error('Failed to create event, please try again.');
    } 
}

export const updateEventById = async (id, update) => {
    const docRef = doc(db, 'events', id);

    try {
        await updateDoc(docRef, update);
        console.log(`Event with ID ${id} has been updated.`);
    } catch (error) {
        console.error("Error updating event: ", error);
    }
};

export const bookEvent = async (userId, eventId) => {
    
    const docRef = doc(db, 'events', eventId);
    const currentlyBookedUsers = docRef.bookedUsers ? docRef.bookedUsers : [];

    const userIdArray = [userId]

    try {
        await updateDoc(docRef, {
            bookedUsers: [...currentlyBookedUsers, ...userIdArray]
        });
        
    } catch (error) {
        toast.error('Failed to book event, please try again.');
    } 
}

export const deleteEventById = (collection, id) => {
    const removedEvent = db.collection(collection).doc(id)
    removedEvent.delete().then(() => {
        console.log('Successfully deleted the event')
    }).catch((err) => {
        console.log('Something went wrong', err)
    })
}

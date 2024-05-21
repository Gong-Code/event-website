import { db } from '@/firebase.config';
import {
    collection,
    getDoc,
    getDocs,
    doc, 
    addDoc,
    setDoc
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

export default addNewEvent;

export const deleteByID = (collection, id) => {
    const removedEvent = db.collection(collection).doc(id)
    removedEvent.delete().then(() => {
        console.log('Successfully deleted the event')
    }).catch((err) => {
        console.log('Something went wrong', err)
    })
}

export const bookEvent = async (userId, eventId) => {
    
    try {
        const docRef = await addDoc(collection(db, 'bookedEvents', 'usersBookedEvents', userId), {
            eventId: eventId
        })

        await setDoc(docRef);

        console.log('docRef id', docRef.id);        
        
    } catch (error) {
        toast.error('Failed to book event, please try again.');
    } 
}


import { db } from '@/firebase.config';
import {
    collection,
    getDoc,
    getDocs,
    doc,
    addDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    arrayUnion,
} from 'firebase/firestore';
import toast from 'react-hot-toast';

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

export const addNewEvent = async (
    user,
    formData,
    initialFormData,
    setFormData
) => {
    try {
        const docRef = await addDoc(collection(db, 'events'), {
            name: formData.name,
            location: formData.location,
            date: formData.date,
            numberOfSpots: formData.numberOfSpots,
            description: formData.description,
            image: formData.image,
            createdByUser: user.uid,
        });

        await setDoc(
            docRef,
            {
                events: docRef.id,
            },
            { merge: true }
        );

        setFormData(initialFormData);
    } catch (error) {
        toast.error('Failed to create event, please try again.');
    }
};

export const updateEventById = async (id, update) => {
    const docRef = doc(db, 'events', id);

    try {
        await updateDoc(docRef, update);
        console.log(`Event with ID ${id} has been updated.`);
    } catch (error) {
        console.error('Error updating event: ', error);
    }
};

export const bookEvent = async (userId, userEmail, eventId) => {
    const docRef = doc(db, 'events', eventId);
    const docSnap = await getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            return doc.data();
        } else {
            console.log('No such document!');
        }
    });
    const currentlyBookedUsers = docSnap.bookedUsers ? docSnap.bookedUsers : [];

    try {
        await updateDoc(docRef, {
            bookedUsers: currentlyBookedUsers.concat([
                { id: userId, email: userEmail },
            ]),
        });
    } catch (error) {
        toast.error('Failed to book event, please try again.');
    }
};

export const undoBookedEvent = async (userId, eventId) => {
    const docRef = doc(db, 'events', eventId);
    const docSnap = await getDoc(docRef).then((doc) => {
        if (doc.exists()) {
            return doc.data();
        } else {
            console.log('No such document!');
        }
    });
    const currentlyBookedUsers = docSnap.bookedUsers ? docSnap.bookedUsers : [];

    try {
        await updateDoc(docRef, {
            bookedUsers: currentlyBookedUsers.filter((x) => x.id !== userId),
        });
    } catch (error) {
        toast.error('Failed to undo booking, please try again.');
    }
};

export const deleteEventById = async (collection, id) => {
    const docRef = doc(db, collection, id);

    try {
        await deleteDoc(docRef);
        console.log('Successfully deleted the event');
    } catch (err) {
        console.error('Something went wrong', err);
    }
};

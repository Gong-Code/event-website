import { db } from '@/firebase.config';
import { collection, getDocs, getDoc, addDoc, setDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

/*=====  HANDLE EVENTS  ======*/

//GET
export const getAllEvents = async () => {
    let events = [];

    try {
        const querySnapshot = await getDocs(collection(db, 'events'));

        for (let docSnapshot of querySnapshot.docs) {
            let event = { id: docSnapshot.id, ...docSnapshot.data() };
            console.log(event);
            events.push(event);
        }

        return events;
    } catch (error) {
        console.error('Could not fetch collection:', error.message);
        return [];
    }
};

//POST, skicka med user id
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
            user: user.uid,
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

export const bookEvent = async (userId, eventId) => {
    try {
        const docRef = await addDoc(
            collection(db, 'bookedEvents', 'usersBookedEvents', userId),
            {
                eventId: eventId,
            }
        );

        await setDoc(docRef);

        console.log('docRef id', docRef.id);
    } catch (error) {
        toast.error('Failed to book event, please try again.');
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

//PATCH BY ID

//DELETE BY ID
export const deleteByID = (collection, id) => {
    const removedEvent = db.collection(collection).doc(id);
    removedEvent
        .delete()
        .then(() => {
            console.log('Successfully deleted the event');
        })
        .catch((err) => {
            console.log('Something went wrong', err);
        });
    };


    /*=====  HANDLE USERS  ======*/
    
//GET, hämta all users
export const getAllUsers = async (userId) => {
    if (!userId) {
        return [];
    }
    console.log('userId', userId);
    let events = [];

    try {
        const querySnapshot = await getDocs(
            collection(db, 'events', 'users', userId)
        );

        querySnapshot.forEach((doc) => {
            events.push({ id: doc.id, ...doc.data() });
        });

        return events;
    } catch (error) {
        console.log('Could not fetch collection:', error.message);
    }
};

//GET BY ID
export const getUserById = async (userId) => {
    if (!user) {
        console.log('User is not logged in');
        return;
    }

    if (!userId) {
        console.log('Invalid userId');
        return;
    }

    try {
        const userDoc = await getDoc(doc(db, 'users', userId));

        if (userDoc.exists()) {
            return { id: userDoc.id, ...userDoc.data() };
        } else {
            console.log('No such user!');
        }
    } catch (error) {
        console.log('Could not fetch user:', error.message);
    }
};

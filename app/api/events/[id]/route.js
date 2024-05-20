import { getDoc, doc } from "firebase/firestore";

const { db } = require("@/firebase.config")

//GET BY ID, hämta en event via ID 
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

//PATCH by ID


//DELETE BY ID
export const deleteByID = (collection, id) => {
    const removedEvent = db.collection(collection).doc(id)
    removedEvent.delete().then(() => {
        console.log('Successfully deleted the event')
    }).catch((err) => {
        console.log('Something went wrong', err)
    })
}




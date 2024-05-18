import { db } from "@/firebase.config";
import { addDoc, collection, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";


const bookEvent = async (userId, eventId) => {
    
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

export default bookEvent;
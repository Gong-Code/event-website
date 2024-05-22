import { db } from '@/firebase.config';
import { setDoc, doc } from 'firebase/firestore';

// POST USER TO DATABASE
export const addNewUser = async (user, uid) => {
    try {
        await setDoc(doc(db, 'users', uid), {
            name: user.name,
            email: user.email,
            password: user.password,
            id: uid,
        });

        console.log('User added with ID: ', uid);
    } catch (error) {
        console.error('Failed to add user: ', error);
    }
};

import { db } from '@/firebase.config';
import { setDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';
import bcrypt from 'bcryptjs';



// POST USER TO DATABASE
export const addNewUser = async (user, uid) => {
    
    try {
        const salt = 10
        const hashedPassword = await bcrypt.hash(user.password, salt)

        await setDoc(doc(db, 'users', uid), {
            name: user.name,
            email: user.email,
            password: hashedPassword,
            id: uid,
        });

        console.log('User added with ID: ', uid);
    } catch (error) {
        console.error('Failed to add user: ', error);
    }
};

// upgrade user to admin
export async function upgradeToAdmin(userId) {
    try {
       
        const userDocRef = doc(db, 'users', userId);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
            console.error('User does not exist');
            return;
        }

        const adminDocRef = doc(db, 'admins', userId);
        await setDoc(adminDocRef, { ...userDocSnap.data(), admin: true });

        await deleteDoc(userDocRef);

        toast.success('User upgraded to admin successfully');
    } catch (error) {
        toast.error('Failed to upgrade user to admin:', error);
    }
}

// demote admin to user
    export async function demoteToUser(userId) {
    try {
        const adminDocRef = doc(db, 'admins', userId);
        const adminDocSnap = await getDoc(adminDocRef);

        if (!adminDocSnap.exists()) {
            console.error('Admin does not exist');
            return;
        }

        const userDocRef = doc(db, 'users', userId);
        await setDoc(userDocRef, { ...adminDocSnap.data(), admin: false });

        await deleteDoc(adminDocRef);

        toast.success('Admin demoted to user');
    } catch (error) {
        toast.error('Failed to demote admin');
    }
};
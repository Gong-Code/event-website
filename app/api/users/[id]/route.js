//GET user by ID, hämta en user.

import { db } from "@/firebase.config";

import { doc, getDoc } from "firebase/firestore"; 

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
}


//GET, hämta all users

//GET, hämta all users

export const getAllUsers = async (userId) => {
    

    if (!userId) {
        
       
        return [];
    }
    console.log('userId', userId);
    let events = [];
    
    try {
        const querySnapshot = await getDocs(collection(db, 'events','users', userId));
        
        querySnapshot.forEach((doc) => {
    
            events.push({ id: doc.id, ...doc.data() });
        });
        
        return events;
    } catch (error) {
        console.log('Could not fetch collection:', error.message);
    }
};
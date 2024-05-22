
import { NextResponse } from 'next/server';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase.config';


export async function GET(request) {
  try {
    const eventsCollection = collection(db, 'events');
    const eventsSnapshot = await getDocs(eventsCollection);

    let usersList = [];

    for (const eventDoc of eventsSnapshot.docs) {
      const usersCollection = collection(eventDoc.ref, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      
      const eventUsers = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), eventId: eventDoc.id }));
      usersList = usersList.concat(eventUsers);
    }

    return NextResponse.json(usersList, { status: 200 });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Error fetching users' }, { status: 500 });
  }
}

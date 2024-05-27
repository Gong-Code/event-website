// DELETE BOOKING

import { NextResponse } from 'next/server';
import { arrayRemove, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase.config';

export async function DELETE(request) {
    try {
        const { eventId, email, id } = await request.json();
        if (!eventId || !email || !id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const eventRef = doc(db, 'events', eventId);
        const userToRemove = { email, id };
        await updateDoc(eventRef, {
            bookedUsers: arrayRemove(userToRemove)
        });
        return NextResponse.json({ ...userToRemove }, { status: 200 });
    } catch (err) {
        console.log(err.message);
        return NextResponse.json({ error: 'Error deleting booking' }, { status: 500 });
    }
}
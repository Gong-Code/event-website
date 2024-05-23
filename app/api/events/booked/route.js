import { NextResponse } from 'next/server';
import { arrayUnion, updateDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase.config';

export async function POST(request) {
    try {
        const { eventId, email, id } = await request.json();
        if (!eventId ||  !email || !id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }
        const eventRef = doc(db, 'events', eventId);
        const newBooking = { email, id, bookedAt: new Date().toISOString() };
        await updateDoc(eventRef, {
            bookedUsers: arrayUnion(newBooking)
        });
        return NextResponse.json({ ...newBooking }, { status: 201 });
    } catch (err) {
        console.log(err.message)
        return NextResponse.json({ error: 'Error creating booking' }, { status: 500 });
    }
}



/*{
    "eventId": "JJmfRvRLrSFJvTkhVpMj",
    "bookedUsers": [
        {"userId": "StPAx83oa3XvKCPxklAQgAPFmOC2", "email": "devrimakb1@gmail.com"}
    ]

} */
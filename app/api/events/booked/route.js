import { NextResponse } from 'next/server';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/firebase.config';

export async function POST(request) {
  try {
    const { eventId, userId, userEmail } = await request.json();
    if (!eventId || !userId || !userEmail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const eventRef = collection(db, 'bookedEvents');
    const newBooking = {
      eventId,
      userId,
      userEmail,
      bookedAt: Timestamp.now(),
    };
    const bookingRef = await addDoc(eventRef, newBooking);
    return NextResponse.json({ id: bookingRef.id, ...newBooking }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Error creating booking' }, { status: 500 });
  }
}


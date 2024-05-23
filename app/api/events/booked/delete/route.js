// DELETE BOOKING

import { db } from "@/firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  try {
    const { eventId, userEmail, userId } = await request.json();
    if (!eventId || !userEmail|| !userId ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const bookingRef = doc(db, 'testBooked');
    await deleteDoc(bookingRef);
    return NextResponse.json({ id: userId, message: 'Booking deleted successfully' }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: 'Error deleting booking' }, { status: 500 });
  }
}
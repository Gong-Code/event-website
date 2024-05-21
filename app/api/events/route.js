//GET funktion ska vara här, hämta alla event
// INTE FLYTTA!
// get all events from db
import { db } from "@/firebase.config";
import { collection, getDocs } from "firebase/firestore";

export async function GET(req, res) {
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      const events = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return new Response(JSON.stringify(events), { status: 200 });
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
        status: 500,
      });
    }
  }

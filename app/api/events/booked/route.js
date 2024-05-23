import { db } from "@/firebase.config";
import { doc, updateDoc, arrayUnion} from "firebase/firestore";

export async function PATCH(req, res) {
    if (req.method === 'PATCH') {
        try {
            const { eventId, email, id } = req.body; // Extract eventId, email, and id from the request body
            if (!eventId || !email || !id) {
                throw new Error("Missing required parameters");
            }
            // Get reference to the event document
            const eventRef = doc(db, 'events', eventId);
            // Update the bookedUsers array in the event document
            await updateDoc(eventRef, {
                bookedUsers: firebase.firestore.FieldValue.arrayUnion({ email, id })
            });

            return new Response(JSON.stringify({ message: "User added to bookedUsers array" }), { status: 200 });
        } catch (err) {
            console.error("Error:", err);
            return new Response(JSON.stringify({ error: "Failed to update bookedUsers array" }), { status: 500 });
        }
    } else {
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 });
    }
}


/*{
    "eventId": "JJmfRvRLrSFJvTkhVpMj",
    "bookedUsers": [
        {"userId": "StPAx83oa3XvKCPxklAQgAPFmOC2", "email": "devrimakb1@gmail.com"}
    ]

} */
import React from 'react'
import Link from 'next/link'

const EventCard = ({ event }) => {

    return (
        <div>
            <h2>{event.name}</h2>
            <p>{event.id}</p>
            <p>Location: {event.location}</p>
            <p>Date: {event.date}</p>
            <p>Available spots: {event.numberOfSpots}</p>
            <Link href={`/admin/${event.id}`}>
                <button>Go to event details</button>
            </Link>
        </div>
    )
}

export default EventCard

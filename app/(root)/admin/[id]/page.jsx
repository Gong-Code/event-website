'use client'

import { getEventById } from "@/app/api/events/[id]/route";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image'


const ManageEventDetailPage = () => {
  const [event, setEvent] = useState(null);
  const { id } = useParams()

  useEffect(() => {
    const fetchEvent = async () => {
      const event = await getEventById(id)
      setEvent(event)
    }

    fetchEvent()
  }, [id])

    return (
        <div className='flex flex-col p-8 justify-center w-full items-center'>
            {event && (
                <div key={event.id}>
                  <p className='text-2xl'>{event.name}</p>
                  <Image
                    src={
                      event.image ||
                      '/assets/placeholder.jpg'
                    }
                            width={60}
                            height={60}
                            alt='event'
                        />
                        <p className='text-lg'>
                            <span className='font-bold'>Where?</span>{' '}
                            {event.location}
                        </p>
                        <p className='text-lg'>
                            <span className='font-bold'>When?</span>{' '}
                            {event.date}
                        </p>
                    </div>
                )}
        </div>
    );
};
export default ManageEventDetailPage;

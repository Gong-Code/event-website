// Lägg event details OCH möjlighet att redigera event här

'use client';

import Image from "next/image";
import { useEvents } from "../_components/events-provider";

const ManageEventDetailPage = () => {

  const { events } = useEvents()
  const { name, image, numberOfSpots, location, date } = events;

  return (
    <div className='flex flex-col p-8 justify-center w-full items-center'>
            <p className='text-2xl'>{name}</p>
            <Image
                src={image}
                width={500}
                height={500}
                alt='event'
            />
            <p className='text-lg'>
                <span className='font-bold'>Where?</span> {location}
            </p>
            <p className='text-lg'>
                <span className='font-bold'>When?</span> {date}
            </p>
            {/* <p className='text-lg'>
                Availability:{' '}
                <span className='font-bold'>{maxUsers - numberOfSpots}</span>{' '}
                places left
            </p>
            <button
                className={`text-lg mt-4 ${isMaxUsers ? 'opacity-50' : ''}`}>
                Book now!
            </button> */}
        </div>
  )
}
export default ManageEventDetailPage
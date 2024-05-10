import Image from 'next/image';
import { GoArrowRight } from "react-icons/go";

const events = [
    {
        name: 'Launchpad Premiere',
        date: 'June 1st',
        imageUrl: '/assets/placeholder.jpg'
    },
    {
        name: 'Skill Share Sessions',
        date: 'June 13th',
        imageUrl: '/assets/placeholder.jpg'
    },
    {
        name: 'Unity Escape',
        date: 'July 23rd',
        imageUrl: '/assets/placeholder.jpg'
    },
    {
        name: 'Team Thrive Retreat',
        date: 'August 12th',
        imageUrl: '/assets/placeholder.jpg'
    },
];

export const EventsList = () => {
    return (
        <div className='relative bg-primary py-2 rounded-3xl px-8 mx-4'>
            <ul
                role='list'
                className='divide-y divide-gray-300 mx-auto'>
                {events.map((event) => (
                    <li
                        key={event.date}
                        className='flex mx-auto justify-between max-w-7xl items-center'>
                        <div className='flex items-center gap-6'>
                            <Image
                                className='h-12 w-12 rounded-full bg-gray-50'
                                src={event.imageUrl}
                                alt=''
                                width={500}
                                height={500}
                            />
                            <div className='min-w-0 flex-auto'>
                                <p className='text-sm font-bold text-gray-900 border-b-2 border-b-tertiary'>
                                    {event.name}
                                </p>
                                <div className='flex gap-2 items-center my-3'>
                                    <span className='font-semibold text-gray-900 text-xs'>
                                        Date:{' '}
                                    </span>
                                    <span className='text-xs text-gray-500'>
                                        {event.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='shrink-0 flex flex-col items-end'>
                            <button className="readmore flex items-center gap-2"><span>Read more</span><GoArrowRight className="size-4 font-semibold"/></button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

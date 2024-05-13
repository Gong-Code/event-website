import Image from 'next/image';
import { Event } from './(root)/_components/event';

const LandingPage = () => {
    const img = '/assets/placeholder.jpg';
    const eventList = [
        {
            name: 'International Soup day',
            img,
            address: 'Earth',
            date: '24-05-22 17.00',
            numberOfPlaces: 5,
            users: ['dinomon'],
            id: 'abc'
        },
        {
            name: 'Opera in Hagaparken',
            img,
            address: 'Earth',
            date: '24-06-23 17.00',
            numberOfPlaces: 5,
            users: ['dinomon'],
            id: 'def'
        },
        {
            name: 'Våffeldagen',
            img,
            address: 'Earth',
            date: '24-07-25 17.00',
            numberOfPlaces: 5,
            users: ['dinomon'],
            id: 'ghi'
        },
    ];

    return (
        // Alva la till py-32 för att anpassa sidan till navbaren.
        <div className='flex py-32 justify-center flex-col items-center w-full p-2 mt-8'>
            <div>
                <h1>Welcome to (insert name here)</h1>
                <p>
                    We display all the current events happening around
                    Stockholm. See anything interesting? Do not forget to sign up for the event in time!
                </p>
                <div className='flex justify-center items center'>
                    <Image
                        src={img}
                        width={500}
                        height={500}
                        alt='Placeholder image'
                    />
                </div>
                <p className='flex text-xl mt-20 justify-center items-center'>
                    Check out the current events!
                </p>
            </div>
            <div className='border p-2 rounded border-green-400 flex gap-4 mt-5'>
                {eventList.map((item, i) => {
                    return (
                        <Event
                            name={item.name}
                            key={i}
                            img={img}
                            address={item.address}
                            date={item.date}
                            numberOfPlaces={item.numberOfPlaces}
                            users={item.users}
                            id={item.id}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default LandingPage;

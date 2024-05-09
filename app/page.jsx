import Image from 'next/image';
import { Event } from './(root)/_components/event';
import Navbar from './(root)/_components/navbar';
import { placeholder } from '../public/assets/placeholder.jpg'

const LandingPage = () => {
    const img = placeholder;
    const list = [
        {
            name: 'International Soup day',
            img,
        },
        {
            name: 'Opera in Hagaparken',
            img,
        },
        {
            name: 'Våffeldagen',
            img,
        },
    ];

    return (
        <div className='flex justify-center flex-col items-center w-full p-2 mt-8'>
            <Navbar />
            <div className=''>
                <h1>Welcome to (insert name here)</h1>
                <p>
                    We display all the current events happening around
                    Stockholm. See anything interesting? Don`&apos`t forget to
                    sign up for the event in time!
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
                {list.map((item, i) => {
                    return (
                        <Event
                            name={item.name}
                            img={item.img}
                            key={i}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default LandingPage;

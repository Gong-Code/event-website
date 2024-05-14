'use client'

import Image from 'next/image';
import { GoArrowRight } from "react-icons/go";

export const UsersList = () => {

    return (
        <div className='relative bg-primary rounded-3xl py-4 px-12'>
            <ul
                role='list'
                className='divide-y divide-gray-300 mx-auto'>
                {/* {users && users.length ? users.map((user) => (
                    <li
                        key={user.date}
                        className='flex mx-auto justify-between max-w-7xl items-center'>
                        <div className='flex items-center gap-6'>
                            <Image
                                className='h-12 w-12 rounded-full bg-gray-50'
                                src={user.imageUrl}
                                alt=''
                                width={500}
                                height={500}
                            />
                            <div className='min-w-0 flex-auto'>
                                <p className='text-sm font-bold text-gray-900 border-b-2 border-b-tertiary'>
                                    {user.name}
                                </p>
                                <div className='flex gap-2 items-center my-3'>
                                    <span className='font-semibold text-gray-900 text-xs'>
                                        Date:{' '}
                                    </span>
                                    <span className='text-xs text-gray-500'>
                                        {user.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='shrink-0 flex flex-col items-end'>
                            <button className="readmore flex items-center gap-2"><span>Read more</span><GoArrowRight className="size-4 font-semibold"/></button>
                        </div>
                    </li>
                )) : ( */}
                    <div className='flex justify-center items-center my-2'>
                        <p className='text-secondary font-semibold'>No users found! </p>
                    </div>
                {/* )} */}
            </ul>
        </div>
    );
};

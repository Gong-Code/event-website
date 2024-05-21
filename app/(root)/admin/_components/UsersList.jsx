'use client';

import { collection, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";


export const UsersList = () => {

    const fetchUsers = async () => {
        const db = getFirestore();
        const usersCol = collection(db, "users");
        const userSnapshot = await getDocs(usersCol);
        const userList = userSnapshot.docs.map(doc => doc.data());
        console.log('userList', userList);
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    return (

        <div>
            
        </div>
        // <div className='bg-primary rounded-xl border-b border-gray-900/10 shadow-sm overflow-x-auto'>
        //     {/* {user && user.length ? (
        //         <table className='text-slate-900 w-full table-auto'>
        //             <thead className='border-b border-gray-900/10 pb-12'>
        //                 <tr>
        //                     <th className='flex p-4 font-semibold text-sm '>
        //                         Users
        //                     </th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 {user.map((user) => (
        //                     <tr
        //                         key={user.uid}
        //                         className='border-b border-gray-900/10 last:border-0'>
        //                         <td className='px-4 py-2 text-left text-sm font-medium text-ellipsis overflow-hidden'>
        //                             {user.uid}
        //                         </td>
        //                     </tr>
        //                 ))}
        //             </tbody>
        //         </table>
        //     ) : (
        //         <div className='flex justify-center items-center my-2'>
        //             <p className='text-secondary font-semibold'>
        //                 No users found!
        //             </p>
        //         </div>
        //     )} */}
        // </div>
    );
};

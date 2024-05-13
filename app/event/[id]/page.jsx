'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const searchParams = useSearchParams()
  const name = searchParams.get('name')
  const img = searchParams.get('img')
  const address = searchParams.get('address')
  const date = searchParams.get('date')
  const numberOfPlaces = searchParams.get('numberOfPlaces')
  const maxUsers = searchParams.get('maxUsers')

  const isMaxUsers = Number(numberOfPlaces) === Number(maxUsers)

  return (
    <div className='flex flex-col p-8 justify-center w-full items-center'>
      <p className='text-2xl'>{name}</p>
      <img src={img} width={500} height={500} />
      <p className='text-lg'><span className='font-bold'>Where?</span> {address}</p>
      <p className='text-lg'><span className='font-bold'>When?</span> {date}</p>
      <p className='text-lg'>Availability: <span className='font-bold'>{maxUsers - numberOfPlaces}</span> places left</p>
      <button className={`text-lg mt-4 ${isMaxUsers ? 'opacity-50' : ''}`}>Book now!</button>
    </div>
  )
}

export default page
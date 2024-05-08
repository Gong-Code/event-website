import React from 'react'

export const EventComponent = ({name, img}) => {
  return (
    <div className='border p-2 rounded border-green-400'>
        {name}
        <img src={img} />
    </div>
  )
}
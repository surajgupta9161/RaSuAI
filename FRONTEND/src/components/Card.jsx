import React from 'react'

const Card = ({ image }) => {
    return (
        <div className='w-17.5 h-35 lg:w-37.5 lg:h-62.5 bg-[#030326] border-2  border-[#23238b68] rounded-2xl overflow-hidden cursor-pointer hover:border-white hover:shadow-2xl hover:shadow-blue-500 active:scale-95'>
            <img src={image} className='h-full object-cover ' />
        </div>
    )
}

export default Card

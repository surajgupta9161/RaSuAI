import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'

const Card = ({ image }) => {
    const { serverUrl, userData, setUserData, backEndImage, setBackEndImage, frontEndImage, setFrontEndImage, selectedImage, setSelectedImage } = useContext(userDataContext)
    return (
        <div className={
            `w-17.5 h-35 lg:w-37.5 lg:h-62.5 bg-[#030326] border-2 
             border-[#23238b68] rounded-2xl overflow-hidden cursor-pointer
         hover:border-white hover:shadow-2xl hover:shadow-blue-500 active:scale-95 ${selectedImage == image ? "border-white shadow-2xl shadow-blue-500" : null}`
        } onClick={() => setSelectedImage(image)} >
            <img src={image} className='h-full object-cover ' />
        </div>
    )
}

export default Card

import React from 'react'
import Card from '../components/Card'
import image1 from "../assests/image1.jpg"
import image2 from "../assests/image2.jpg"
import image3 from "../assests/image3.jpg"
import image4 from "../assests/bg3.jpg"
import { RiImageAddLine } from "react-icons/ri";
import { useState } from 'react'
import { useRef } from 'react'
const Customize = () => {
    const [frontEndImage, setFrontEndImage] = useState(null)
    const [backEndImage, setBackEndImage] = useState(null)
    const inputImage = useRef()
    const handleImage = (e) => {
        const file = e.target.files && e.target.files[0]
        setBackEndImage(file)
        const imageFile = URL.createObjectURL(file)
        setFrontEndImage(imageFile)
        console.log(frontEndImage)
    }
    return (
        <div className='w-full h-screen bg-linear-to-t from-[#101010c4] to-[#030349a2] flex justify-center items-center flex-col p-5' >
            <h1 className='text-2xl mb-10 font-semibold'>Select your Assistent Image</h1>
            <div className='w-full max-w-225 flex justify-center items-center flex-wrap gap-5 mb-10 '>
                <Card image={image1} />
                <Card image={image2} />
                <Card image={image3} />
                <Card image={image4} />

                <div onClick={() => inputImage.current.click()} className='w-17.5 h-35 lg:w-37.5 lg:h-62.5 bg-[#030326] border-2 border-[#23238b68] rounded-2xl overflow-hidden flex justify-center items-center cursor-pointer hover:border-white hover:shadow-2xl hover:shadow-blue-500 active:scale-95'>
                    {!frontEndImage && <RiImageAddLine className='h-8 w-8 ' />}
                    {frontEndImage && <img src={frontEndImage} className='h-full object-cover ' />}
                </div>
                <input type="file" accept='image/*' ref={inputImage} hidden onChange={handleImage} />

            </div>
            <button className='bg-blue-500 text-white px-6 py-3 text-xl rounded-full cursor-pointer font-semibold active:scale-95 '>Next</button>
        </div>
    )
}

export default Customize

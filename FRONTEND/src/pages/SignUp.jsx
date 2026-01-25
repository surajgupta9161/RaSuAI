import React, { useState } from 'react'
import bg from "../assests/bgAiImage.jpg"
import { IoEyeOff } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()

    return (
        <div className='w-full h-screen bg-cover flex justify-center items-center' style={{ backgroundImage: `url(${bg})` }}>

            <form className='w-[90%] h-150 max-w-125 bg-[#00000070] backdrop-blur shadow-xl shadow-black rounded-2xl flex flex-col justify-center items-center gap-5 px-5'>

                <h1 className='text-[25px] font-semibold mb-10'>Register to <span className='text-green-600 font-bold'>RaSu</span> your <span className='text-blue-800 font-bold'> Virtual Assistant </span> </h1>
                <input type="text" placeholder='Enter your name' className='w-full h-15 outline-none border-2 bg-transparent rounded-full text-[18px] px-5 py-3 ' required />
                <input type="email" placeholder='Enter your mail' className='w-full h-15 outline-none border-2 bg-transparent rounded-full text-[18px]  px-5 py-3 ' required />
                <div className='w-full h-15 outline-none border-2 bg-transparent rounded-full text-[18px] relative'>
                    <input type={showPassword ? "text" : "password"} placeholder='Enter your password' className='w-full h-full outline-none bg-transparent rounded-full text-[18px] px-5 py-3 ' required />
                    {!showPassword && <IoEyeOff className='absolute top-4.5 right-5 w-6.25 h-6.25 cursor-pointer' onClick={() => setShowPassword(true)} />}
                    {showPassword && <IoEye className='absolute top-4.5 right-5 w-6.25 h-6.25 cursor-pointer' onClick={() => setShowPassword(false)} />}

                </div>

                <button className='bg-blue-500 text-white px-6 py-3 text-xl rounded-full cursor-pointer font-semibold '>SignUp</button>
                <p className='text-xl cursor-pointer' onClick={() => navigate("/signin")} >Already have account! <span className='text-blue-400 '>Sign In</span></p>

            </form>

        </div>
    )
}

export default SignUp

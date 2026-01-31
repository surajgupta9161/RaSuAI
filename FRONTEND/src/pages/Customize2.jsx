import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import axios from 'axios'
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';

const Customize2 = () => {
    const { userData, backEndImage, selectedImage, serverUrl, setUserData } = useContext(userDataContext)
    const [assistantName, setAssistantName] = useState(userData?.assistantName || "")
    const [loading, setLoading] = useState(false)
    const handleUpdateAssistant = async () => {
        setLoading(true)
        try {
            let formData = new FormData()
            formData.append("assistantName", assistantName)
            if (backEndImage) {
                formData.append("assistantImage", backEndImage)
            } else {
                formData.append("imageUrl", selectedImage)
            }
            const result = await axios.post(`${serverUrl}/api/user/update`, formData, { withCredentials: true })
            setUserData(result.data)
            console.log(result.data)
            setLoading(false)
            navigate("/")
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }


    // const handleUpdateAssistant = async () => {
    //     setLoading(true)
    //     try {
    //         // 🔹 CHANGE 1: JSON payload → FormData
    //         let formData = new FormData()

    //         // 🔹 CHANGE 2: append assistantName
    //         formData.append("assistantName", assistantName)

    //         // 🔹 CHANGE 3: handle file upload OR fallback URL
    //         if (backEndImage instanceof File) {
    //             // User uploaded file → file sent to backend
    //             formData.append("assistantImage", backEndImage)
    //         } else if (selectedImage) {
    //             // Fallback → existing image URL
    //             formData.append("assistantImage", selectedImage)
    //         }

    //         // 🔹 CHANGE 4: Axios headers for FormData
    //         const result = await axios.post(
    //             `${serverUrl}/api/user/update`,
    //             formData,
    //             {
    //                 withCredentials: true,
    //                 headers: { "Content-Type": "multipart/form-data" }
    //             },
    //         )
    //         setLoading(false)
    //         navigate("/")
    //         setUserData(result.data)
    //         console.log(result.data)
    //     } catch (error) {
    //         if (error.response) {
    //             setLoading(false)
    //             console.log("Server Error:", error.response.data)
    //         } else {
    //             console.log(error.message)
    //         }
    //     }
    // }

    const navigate = useNavigate()

    // const handleUpdateAssistant = async () => {
    //     try {
    //         const payload = {
    //             assistantName,
    //             assistantImage: backEndImage ? backEndImage : null,
    //             imageUrl: !backEndImage ? selectedImage : null
    //         };

    //         const result = await axios.post(
    //             `${serverUrl}/api/user/update`,
    //             payload,
    //             {
    //                 withCredentials: true,
    //                 headers: {
    //                     "Content-Type": "application/json"
    //                 }
    //             }
    //         );
    //         setUserData(result.data);
    //         console.log(result.data);
    //     } catch (error) {
    //         if (error.response) {
    //             console.log(error.response.data); // server ka actual error message
    //         } else {
    //             console.log(error.message);
    //         }
    //     }
    // }

    return (
        <div className='w-full h-screen bg-linear-to-t from-[#101010c4] to-[#030349a2] flex justify-center items-center flex-col p-5 relative' >
            <IoArrowBackSharp className='absolute left-8 top-8 text-2xl cursor-pointer active:scale-90' onClick={() => navigate("/customize")} />
            <h1 className='text-2xl mb-10 font-semibold'>Create your Assistent Name</h1>
            <input type="text" placeholder='eg: RaSuAI' className='w-full max-w-150 h-15 outline-none border-2 bg-transparent rounded-full text-[18px]  px-5 py-3 ' onChange={(e) => setAssistantName(e.target.value)} value={assistantName} required />
            <button className={
                ` bg-amber-700 text-white px-3 py-2 lg:px-6 lg:py-3 lg:text-xl rounded-full cursor-pointer font-semibold active:scale-95 mt-10 
                ${assistantName ? null : "pointer-events-none opacity-50"}`
            } onClick={() => handleUpdateAssistant()}>{loading ? "Loading" : "Finally Create Your Assistant"}</button>
        </div>
    )
}

export default Customize2

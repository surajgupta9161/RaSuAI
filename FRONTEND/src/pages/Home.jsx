import React, { useContext, useEffect } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
    const { userData, setUserData, serverUrl, geminiResponse } = useContext(userDataContext)
    const navigate = useNavigate()
    const handleLogout = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true })
            setUserData(null)
            navigate("/signin")
        } catch (error) {
            setUserData(null)
            console.log(error)
        }
    }

    const speak = (text) => {
        const utterence = new SpeechSynthesisUtterance(text)
        window.speechSynthesis.speak(utterence)
    }

    useEffect(() => {
        const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
        const recognition = new speechRecognition()
        recognition.continuous = true
        recognition.lang = "en-US"

        recognition.onresult = async (e) => {
            const lastIndex = e.results.length - 1;
            const transcript = e.results[lastIndex][0].transcript.trim();

            console.log("heard:", transcript);

            if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
                const data = await geminiResponse(transcript);
                console.log(data);
                speak(data.response)
            }



            recognition.onend = () => {
                console.log("Mic stopped... restarting");
                recognition.start(); // 🔥 VERY IMPORTANT

            }
        };
        recognition.start()

    }, [])




    return (
        <div className='w-full h-screen bg-linear-to-t from-[#1d1c1c96] to-[#09094f7e] flex justify-center items-center flex-col p-5 relative' >
            <button className='bg-blue-500 text-white px-3 py-3 lg:px-5 lg:py-2 lg:text-xl rounded-full cursor-pointer font-semibold active:scale-95 absolute top-5 right-5' onClick={() => handleLogout()}>LogOut</button>
            <button className='bg-blue-500 text-white px-3 py-3 lg:px-5 lg:py-2 lg:text-xl rounded-full cursor-pointer font-semibold active:scale-95 absolute top-23 right-5' onClick={() => navigate("/customize")}>Customize</button>

            <div className='flex justify-center items-center flex-wrap '>
                <img src={userData?.assistantImage} className='w-80 h-80 rounded-2xl' />
            </div>
            <div>
                <p className='text-xl font-semibold mt-5'>Hi {userData.name}, i'm {userData.assistantName}</p>
            </div>

        </div>
    )
}

export default Home

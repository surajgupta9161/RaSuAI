import React, { createContext, useRef } from 'react'
export const userDataContext = createContext()
import axios from "axios"
import { useState } from 'react'
import { useEffect } from 'react'
const UserContext = ({ children }) => {
    const serverUrl = "http://localhost:8000"
    const [userData, setUserData] = useState(null)
    const [frontEndImage, setFrontEndImage] = useState(null)
    const [backEndImage, setBackEndImage] = useState(null)
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedImage2, setSelectedImage2] = useState(null)


    const handleCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
            setUserData(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    let isProcessing = useRef(false);

    const geminiResponse = async (command) => {
        if (isProcessing.current) return null;
        isProcessing.current = true;
        try {
            const result = await axios.post(`${serverUrl}/api/user/asktoassistant`, { command }, { withCredentials: true })
            return result.data
        } finally {
            setTimeout(() => {
                isProcessing.current = false;
            }, 1500);
        }
    }

    const value = {
        serverUrl, userData, setUserData, backEndImage, setBackEndImage, frontEndImage, setFrontEndImage, selectedImage, setSelectedImage, selectedImage2, setSelectedImage2, geminiResponse
    }

    useEffect(() => {
        handleCurrentUser()
    }, [])

    return (
        <div>
            <userDataContext.Provider value={value}>
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default UserContext

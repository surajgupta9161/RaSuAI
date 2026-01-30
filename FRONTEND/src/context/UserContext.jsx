import React, { createContext } from 'react'
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
    const value = {
        serverUrl, userData, setUserData, backEndImage, setBackEndImage, frontEndImage, setFrontEndImage, selectedImage, setSelectedImage
    }

    const handleCurrentUser = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
            setUserData(result.data)
            console.log(result.data)
        } catch (error) {
            console.log(error)
        }
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

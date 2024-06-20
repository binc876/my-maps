import axios from "axios"
import { env } from "../../../config"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export const Profile = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true) // Initialize isLoading state

    if (!localStorage.getItem('token')) {
        navigate('/login-alumni')
    }

    useEffect(() => {
        const fetchProfile = () => axios.get(env.BACKEND_URL+'/api/user/profile', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response.data)
            let data = response.data.data

            localStorage.setItem('email', JSON.stringify(data.email))
            localStorage.setItem('name', JSON.stringify(data.name))
            localStorage.setItem('id', JSON.stringify(data.id))
            setIsLoading(false)
        }).catch((error) => {
            console.log(error)
            let errorData = error.response.data
            console.log(errorData)

            sessionStorage.setItem('error', errorData.message)
            setIsLoading(false)
            navigate(-1)
        })

        fetchProfile()
    }, [navigate])

    if (isLoading) {
        return
    }

    return <Outlet/>
}


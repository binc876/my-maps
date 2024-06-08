import axios from "axios"
import { env } from "../../../config"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"

export const Profile = () => {
    const navigate = useNavigate()

    if (!localStorage.getItem('token')) {
        navigate('/login-alumni')
    }

    useEffect(() => {
        const fetchProfile = () => axios.get(env.BACKEND_URL+'/api/user', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            let errorData = error.response.data
            console.log(errorData)

            sessionStorage.setItem('error', errorData.message)
            navigate(-1)
        })

        fetchProfile()
    }, [navigate])

    return <Outlet/>
}


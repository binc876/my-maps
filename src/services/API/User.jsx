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
            let data = response.data.data

            localStorage.setItem('token', data.token.access_token)
            localStorage.setItem('email', JSON.stringify(data.email))
            localStorage.setItem('name', JSON.stringify(data.name))
            localStorage.setItem('id', JSON.stringify(data.id))
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


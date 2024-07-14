/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react'
import { env } from '../../../config'
import axios from 'axios'

const AlumniContext = createContext()

export const useAlumni = () => useContext(AlumniContext)

export const AlumniProvider = ({children}) => {
    const [pendingAlumni, setPendingAlumni] = useState([])
    const [alumniList, setAlumniList] = useState([])

    const fetchPendingAlumni = () => {
        axios.get(env.BACKEND_URL + '/api/admin/user/requests', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((response) => response.data.data)
        .then((data) => setPendingAlumni(data))
        .catch((error) => console.log('Error fetching pending alumni: ', error))
    }

    const fetchAlumniList = () => {
        axios.get(env.BACKEND_URL + '/api/admin/user/user-list', {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((response) => response.data.data)
        .then((data) => setAlumniList(data))
        .catch((error) => console.log('Error fetching alumni list: ', error))
    }

    useEffect(() => {
        fetchPendingAlumni()
        fetchAlumniList()
    }, [])

    const verifyAlumni = (id) => {
        axios.put(env.BACKEND_URL + `/api/admin/user/approve-user-registration/${id}`, {}, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(() => {
            fetchPendingAlumni()
            fetchAlumniList()
        })
        .catch((error) => console.log('Error verifying alumni: ', error))
    }

    const rejectAlumni = (id) => {
        axios.delete(env.BACKEND_URL + `/api/admin/user/reject-user-registration/${id}`, {
            headers: {
                authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((response) => response.data.data)
        .catch((error) => console.log('Error rejecting alumni: ', error))
    }

    return (
        <AlumniContext.Provider value={{ pendingAlumni, alumniList, verifyAlumni, rejectAlumni }}>
            {children}
        </AlumniContext.Provider>
    )
}

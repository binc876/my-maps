/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import { env } from '../../config'
import axios from 'axios'
import { Table } from 'react-bootstrap'

export default function AlumniCard() {
  const [alumniList, setAlumniList] = useState([])

  useEffect(() => {
    //Alumni List Table
    axios.get(env.BACKEND_URL + '/api/admin/user/user-list')
    .then(response => setAlumniList(response.data))
    .catch(error => console.error(error))
  }, [])

  return (
    <div>
        <Table>
            <thead className='table-success'>
                <tr>
                    <th>Name</th>
                    <th>Graduation Year</th>
                    <th>Address</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>nama</td>
                    <td>tahun</td>
                    <td>alamat</td>
                    <td>lat</td>
                    <td>long</td>
                </tr>
                {alumniList.map(alumni => (
                    <tr key={alumni.id}>
                        <td>{alumni.name}</td>
                        <td>{alumni.graduation_year}</td>
                        <td>{alumni.address}</td>
                        <td>{alumni.lat}</td>
                        <td>{alumni.long}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
  )
}

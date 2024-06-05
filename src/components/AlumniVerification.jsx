import { useState, useEffect } from 'react'
import { env } from '../../config'
import axios from 'axios'
import { Button, Card, CardBody } from 'react-bootstrap'

export default function AlumniVerification() {
  const [pendingAlumni, setPendingAlumni] = useState([])

  useEffect(() => {
    axios.get(env.BACKEND_URL + '/api/admin/user/requests')
    .then(response => setPendingAlumni(response.data))
    .catch(error => console.error(error))
  })

  const verifyAlumni = (id) => {
    axios.put(env.BACKEND_URL + `/api/admin/user/approve-user-registration/${id}`)
    .then(response => {
      setPendingAlumni(response.data.pendingAlumni)
    })
    .catch(error => console.error(error))
  }

  const rejectAlumni = (id) => {
    axios.delete(env.BACKEND_URL + `/api/admin/user/reject-user-registration/${id}`)
    .then(response => {
      setPendingAlumni(response.data.pendingAlumni)
    })
  }

  return (
    <div>
        {pendingAlumni.map(alumni => (
            <Card key={alumni.id} className='mb-3'>
              <CardBody>
                <Card.Title>{alumni.name}</Card.Title>
                <Card.Text>
                    <b>Email : </b>{alumni.email}<br/>
                    <b>Phone : </b>{alumni.mobile}<br/>
                    <b>Graduation Year : </b>{alumni.graduation_year}<br/>
                    <b>Address : </b>{alumni.address}<br/>
                </Card.Text>
                <Button variant='success' onClick={() => verifyAlumni(alumni.id)}>Verify</Button>
                <Button variant='danger' className='ml-2' onClick={() => rejectAlumni(alumni.id)}>Reject</Button>
              </CardBody>
            </Card>
        ))}
    </div>
  )
}

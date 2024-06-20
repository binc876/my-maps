import { useAlumni } from './AlumniContext'
import { Button, Card, CardBody } from 'react-bootstrap'

export default function AlumniCard() {
  const { pendingAlumni, verifyAlumni, rejectAlumni } = useAlumni()

  return (
    <div>
        {pendingAlumni.map(alumni => (
            <Card key={alumni.id} className='mb-3'>
              <CardBody>
                <Card.Title><h3>{alumni.name}</h3></Card.Title>
                <Card.Text>
                    <b>Email : </b>{alumni.email}<br/>
                    <b>Phone : </b>{alumni.userDetail.mobile}<br/>
                    <b>Graduation Year : </b>{alumni.userDetail.graduation_year}<br/>
                    <b>Address : </b>{alumni.userDetail.address}<br/>
                </Card.Text>
                <Button variant='success' onClick={() => verifyAlumni(alumni.id)}>Verify</Button>
                <Button variant='danger' onClick={() => rejectAlumni(alumni.id)}>Reject</Button>
              </CardBody>
            </Card>
        ))}
    </div>
  )
}
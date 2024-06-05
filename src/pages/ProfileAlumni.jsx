import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { env } from '../../config'

import NavbarAlumni from "../components/navbar/NavbarAlumni"
import './Style.css'

export default function ProfileAlumni() {
  const [profile, setProfile] = useState()

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      axios.get(env.BACKEND_URL + '/api/user', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setProfile(response.data)
      })
      .catch((error) => {
        console.error(error);
      })
    }
  }, [])

  return (
    <div>
        <NavbarAlumni/>
        <header>
            <Container className='profile-alumni-card'>
                <center><h4 className='mb-4'>Account Information</h4></center>
                <center>
                  <Image
                    src={profile.image_url || 'https://ivanmd.ivanwilliamharsono.com/storage/dd04d9a6-01fe-4eea-a2b2-8b190618e055/Profile-Picture.jpg'}
                    roundedCircle
                    width={100}
                    height={100}
                  />
                </center>
                <Container className='mb-5 mt-4'>
                <Row>
                  <Col>Name</Col>
                  <Col className='data-style'>{profile.name}</Col>
                </Row>
                <Row>
                  <Col>Phone</Col>
                  <Col className='data-style'>{profile.mobile}</Col>
                </Row>
                <Row>
                  <Col>Email</Col>
                  <Col className='data-style'>{profile.email}</Col>
                </Row>
                <Row>
                  <Col>Graduation Year</Col>
                  <Col className='data-style'>{profile.graduation_year}</Col>
                </Row>
                <Row>
                  <Col>Address</Col>
                  <Col className='data-style'>{profile.address}</Col>
                </Row>
                <Row>
                  <Col>Latitude</Col>
                  <Col className='data-style'>{profile.lat}</Col>
                </Row>
                <Row>
                  <Col>Longitude</Col>
                  <Col className='data-style'>{profile.long}</Col>
                </Row>
                </Container>

                <center><Button variant='danger'>Edit</Button></center>
            </Container>
        </header>
    </div>
  )
}

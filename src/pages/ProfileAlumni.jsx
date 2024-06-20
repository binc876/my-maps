import { Button, Col, Container, Image, Modal, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { env } from '../../config'

import NavbarAlumni from "../components/navbar/NavbarAlumni"
import './Style.css'

export default function ProfileAlumni() {
  const [profile, setProfile] = useState({
    email: '',
    name: '',
    user_detail: {
      image_url: '',
      mobile: '',
      graduation_year: '',
      address: '',
      lat: '',
      long: ''
    }
  })

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    axios.get(env.BACKEND_URL + '/api/user/profile', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    .then((response) => response.data.data)
    .then((data) => {
      const fixedImageUrl = data.user_detail.image_url.replace('http://localhost:3000/', '')
      setProfile({
        ...data,
        user_detail: {
          ...data.user_detail,
          image_url: fixedImageUrl
        }
      })
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setError('Failed to load profile data')
      setLoading(false)
    })
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
   if (error) {
    return <div>{error}</div>
  }
  
  const handleEditClick = () => {
    setShowModal(true)
  }
  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div>
        <NavbarAlumni/>
        <div>
        <Container className='profile-alumni-card'>
          <center><h4 className='mb-4'>Account Information</h4></center>
          <center><Image src={profile.user_detail.image_url} roundedCircle width={100} height={100}/></center>
          <Container className='mt-4 mb-4'>
            <Row>
              <Col>Name</Col>
              <Col className='data-style'>{profile.name}</Col>
            </Row>
            <Row>
              <Col>Mobile</Col>
              <Col className='data-style'>{profile.user_detail.mobile}</Col>
            </Row>
            <Row>
              <Col>Email</Col>
              <Col className='data-style'>{profile.email}</Col>
            </Row>
            <Row>
              <Col>Graduation Year</Col>
              <Col className='data-style'>{profile.user_detail.graduation_year}</Col>
            </Row>
            <Row>
              <Col>Address</Col>
              <Col className='data-style'>{profile.user_detail.address}</Col>
            </Row>
            <Row>
              <Col>Latitude</Col>
              <Col className='data-style'>{profile.user_detail.lat}</Col>
            </Row>
            <Row>
              <Col>Longitude</Col>
              <Col className='data-style'>{profile.user_detail.long}</Col>
            </Row>
          </Container>
          <center><Button variant='danger' onClick={handleEditClick}>Edit</Button></center>
        </Container>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Notice</Modal.Title>
          </Modal.Header>
          <Modal.Body>Fitur ini masih dalam tahap pengembangan</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
        </div>
    </div>
  )
}
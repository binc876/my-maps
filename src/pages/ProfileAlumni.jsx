import { Button, Col, Container, Form, Image, Modal, Row } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { env } from '../../config'
import NavbarAlumni from "../components/navbar/NavbarAlumni"
import BottomNavbar from '../components/navbar/BottomNavbar'
import { InstagramCard } from '../components/InstagramCard'
import './Style.css'
import { PencilSquare } from 'react-bootstrap-icons'
import 'react-profile/themes/default'
import { openEditor } from 'react-profile'

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
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState({...profile})
  const [selectedImage, setSelectedImage] = useState(null)

  const fetchProfile = () => {
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
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
   if (error) {
    return <div>{error}</div>
  }
  
  const handleEditClick = () => {
    setEditedProfile(profile)
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedProfile(profile)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditedProfile((prevProfile) => ({
      ...prevProfile,
      user_detail: {
        ...prevProfile.user_detail,
        [name]: value
      },
      [name]: value
    }))
  }

  const handleImageChange = async (e) => {
    const image = await openEditor({ src: e.target.files[0], square: true})
    setSelectedImage(image?.editedImage?.getDataURL())
  }

  const handleSave = async () => {
    const formData = new FormData()
    formData.append('name', editedProfile.name);
    formData.append('mobile', editedProfile.user_detail.mobile);
    formData.append('graduation_year', editedProfile.user_detail.graduation_year);
    formData.append('address', editedProfile.user_detail.address);
    formData.append('lat', editedProfile.user_detail.lat);
    formData.append('long', editedProfile.user_detail.long);

    if (selectedImage) {
      const response = await fetch(selectedImage)
      const blob = await response.blob()
      formData.append('image', blob, 'profile_picture.png')
    }

    let config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: env.BACKEND_URL + '/api/user/profile/update',
      headers: { 
        'Authorization': 'Bearer ' + localStorage.getItem('token'), 
        ...formData
      },
      data : formData,
    };

    console.log(editedProfile)
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setProfile({
        ...editedProfile,
        user_detail: {
          ...editedProfile.user_detail,
          image_url: response.data.data.image_url || profile.user_detail.image_url
        }
      })
      setIsEditing(false)
      setShowModal(true)
      fetchProfile()
    })
    .catch((error) => {
      console.log(error.message);
    });
    
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div>
      <NavbarAlumni/>
      <div>
        <Container className='profile-alumni-card'>
          <center><h4 className='mb-4'>Account Information</h4></center>
          <center>
            <div style={{position: 'relative', display: 'inline-block'}}>
              {isEditing && (
                <div>
                  <label htmlFor='file-input' style={{position: 'absolute', top: '75%', left: '75%', cursor: 'pointer', backgroundColor: 'white', borderRadius: '20%'}}>
                    <PencilSquare size={20}/>
                  </label>
                  <input
                    id='file-input'
                    type='file'
                    accept='image/jpeg;image/png'
                    style={{display: 'none'}}
                    onChange={handleImageChange}
                  />
                </div>
              )}

              {
                isEditing ? (
                  <Image 
                    src={selectedImage ? selectedImage : env.BACKEND_ASSET_URL + '/' + profile.user_detail.image_url} 
                    roundedCircle width={100} height={100}
                    // onError={(e) => {
                    //   e.target.onError = null
                    //   e.target.src = 'https://i.pinimg.com/564x/28/c2/0b/28c20b3bf4e1a48334b2278d3c7fb447.jpg'
                    // }}
                  />
                ) : (
                  <Image 
                    src={env.BACKEND_ASSET_URL + '/' + profile.user_detail.image_url} 
                    roundedCircle width={100} height={100}
                    // onError={(e) => {
                    //   e.target.onError = null
                    //   e.target.src = 'https://i.pinimg.com/564x/28/c2/0b/28c20b3bf4e1a48334b2278d3c7fb447.jpg'
                    // }}
                  />
                )
              }
            </div>
              
            </center>
            <Container className='mt-4 mb-4'>
              <Row>
                <Col>Name</Col>
                <Col className='data-style'>
                  {
                    isEditing ? (
                      <Form.Control 
                        type='text'
                        name='name'
                        value={editedProfile.name}
                        onChange={handleChange}
                      />
                    ) : (
                      profile.name
                    )
                  }
                </Col>
              </Row>
              <Row>
                <Col>Mobile</Col>
                <Col className='data-style'>
                  {
                    isEditing ? (
                      <Form.Control 
                        type='text'
                        name='mobile'
                        value={editedProfile.user_detail.mobile}
                        onChange={handleChange}
                      />
                    ) : (
                      profile.user_detail.mobile
                    )
                  }
                </Col>
              </Row>
              <Row>
                <Col>Email</Col>
                <Col className='data-style'>
                  {
                    isEditing ? (
                      <Form.Control 
                        type='email'
                        name='email'
                        value={editedProfile.email}
                        onChange={handleChange}
                      />
                    ) : (
                      profile.email
                    )
                  }
                </Col>
              </Row>
              <Row>
                <Col>Graduation Year</Col>
                <Col className='data-style'>
                  {
                    isEditing ? (
                      <Form.Control 
                        type='number'
                        name='graduation_year'
                        value={editedProfile.user_detail.graduation_year}
                        onChange={handleChange}
                      />
                    ) : (
                      profile.user_detail.graduation_year
                    )
                  }
                </Col>
              </Row>
              <Row>
                <Col>Address</Col>
                <Col className='data-style'>
                  {
                    isEditing ? (
                      <Form.Control 
                        type='text'
                        name='address'
                        value={editedProfile.user_detail.address}
                        onChange={handleChange}
                      />
                    ) : (
                      profile.user_detail.address
                    )
                  }
                </Col>
              </Row>
              <Row>
                <Col>Latitude</Col>
                <Col className='data-style'>
                  {
                    isEditing ? (
                      <Form.Control 
                        type='number'
                        name='lat'
                        value={editedProfile.user_detail.lat}
                        onChange={handleChange}
                      />
                    ) : (
                      profile.user_detail.lat
                    )
                  }
                </Col>
              </Row>
              <Row>
                <Col>Longitude</Col>
                <Col className='data-style'>
                  {
                    isEditing ? (
                      <Form.Control 
                        type='number'
                        name='long'
                        value={editedProfile.user_detail.long}
                        onChange={handleChange}
                      />
                    ) : (
                      profile.user_detail.long
                    )
                  }
                </Col>
              </Row>
            </Container>
            {
              isEditing ? (
                <center>
                  <Button variant='secondary' onClick={handleCancelEdit}>Cancel</Button>{' '}
                  <Button variant='primary' onClick={handleSave}>Save</Button>
                </center>
              ) : (
                <center><Button variant='danger' onClick={handleEditClick}>Edit</Button></center>
              )
            }
          </Container>

          <Container className='mt-4'>
            <h5>Instagram Post</h5>
            <InstagramCard/>
            <div className='space-post'></div>
          </Container>
        </div>
        <BottomNavbar/>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header>Success</Modal.Header>
          <Modal.Body>Your profile has been successfully updated!</Modal.Body>
          <Modal.Footer>
            <Button variant='primary' onClick={handleCloseModal}>Close</Button>
          </Modal.Footer>
        </Modal>
    </div>
  )
}
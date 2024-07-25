import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import heroRegistrasi from '../../assets/heroRegistrasi.svg'

import './Registrasi.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { env } from '../../../config'

export default function Registrasi() {
  const navigate = useNavigate()

  const [name, setName] = useState()
  const [graduationYear, setGraduationYear] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [address, setAddress] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [image, setImage] = useState(null)

  const [error, setError] = useState()
  const [regexError, setRegexError] = useState()
  const [fileSizeError, setFileSizeError] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    console.log('Name:', name);
    console.log('Image: ', image);
    console.log('Graduation Year:', graduationYear);
    console.log('Phone Number:', phoneNumber);
    console.log('Address:', address);
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    console.log('Email:', email);
    console.log('Password:', password);
  }, [name, image, graduationYear, phoneNumber, address, latitude, longitude, email, password])

  // handlers
  const handleName = (event) => setName(event.target.value);
  const handleGraduationYear = (event) => setGraduationYear(event.target.value);
  const handlePhoneNumber = (event) => setPhoneNumber(event.target.value);
  const handleAddress = (event) => setAddress(event.target.value);
  const handleLatitude = (event) => setLatitude(event.target.value);
  const handleLongitude = (event) => setLongitude(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);
  const handleImage = (event) => {
    const valueImg = event.target.files[0]
    if (valueImg.size > 1048576) {
      setFileSizeError('File size must be less than 1MB')
      setImage(null)
    } else {
      setFileSizeError('')
      setImage(valueImg)
    }
  }

  const handlePassword = (event) => {
    const valuePass = event.target.value
    setPassword(valuePass)

    //validasi password
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/

    if (!regex.test(valuePass)) {
      setRegexError('Please pay attention to the rules for writing passwords!')
    } else {
      setRegexError('')
    }
  };

  const resetForm = () => {
    setName('')
    setGraduationYear('')
    setPhoneNumber('')
    setAddress('')
    setLatitude('')
    setLongitude('')
    setEmail('')
    setPassword('')
    setImage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('graduation_year', graduationYear);
    formData.append('mobile', phoneNumber);
    formData.append('address', address);
    formData.append('lat', latitude);
    formData.append('long', longitude);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', password);
    if (image) {
      formData.append('image_url', image)
    }

    axios({
      "content-type": "multipart/form-data",
      url: env.BACKEND_URL + '/api/user/registration',
      method: 'post',
      data: formData
    }).then((response) => {
      console.log(response)
      localStorage.token = response.token
      localStorage.user = JSON.stringify(response.data)
      resetForm()
    })
    .then(() => {
      setShowModal(true)
    })
    .catch((error) => {
      if (error.response.data.message === 'Validation error') {
        setError('Email is already taken. Please use another email.')
      } else {
        setError('Registration failed. Please try again.')
      }
      console.log(error)
    })
  }

  const handleClose = () => {
    setShowModal(false)
    resetForm()
  }

  return (
    <div className='registrasi'>
      <header className='w-100 min-vh-100 d-flex align-items-center'>
        <Container>
          <Row className='header-box d-flex align-items-center'>
            <Col lg='6' className='regist-card'>
              <h1>Welcome to Aremanest Club!</h1>
              <p>Register your account</p>

              {error && <Alert variant='danger'>{error}</Alert>}

              <Form className='mb-4' onSubmit={handleSubmit} autoComplete='off'>
                <Form.Group className='mb-2'>
                  <Form.Control onInput={handleName} value={name} type='text' placeholder='Full name with degree' required autoComplete='off'/>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Text>Photo profile</Form.Text>
                  <Form.Control onChange={handleImage} type='file' required autoComplete='off'/>
                  {fileSizeError && <Form.Text style={{color: 'red'}}>{fileSizeError}</Form.Text>}
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Control onInput={handleGraduationYear} value={graduationYear} type='text' placeholder='Graduation year' required autoComplete='off'/>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Control onInput={handlePhoneNumber} value={phoneNumber} type='phone' placeholder='Phone number' required autoComplete='off'/>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Control onInput={handleAddress} value={address} type='text' placeholder='Address' required autoComplete='off'/>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Row>
                    <Col>
                      <Form.Control onInput={handleLatitude} value={latitude} type='text' placeholder='Latitude' required autoComplete='off'/>
                    </Col>
                    <Col>
                      <Form.Control onInput={handleLongitude} value={longitude} type='text' placeholder='Longitude' required autoComplete='off'/>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Control 
                    onInput={handleEmail} 
                    value={email} 
                    type='email' 
                    placeholder='Email' 
                    style={{borderColor: error ? 'red' : ''}}
                    required
                    autoComplete='off'
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    onInput={handlePassword}
                    value={password}
                    type='password'
                    placeholder='Password'
                    style={{borderColor: regexError ? 'red' : ''}}
                    required
                    autoComplete='new-password'
                  />
                  {regexError && <Form.Text id='passwordHelpBlock' style={{color: 'red'}}>{regexError}<br/></Form.Text>}
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 6-20 characters long, contain letters and numbers,
                    and must not contain spaces, special characters, or emoji.
                  </Form.Text>
                </Form.Group>
                <Button className='btn-regist' type='submit'>Create an Account</Button>
              </Form>

              <center>
              <Form.Group className='mt-3'>
                <Form.Text>
                  Already have account?  <Button size='sm' variant='warning' onClick={() => navigate('/login-alumni')}>Login Here</Button>
                </Form.Text>
              </Form.Group>
              </center>
            </Col>
            <Col lg='6' className='pt-lg-0 pt-5'>
              <img className='hero' src={heroRegistrasi}/>
            </Col>
          </Row>
        </Container>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Registrasi akun Anda sudah berhasil, silahkan hubungi Admin untuk mendapatkan verifikasi.
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => navigate('/')}>Kembali ke halaman awal</Button>
            <Button onClick={handleClose}>Daftarkan akun baru lagi</Button>
          </Modal.Footer>
        </Modal>
      </header>
    </div>
  )
}

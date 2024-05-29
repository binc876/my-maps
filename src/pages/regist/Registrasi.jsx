import { Button, Col, Container, Form, Row } from 'react-bootstrap'
// import { useNavigate } from 'react-router-dom'

import heroRegistrasi from '../../assets/heroRegistrasi.svg'

import './Registrasi.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { env } from '../../../config'

export default function Registrasi() {
  // const navigate = useNavigate()

  const [name, setName] = useState()
  const [graduationYear, setGraduationYear] = useState()
  const [phoneNumber, setPhoneNumber] = useState()
  const [address, setAddress] = useState()
  const [latitude, setLatitude] = useState()
  const [longitude, setLongitude] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  useEffect(() => {
    console.log('Name:', name);
    console.log('Graduation Year:', graduationYear);
    console.log('Phone Number:', phoneNumber);
    console.log('Address:', address);
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    console.log('Email:', email);
    console.log('Password:', password);
  }, [name, graduationYear, phoneNumber, address, latitude, longitude, email, password])

  // handlers
  const handleName = (event) => setName(event.target.value);
  const handleGraduationYear = (event) => setGraduationYear(event.target.value);
  const handlePhoneNumber = (event) => setPhoneNumber(event.target.value);
  const handleAddress = (event) => setAddress(event.target.value);
  const handleLatitude = (event) => setLatitude(event.target.value);
  const handleLongitude = (event) => setLongitude(event.target.value);
  const handleEmail = (event) => setEmail(event.target.value);
  const handlePassword = (event) => setPassword(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log('Name:', name);
    // console.log('Graduation Year:', graduationYear);
    // console.log('Phone Number:', phoneNumber);
    // console.log('Address:', address);
    // console.log('Latitude:', latitude);
    // console.log('Longitude:', longitude);
    // console.log('Email:', email);
    // console.log('Password:', password);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('graduation_year', graduationYear);
    formData.append('mobile', phoneNumber);
    formData.append('address', address);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', password);
    // axios.post(env.BACKEND_URL + '/api/user/registration', formData).then((response) => {
    //   console.log(response);
    // }).catch((error) => {
    //   console.log(error);
    // })
    axios({
      "content-type": "multipart/form-data",
      url: env.BACKEND_URL + '/api/user/registration',
      method: 'post',
      data: formData
    }).then((response) => {console.log(response)}).catch((error) => {console.log(error)})
  }

  return (
    <div className='registrasi'>
      <header className='w-100 min-vh-100 d-flex align-items-center'>
        <Container>
          <Row className='header-box d-flex align-items-center'>
            <Col lg='6' className='regist-card'>
              <h1>Welcome to Aremanest Club!</h1>
              <p>Register your account</p>

              <Form className='mb-4' onSubmit={handleSubmit}>
                <Form.Group className='mb-3'>
                  <Form.Control onInput={handleName} type='text' placeholder='Full name with degree'/>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Control onInput={handleGraduationYear} type='text' placeholder='Graduation year'/>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Control onInput={handlePhoneNumber} type='phone' placeholder='Phone number'/>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Control onInput={handleAddress} type='text' placeholder='Address'/>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Row>
                    <Col>
                      <Form.Control onInput={handleLatitude} type='text' placeholder='Latitude'/>
                    </Col>
                    <Col>
                      <Form.Control onInput={handleLongitude} type='text' placeholder='Longitude'/>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Control onInput={handleEmail} type='email' placeholder='Email'/>
                </Form.Group>
                <Form.Group>
                  <Form.Control onInput={handlePassword} type='password' placeholder='Password'/>
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters long, contain letters and numbers,
                    and must not contain spaces, special characters, or emoji.
                  </Form.Text>
                </Form.Group>
                <Button type='submit'>Create an Account</Button>
              </Form>

              {/* <Button onClick={() => navigate('/login-alumni')}>Creat an Account</Button> */}
            </Col>
            <Col lg='6' className='pt-lg-0 pt-5'>
              <img className='hero' src={heroRegistrasi}/>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  )
}

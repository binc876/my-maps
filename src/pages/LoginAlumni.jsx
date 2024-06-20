import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import welcomeAlumni from '../assets/welcomeAlumni.svg'
import Logos from '../components/Logos'
import '../pages/Style.css'
import axios from 'axios'
import { env } from '../../config'

export default function LoginAlumni() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const sessionError = sessionStorage.getItem('error')
  if (sessionError) {
    setErrMsg(sessionError)
    sessionStorage.removeItem('error')
  }

  const handleLogin = () => {
    axios.post(env.BACKEND_URL+'/api/user/login', {
      email: email,
      password: password
    }).then((response) => {
      console.log(response)
      let data = response.data.data

      localStorage.setItem('token', data.token.access_token)
      localStorage.setItem('email', JSON.stringify(data.email))
      localStorage.setItem('name', JSON.stringify(data.name))
      localStorage.setItem('id', JSON.stringify(data.id))

      navigate('/dashboard')
    }).catch((error) => {
      let errorData = error.response.data
      setErrMsg(errorData.message)
    })
  }

  return (
    <div className='login-alumni'>
      <header className='w-100 min-vh-100 d-flex align-items-center'>
        <Container>
          <Logos/>
          <Row className='header-box d-flex align-items-center'>
            <Col lg='6' className='login-card'>
              <h1>Welcome to Aremanest club!</h1>
              <p>Login to your alumni account</p>

              <Form className='mb-3'>
                <Form.Group className='mb-3'>
                  <Form.Control
                    type='email' 
                    id='useremail' 
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    type='password'
                    id='password'
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </Form.Group>
              </Form>

              {errMsg && <p style={{color: 'red'}}>{errMsg}</p>}

              <Button className='btn-login' variant='success' onClick={handleLogin}>Login Alumni</Button>

              <div className='fgt-pass mt-3'>
                <p>Forgot your account password?<br/>Change the password here..</p>
                <Button variant='warning' onClick={() => navigate('/forgot-password')}>Forgot Password</Button>
              </div>

              <center>
              <Form.Group className='mt-4'>
                <Form.Text>
                  Did not have account yet? <Button size='sm' variant='warning' onClick={() => navigate('/registrasi')}>Register Now</Button>
                </Form.Text>
              </Form.Group>
              </center>
            </Col>
            <Col lg='6' className='pt-lg-0 pt-5'>
              <img className='hero' src={welcomeAlumni}/>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  )
}

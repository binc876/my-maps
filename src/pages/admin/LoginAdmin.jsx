import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import welcomeAdmin from '../../assets/welcomeAdmin.svg'
import Logos from '../../components/Logos'
import '../../pages/Style.css'
import axios from 'axios'
import { env } from '../../../config'

export default function LoginAdmin() {
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
    axios.post(env.BACKEND_URL + '/api/admin/login', {
      email: email,
      password: password
    }).then((response) => {
      console.log(response)
      let data = response.data.data

      localStorage.setItem('token', data.token.access_token)
      localStorage.setItem('email', JSON.stringify(data.email))
      localStorage.setItem('name', JSON.stringify(data.name))
      localStorage.setItem('id', JSON.stringify(data.id))

      navigate('/dashboard-admin')
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
              <p>Login to your admin account</p>

              <Form className='mb-3'>
                <Form.Group className='mb-3'>
                  <Form.Control 
                    type='email' 
                    id='adminMail' 
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control 
                    type='password' 
                    id='adminPassword'
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </Form.Group>
              </Form>

              {errMsg && <p style={{color: 'red'}}>{errMsg}</p>}

              <Button variant='success' onClick={handleLogin}>Login Admin</Button>
            </Col>
            <Col lg='6' className='pt-lg-0 pt-5'>
              <img className='hero' src={welcomeAdmin}/>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  )
}

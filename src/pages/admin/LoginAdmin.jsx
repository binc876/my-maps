import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import welcomeAdmin from '../../assets/welcomeAdmin.svg'

import '../../pages/Style.css'

export default function LoginAdmin() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const handleLogin = () => {
    const validEmail = 'admin@gmail.com'
    const validPassword = 'admin123'

    if (email === validEmail && password === validPassword) {
      navigate('/dashboard-admin')
    } else {
      setErrMsg('Email/password not valid')
    }
  }

  return (
    <div className='login-alumni'>
      <header className='w-100 min-vh-100 d-flex align-items-center'>
        <Container>
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

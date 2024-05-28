import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import welcomeAlumni from '../assets/welcomeAlumni.svg'
import Logos from '../components/Logos'
import '../pages/Style.css'

export default function LoginAlumni() {
  const navigate = useNavigate()

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
                  <Form.Control type='email' id='' placeholder='Email'/>
                </Form.Group>
                <Form.Group>
                  <Form.Control type='password' placeholder='Password'/>
                </Form.Group>
              </Form>

              <Button variant='success' onClick={() => navigate('/dashboard')}>Login Alumni</Button>

              <div className='fgt-pass mt-5'>
                <p>Forgot your account password?<br/>Change the password here..</p>
                <Button variant='warning' onClick={() => navigate('/forgot-password')}>Forgot Password</Button>
              </div>
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

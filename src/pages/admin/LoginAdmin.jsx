import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import welcomeAdmin from '../../assets/welcomeAdmin.svg'

import '../../pages/Style.css'

export default function LoginAdmin() {
  const navigate = useNavigate()

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
                  <Form.Control type='email' id='' placeholder='Email'/>
                </Form.Group>
                <Form.Group>
                  <Form.Control type='password' placeholder='Password'/>
                </Form.Group>
              </Form>

              <Button variant='success' onClick={() => navigate('/dashboard-admin')}>Login Admin</Button>
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

import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import heroRegistrasi from '../../assets/heroRegistrasi.svg'

import './Registrasi.css'

export default function Registrasi() {
  const navigate = useNavigate()

  return (
    <div className='registrasi'>
      <header className='w-100 min-vh-100 d-flex align-items-center'>
        <Container>
          <Row className='header-box d-flex align-items-center'>
            <Col lg='6' className='regist-card'>
              <h1>Welcome to Aremanest Club!</h1>
              <p>Register your account</p>

              <Form className='mb-4'>
                <Form.Group className='mb-3'>
                  <Form.Control type='text' placeholder='Full name with degree'/>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Control type='text' placeholder='Graduation year'/>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Control type='phone' placeholder='Phone number'/>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Control type='text' placeholder='Address'/>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Row>
                    <Col>
                      <Form.Control type='text' placeholder='Latitude'/>
                    </Col>
                    <Col>
                      <Form.Control type='text' placeholder='Longitude'/>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Control type='email' placeholder='Email'/>
                </Form.Group>
                <Form.Group>
                  <Form.Control type='password' placeholder='Password'/>
                  <Form.Text id="passwordHelpBlock" muted>
                    Your password must be 8-20 characters long, contain letters and numbers,
                    and must not contain spaces, special characters, or emoji.
                  </Form.Text>
                </Form.Group>
              </Form>

              <Button onClick={() => navigate('/login-alumni')}>Creat an Account</Button>
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

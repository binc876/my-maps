import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import heroLupaPassword from '../../assets/heroLupaPassword.svg'

import './ForgotPassword.css'

export default function ForgotPassword() {
  const navigate = useNavigate()

  return (
    <div className='forgot-password'>
        <header className='w-100 min-vh-100 d-flex align-items-center'>
            <Container>
                <Row className='header-box d-flex align-items-center'>
                    <Col lg='6' className='fgt-pass-card'>
                        <p>Change your password with a new one,<br/>Enter the registered email</p>

                        <Form className='mt-5 mb-4'>
                            <Form.Group>
                                <Form.Control type='email' placeholder='Email'/>
                            </Form.Group>
                        </Form>

                        <Button onClick={() => navigate('/verif-password')}>Send Verification</Button>
                    </Col>
                    <Col lg='6' className='pt-lg-0 pt-5'>
                        <img className='hero' src={heroLupaPassword}/>
                    </Col>
                </Row>
            </Container>
        </header>
    </div>
  )
}

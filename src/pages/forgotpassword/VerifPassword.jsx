import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import heroUbahPassword from '../../assets/heroUbahPassword.svg'

export default function VerifPassword() {
  const navigate = useNavigate()

  return (
    <div className='change-password'>
        <header className='w-100 min-vh-100 d-flex align-items-center'>
            <Container>
                <Row className='header-box d-flex align-items-center'>
                    <Col lg='6' className='change-pass-card'>
                        <p>Change your password with a new one</p>

                        <Form className='mt-4 mb-4'>
                            <Form.Group>
                                <Form.Control type='password' placeholder='New password' className='mb-3'/>
                                <Form.Control type='password' placeholder='Confirm new password'/>
                            </Form.Group>
                            <Form.Text muted>
                                Your password must be 8-20 characters long, contain letters and numbers,
                                and must not contain spaces, special characters, or emoji.
                            </Form.Text>
                        </Form>

                        <Button variant='warning' onClick={() => navigate('/')}>Change Password</Button>
                    </Col>
                    <Col lg='6' className='pt-lg-0 pt-5'>
                        <img className='hero' src={heroUbahPassword}/>
                    </Col>
                </Row>
            </Container>
        </header>
    </div>
  )
}

import { Alert, Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { env } from '../../../config'
import axios from 'axios'

import heroLupaPassword from '../../assets/heroLupaPassword.svg'

import './ForgotPassword.css'

export default function ForgotPassword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState()
  const [message, setMessage] = useState()
  const [error, setError] = useState()
  const [showModal, setShowModal] = useState(false)
  const [countdown, setCountdown] = useState(5)

  const handleForgotPassword = () => {
    axios.post(env.BACKEND_URL + '/api/user/forgot-password', {
        email
    }).then(() => {
        setMessage('Reset password link sent to your email. Please check your inbox.')
        setShowModal(true)
    }).catch((error) => {
        setError('Failed to send verification email. Please try again.')
        console.log(error)
    })
  }

  useEffect(() => {
    if (showModal) {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => {
                if (prevCountdown <= 1) {
                    clearInterval(timer)
                    navigate('/')
                }
                return prevCountdown - 1
            })
        }, 1000)
        return () => clearInterval(timer)
        // const timer = setTimeout(() => {
        //     setShowModal(false)
        //     navigate('/')
        // }, 5000)
        // return () => clearTimeout(timer)
    }
  }, [showModal, navigate])

  return (
    <div className='forgot-password'>
        <header className='w-100 min-vh-100 d-flex align-items-center'>
            <Container>
                <Row className='header-box d-flex align-items-center'>
                    <Col lg='6' className='fgt-pass-card'>
                        <p>Change your password with a new one,<br/>Enter the registered email</p>

                        {error && <Alert variant='danger'>{error}</Alert>}

                        <Form className='mt-5 mb-4'>
                            <Form.Group>
                                <Form.Control type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>
                        </Form>

                        <Button onClick={handleForgotPassword}>Send Verification</Button>
                    </Col>
                    <Col lg='6' className='pt-lg-0 pt-5'>
                        <img className='hero' src={heroLupaPassword}/>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message}
                </Modal.Body>
                <Modal.Footer>
                    Redirecting in {countdown} seconds...
                </Modal.Footer>
            </Modal>

        </header>
    </div>
  )
}

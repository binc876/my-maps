import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'

import heroUbahPassword from '../../assets/heroUbahPassword.svg'
import { useState, useEffect } from 'react'

import axios from 'axios'
import { env } from '../../../config'
import { useNavigate } from 'react-router-dom'


export default function VerifPassword() {
    const resetToken = new URLSearchParams(window.location.search).get('token')
    const resetEmail = new URLSearchParams(window.location.search).get('email')
    const navigate = useNavigate()

    const [password, setPassword] = useState(null)
    const [passwordConfirmation, setPasswordConfirmation] = useState(null)
    const [error, setError] = useState()
    const [showModal, setShowModal] = useState(false)
    const [countdown, setCountdown] = useState(5)

    const handleSubmission = (event) => {
        event.preventDefault()

        if (password !== passwordConfirmation) {
            setError('Password do not match!')
            return
        }

        axios.post(env.BACKEND_URL + '/api/user/reset-password', {
            email: resetEmail,
            password,
            password_confirmation: passwordConfirmation,
            token: resetToken
        })
        .then(() => {
            setShowModal(true)
        })
        .catch((error) => {
            setError('Failed to update password. Please try again.')
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
        }
    }, [showModal, navigate])

    return (
        <div className='change-password'>
            <header className='w-100 min-vh-100 d-flex align-items-center'>
                <Container>
                    <Row className='header-box d-flex align-items-center'>
                        <Col lg='6' className='change-pass-card'>
                            <p>Change your password with a new one</p>

                            {error && <Form.Text style={{color: 'red'}}>{error}</Form.Text>}

                            <Form className='mt-4 mb-4' onSubmit={handleSubmission}>
                                <Form.Group>
                                    <Form.Control type='password' placeholder='New password' className='mb-3' onInput={(e) => setPassword(e.target.value)}/>
                                    <Form.Control type='password' placeholder='Confirm new password' onInput={(e) => setPasswordConfirmation(e.target.value)}/>
                                </Form.Group>
                            <Button variant='warning' className='mt-3' type='submit'>Change Password</Button>

                            </Form>
                        </Col>
                        <Col lg='6' className='pt-lg-0 pt-5'>
                            <img className='hero' src={heroUbahPassword}/>
                        </Col>
                    </Row>
                </Container>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Congratulations, your password has been successfully changed!🤩
                    </Modal.Body>
                    <Modal.Footer>
                        Redirecting in {countdown} seconds...
                    </Modal.Footer>
                </Modal>

            </header>
        </div>
    )
}

import { Button, Col, Container, Form, Row } from 'react-bootstrap'

import heroUbahPassword from '../../assets/heroUbahPassword.svg'
import { useState } from 'react'

import axios from 'axios'
import { env } from '../../../config'


export default function VerifPassword() {
    const resetToken = new URLSearchParams(window.location.search).get('token')
    const resetEmail = new URLSearchParams(window.location.search).get('email')

    const [token, setToken] = useState(resetToken)
    const [email, setEmail] = useState(resetEmail)
    const [password, setPassword] = useState(null)
    const [passwordConfirmation, setPasswordConfirmation] = useState(null)

    const handleSubmission = (event) => {
        event.preventDefault()

        axios({
            method: 'post',
            url: `${env.BACKEND_URL}/api/user/reset-password`,
            data: {
                email: email,
                password: password,
                password_confirmation: passwordConfirmation,
                token: token
            }
        }).then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <div className='change-password'>
            <header className='w-100 min-vh-100 d-flex align-items-center'>
                <Container>
                    <Row className='header-box d-flex align-items-center'>
                        <Col lg='6' className='change-pass-card'>
                            <p>Change your password with a new one</p>

                            <Form className='mt-4 mb-4' onSubmit={handleSubmission}>
                                <Form.Group>
                                    <Form.Control type='password' placeholder='New password' className='mb-3' onInput={(e) => setPassword(e.target.value)}/>
                                    <Form.Control type='password' placeholder='Confirm new password' onInput={(e) => setPasswordConfirmation(e.target.value)}/>
                                </Form.Group>
                                {/* <Form.Text muted>
                                    Your password must be 8-20 characters long, contain letters and numbers,
                                    and must not contain spaces, special characters, or emoji.
                                </Form.Text> */}
                            <Button variant='warning' className='mt-3' type='submit'>Change Password</Button>

                            </Form>
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

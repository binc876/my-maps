import { Container, Row, Col, Button, Dropdown } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import Logos from '../components/Logos'
import heroKiri from '../assets/heroKiri.svg'
import heroKanan from '../assets/heroKanan.svg'
import BottomNavbar from '../components/navbar/BottomNavbar'

import './Style.css'

export default function LandingPage() {
  const navigate = useNavigate()
  
  return (
    <div className='homepage'>
        <header className='w-100 min-vh-100 d-flex align-items-center'>
        <center>
            <Row className='header-box d-flex align-items-center'>
                <Col lg='3' className='pb-lg-0 pb-4'>
                    <img src={heroKiri} className='hero'/>
                </Col>
                <Col lg='6'>
                    <Container>
                        <Logos/>
                        <h1 className='mb-4'>Find your comrades and keeping connection between old and young!</h1>
                        <p className='mb-4'>Aremanest club is a platform to easily find out the distribution of anesthesiology alumni of Brawijaya University.</p>
                        <Col>
                            <Button
                                className='btn' variant='success'
                                onClick={() => navigate('/registrasi')}>
                                JOIN US
                            </Button>

                            <Dropdown className='btn'>
                                <Dropdown.Toggle variant='warning'>
                                    LOGIN
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => navigate('/login-alumni')}>Login Alumni</Dropdown.Item>
                                    <Dropdown.Item onClick={() => navigate('/login-admin')}>Login Admin</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Col>
                    </Container>
                </Col>
                <Col lg='3' className='pt-lg-0 pt-4'>
                    <img src={heroKanan} className='hero'/>
                </Col>
            </Row>
        </center>
        </header>
        <BottomNavbar/>
    </div>
  )
}

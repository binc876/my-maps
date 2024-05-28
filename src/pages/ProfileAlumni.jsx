import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import NavbarAlumni from "../components/navbar/NavbarAlumni"
import './Style.css'

export default function ProfileAlumni() {
  return (
    <div>
        <NavbarAlumni/>
        <header>
            <Container className='profile-alumni-card'>
                <center><h4 className='mb-4'>Account Information</h4></center>
                <center><Image src='https://ivanmd.ivanwilliamharsono.com/storage/dd04d9a6-01fe-4eea-a2b2-8b190618e055/Profile-Picture.jpg' roundedCircle width={100} height={100}/></center>
                <Container className='mb-5 mt-4'>
                <Row>
                  <Col>Name</Col>
                  <Col className='data-style'>Gidion Simanjuntak</Col>
                </Row>
                <Row>
                  <Col>Phone</Col>
                  <Col className='data-style'>085778899001</Col>
                </Row>
                <Row>
                  <Col>Email</Col>
                  <Col className='data-style'>gidionsiman@gmail.com</Col>
                </Row>
                <Row>
                  <Col>Graduation Year</Col>
                  <Col className='data-style'>2015</Col>
                </Row>
                <Row>
                  <Col>Address</Col>
                  <Col className='data-style'>Malang</Col>
                </Row>
                <Row>
                  <Col>Latitude</Col>
                  <Col className='data-style'>-7.955016997867799</Col>
                </Row>
                <Row>
                  <Col>Longitude</Col>
                  <Col className='data-style'>112.61331307869033</Col>
                </Row>
                </Container>

                <center><Button variant='danger'>Edit</Button></center>
            </Container>
        </header>
    </div>
  )
}

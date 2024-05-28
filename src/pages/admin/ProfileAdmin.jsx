import { Col, Container, Image, Row } from 'react-bootstrap'
import NavbarAdmin from '../../components/navbar/NavbarAdmin'

export default function ProfileAdmin() {
  return (
    <div>
      <NavbarAdmin/>
      <Container className='profile-alumni-card'>
                <center><h4 className='mb-4'>Account Information</h4></center>
                <center><Image src='https://ivanmd.ivanwilliamharsono.com/storage/dd04d9a6-01fe-4eea-a2b2-8b190618e055/Profile-Picture.jpg' roundedCircle width={100} height={100}/></center>
                <Container className='mb-3 mt-4'>
                <Row>
                  <Col>Name</Col>
                  <Col className='data-style'>Admin</Col>
                </Row>
                <Row>
                  <Col>Phone</Col>
                  <Col className='data-style'>085778899001</Col>
                </Row>
                <Row>
                  <Col>Email</Col>
                  <Col className='data-style'>adminAremanest@gmail.com</Col>
                </Row>
                </Container>
            </Container>
    </div>
  )
}

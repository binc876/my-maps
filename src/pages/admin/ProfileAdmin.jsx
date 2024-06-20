import { Col, Container, Image, Row } from 'react-bootstrap'
import NavbarAdmin from '../../components/navbar/NavbarAdmin'

export default function ProfileAdmin() {
  return (
    <div>
      <NavbarAdmin/>
      <Container className='profile-alumni-card'>
        <center><h4 className='mb-4'>Account Information</h4></center>
        <center><Image src='https://i.pinimg.com/564x/a1/aa/d3/a1aad38ae44fe72e6ae88babc2c633ab.jpg' roundedCircle width={100} height={100}/></center>
        <Container className='mb-3 mt-4'>
          <Row>
            <Col>Name</Col>
            <Col className='data-style'>Admin</Col>
          </Row>
          <Row>
            <Col>Phone</Col>
            <Col className='data-style'>085112233445</Col>
          </Row>
          <Row>
            <Col>Email</Col>
            <Col className='data-style'>admin@gmail.com</Col>
          </Row>
        </Container>
      </Container>
    </div>
  )
}

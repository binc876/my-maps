import { Col, Container, Row } from 'react-bootstrap'
import NavbarAdmin from "../../components/navbar/NavbarAdmin"
import AlumniCard from '../../components/AlumniCard'
import AlumniVerification from '../../components/AlumniVerification'

import './admin.css'

export default function ListAlumni() {
  return (
    <div>
      <NavbarAdmin/>
      <Container className='mt-5'>
        <Row>
          <Col md={8}>
            <center className='mb-3'><h4>Alumni List</h4></center>
            <AlumniCard/>
          </Col>
          <Col md={4}>
            <center><h5>Verify Alumni Registration</h5></center>
            <AlumniVerification/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

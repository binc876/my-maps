import { Col, Container, Row } from 'react-bootstrap'
import NavbarAdmin from "../../components/navbar/NavbarAdmin"
import AlumniCard from '../../components/AlumniCard'

import './admin.css'

export default function ListAlumni() {
  return (
    <div>
      <NavbarAdmin/>
      <Container className='mt-5'>
        <Row className=''>
          <Col lg='7' className='alumni-list-card mb-4'>
            <center><h5>Alumni List</h5></center>
            <AlumniCard/>
          </Col>
          <Col lg='4' className='verif-list-card mb-4'>
            <center><h5>Verify Alumni Registration</h5></center>
            </Col>
        </Row>
      </Container>
    </div>
  )
}

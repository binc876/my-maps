import { Col, Container, Row } from 'react-bootstrap'
import { AlumniProvider } from '../../components/alumniList/AlumniContext'
import NavbarAdmin from "../../components/navbar/NavbarAdmin"
import AlumniTable from '../../components/alumniList/AlumniTable'
import AlumniCard from '../../components/alumniList/AlumniCard'
import './admin.css'

export default function ListAlumni() {
  return (
    <AlumniProvider>
    <div className='alumni-list'>
      <NavbarAdmin/>
      <Container className='mt-5'>
        <Row>
          <Col lg='8'>
            <center className='mb-3'><h4>Alumni List</h4></center>
            <AlumniTable/>
          </Col>
          <Col lg='4'>
            <center><h5>Verify Alumni Registration</h5></center>
            <AlumniCard/>
          </Col>
        </Row>
      </Container>
    </div>
    </AlumniProvider>
  )
}

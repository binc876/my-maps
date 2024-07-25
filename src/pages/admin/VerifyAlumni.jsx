import { Container } from 'react-bootstrap'
import { AlumniProvider } from '../../components/alumniList/AlumniContext'
import NavbarAdmin from "../../components/navbar/NavbarAdmin"
import AlumniCard from '../../components/alumniList/AlumniCard'
import './admin.css'

export default function VerifyAlumni() {
  return (
    <AlumniProvider>
    <div className='alumni-list'>
      <NavbarAdmin/>
      <Container className='mt-4'>
        <center className='mb-3'><h5>Verify Alumni Registration</h5></center>
        <AlumniCard/>
      </Container>
    </div>
    </AlumniProvider>
  )
}

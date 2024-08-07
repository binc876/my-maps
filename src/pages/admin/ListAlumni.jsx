import { Container } from 'react-bootstrap'
import { AlumniProvider } from '../../components/alumniList/AlumniContext'
import NavbarAdmin from "../../components/navbar/NavbarAdmin"
import AlumniTable from '../../components/alumniList/AlumniTable'
import './admin.css'

export default function ListAlumni() {
  return (
    <AlumniProvider>
    <div className='alumni-list'>
      <NavbarAdmin/>
      <Container className='mt-4'>
        <center className='mb-3'><h4>Alumni List</h4></center>
        <AlumniTable/>
      </Container>
    </div>
    </AlumniProvider>
  )
}

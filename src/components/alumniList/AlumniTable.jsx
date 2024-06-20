import { useAlumni } from './AlumniContext'
import { Table } from 'react-bootstrap'

export default function AlumniTable() {
    const { alumniList } = useAlumni()

  return (
    <div>
        <Table>
            <thead className='table-success'>
                <tr>
                    <th>Name</th>
                    <th>Graduation Year</th>
                    <th>Address</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
            </thead>
            <tbody>
                {alumniList.map(alumni => (
                    <tr key={alumni.id}>
                        <td>{alumni.name}</td>
                        <td>{alumni.user_detail.graduation_year}</td>
                        <td>{alumni.user_detail.address}</td>
                        <td>{alumni.user_detail.lat}</td>
                        <td>{alumni.user_detail.long}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </div>
  )
}

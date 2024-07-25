import { useState } from 'react'
import { useAlumni } from './AlumniContext'
import { Button, Col, Image, Modal, Row, Table } from 'react-bootstrap'
import { Trash } from 'react-bootstrap-icons'
import { env } from '../../../config'

export default function AlumniTable() {
    const { alumniList, deleteAlumni } = useAlumni()
    const [showModal, setShowModal] = useState(false)
    const [selectedAlumni, setSelectedAlumni] = useState(null)

    const handleClose = () => setShowModal(false)

    const handleShow = (alumni) => {
        setSelectedAlumni(alumni)
        setShowModal(true)
    }

    const handleDelete = () => {
        deleteAlumni(selectedAlumni.id)
        setShowModal(false)
    }

  return (
    <div>
      <Table>
        <thead className='table-success'>
          <tr>
            <th>Name</th>
            <th></th>
            <th>Graduation Year</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {alumniList.map(alumni => (
            <tr key={alumni.id}>
              <td>
                <Image className='table-image'
                  src={env.BACKEND_ASSET_URL + '/' + alumni.user_detail.image_url} 
                  onError={(e) => {
                    e.target.onError = null
                    e.target.src = 'https://i.pinimg.com/564x/28/c2/0b/28c20b3bf4e1a48334b2278d3c7fb447.jpg'
                  }}
                  roundedCircle
                  width={50}
                  height={50}
                  style={{margin: '10px'}}
                />
              </td>
              <td>
                {alumni.name}
              </td>
              <td>{alumni.user_detail.graduation_year}</td>
              <td>{alumni.user_detail.mobile}</td>
              <td>{alumni.email}</td>
              <td>{alumni.user_detail.address}</td>
              <td>{alumni.user_detail.lat}</td>
              <td>{alumni.user_detail.long}</td>
              <td>
                <Trash
                  style={{cursor: 'pointer', color: 'red'}}
                  onClick={() => handleShow(alumni)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAlumni && (
            <>
            <p>Are you sure you want to delete this alumni record?</p>
            <Row>
              <Col>
                <Image
                  src={env.BACKEND_URL + '/' + selectedAlumni.user_detail.image_url} 
                  onError={(e) => {
                    e.target.onError = null
                    e.target.src = 'https://i.pinimg.com/564x/28/c2/0b/28c20b3bf4e1a48334b2278d3c7fb447.jpg'
                  }}
                  rounded
                  width={'90%'}
                  style={{margin: '10px'}}
                />
              </Col>
              <Col>
                <b>Name : </b>{selectedAlumni.name}<br/>
                <b>Email : </b>{selectedAlumni.email}<br/>
                <b>Phone : </b>{selectedAlumni.user_detail.mobile}<br/>
                <b>Graduation Year : </b>{selectedAlumni.user_detail.graduation_year}<br/>
                <b>Address : </b>{selectedAlumni.user_detail.address}<br/>
                <b>Latitude : </b>{selectedAlumni.user_detail.lat}<br/>
                <b>Longitude : </b>{selectedAlumni.user_detail.long}
              </Col>
            </Row>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Cancel</Button>
          <Button variant='danger' onClick={handleDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

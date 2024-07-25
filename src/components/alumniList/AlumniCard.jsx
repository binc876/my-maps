import { useState } from 'react'
import { useAlumni } from './AlumniContext'
import { Button, Card, CardBody, Col, Image, Modal, Row } from 'react-bootstrap'
import { env } from '../../../config'

import heroMail from '../../assets/heroMail.svg'

export default function AlumniCard() {
  const { pendingAlumni, verifyAlumni, rejectAlumni } = useAlumni()
  const [showModal, setShowModal] = useState(false)
  const [actionType, setActionType] = useState('')
  const [selectedAlumni, setSelectedAlumni] = useState(null)

  if (pendingAlumni.length === 0) {
    return (
      <header>
        <center>
          <Col>
            <Image 
              className='mt-4 mb-4'
              src={heroMail}
              md={50}
              width={'30%'}
            />
          </Col>
        </center>
        <div className='text-center mb-4'><p>Tidak ada akun yang perlu di verifikasi</p></div><br/>
      </header>
    )
  }

  const handleClose = () => setShowModal(false)
  const handleShow = (action, alumni) => {
    setActionType(action)
    setSelectedAlumni(alumni)
    setShowModal(true)
  }
  const handleConfirm = () => {
    if (actionType === 'verify') {
      verifyAlumni(selectedAlumni.id)
    } else if (actionType === 'reject') {
      rejectAlumni(selectedAlumni.id)
    }
    setShowModal(false)
  }

  return (
    <div>
      <Row xs={1} md={4} className='g-4'>
        {pendingAlumni.map((alumni, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img
                variant='top'
                src={env.BACKEND_URL + '/' + alumni.userDetail.image_url}
                onError={(e) => {
                  e.target.onError = null
                  e.target.src = 'https://i.pinimg.com/564x/28/c2/0b/28c20b3bf4e1a48334b2278d3c7fb447.jpg'
                }}
              />
              <CardBody>
                <Card.Title><h4>{alumni.name}</h4></Card.Title>
                <Card.Text>
                  <b>Email : </b>{alumni.email}<br/>
                  <b>Phone : </b>{alumni.userDetail.mobile}<br/>
                  <b>Graduation Year : </b>{alumni.userDetail.graduation_year}<br/>
                  <b>Address : </b>{alumni.userDetail.address}<br/>
                </Card.Text>
              </CardBody>
              <Card.Footer>
                <Button variant='success' onClick={() => handleShow('verify', alumni)}>Verify</Button>{' '}
                <Button variant='danger' onClick={() => handleShow('reject', alumni)}>Reject</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAlumni && (
            <>
            <p>Are you sure you want to <b style={{color: 'red'}}>{actionType}</b> this alumni?</p>
            <Row>
              <Col>
                <Image
                  src={env.BACKEND_URL + '/' + selectedAlumni.userDetail.image_url} 
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
                <b>Phone : </b>{selectedAlumni.userDetail.mobile}<br/>
                <b>Graduation Year : </b>{selectedAlumni.userDetail.graduation_year}<br/>
                <b>Address : </b>{selectedAlumni.userDetail.address}
              </Col>
            </Row>
            
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Cancel</Button>
          <Button variant='primary' onClick={handleConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
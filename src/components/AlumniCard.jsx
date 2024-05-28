/* eslint-disable react/prop-types */
import { Card, Col, Container, Image, Row } from 'react-bootstrap'

const alumniData = [
    {
        name: "Gidion Simanjuntak",
        classOf: "2015",
        address: "Malang",
        latitude: -7.955016997867799,
        longitude: 112.61331307869033,
        photo: "https://ivanmd.ivanwilliamharsono.com/storage/dd04d9a6-01fe-4eea-a2b2-8b190618e055/Profile-Picture.jpg"
    },
    {
        name: "Raka Bagaskara",
        classOf: "2016",
        address: "Semarang",
        latitude: -6.994192568433753,
        longitude: 110.40750739263508,
        photo: "https://rsjpparamarta.com/images/dr-alvi-muldani-i2.png"
    },
    {
        name: "Narendra Wibisono",
        classOf: "2017",
        address: "Bandung",
        latitude: -6.952387738826554,
        longitude: 107.58635459314554,
        photo: "https://rsjpparamarta.com/images/dr-achmad-fitrah-khalid-spjp-8B.png"
    },
    {
        name: "Gidion Simanjuntak",
        classOf: "2015",
        address: "Malang",
        latitude: -7.955016997867799,
        longitude: 112.61331307869033,
        photo: "https://ivanmd.ivanwilliamharsono.com/storage/dd04d9a6-01fe-4eea-a2b2-8b190618e055/Profile-Picture.jpg"
    },
    {
        name: "Raka Bagaskara",
        classOf: "2016",
        address: "Semarang",
        latitude: -6.994192568433753,
        longitude: 110.40750739263508,
        photo: "https://rsjpparamarta.com/images/dr-alvi-muldani-i2.png"
    },
    {
        name: "Narendra Wibisono",
        classOf: "2017",
        address: "Bandung",
        latitude: -6.952387738826554,
        longitude: 107.58635459314554,
        photo: "https://rsjpparamarta.com/images/dr-achmad-fitrah-khalid-spjp-8B.png"
    }
]

export default function AlumniCard() {
  return (
    <div>
        <Container className='alumni-item mt-4'>
            <Row xs={1} md={3} className='g-4'>
                {alumniData.map((alumni) => {
                    return (
                        <Container key={alumni.id} className='mb-4'>
                            {/* <img src={alumni.photo} width={30} height={30} className='mb-3'/>
                            <Col>
                                <p>{alumni.name}</p>
                                <p>{alumni.classOf}</p>
                                <p>{alumni.address}</p>
                            </Col> */}

                            <Card>
                                <Card.Img variant='top' src={alumni.photo}/>
                                <Card.Body>
                                    <Card.Title>{alumni.name}</Card.Title>
                                    <Card.Text>
                                        <p>{alumni.name}</p>
                                        <p>{alumni.classOf}</p>
                                        <p>{alumni.address}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Container>
                    )
                })}   
            </Row>
        </Container>
    </div>
  )
}

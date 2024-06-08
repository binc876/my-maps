import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Card } from 'react-bootstrap'
import 'leaflet/dist/leaflet.css'
import './Component.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { env } from '../../config'

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
    }
]

export default function Map() {
    const [alumniDataApi, setAlumniDataApi] = useState([])

    useEffect(() => {
        axios.get(env.BACKEND_URL+'/api/user/list', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => response.data.data)
            .then((data) => {
                setAlumniDataApi(data)
                console.log(alumniDataApi)
            })
    }, [])

    return (
        <MapContainer center={[-7.955016997867799, 112.61331307869033]} zoom={5} style={{height: '92vh', width: '100%'}}>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {alumniDataApi.map((alumni, idx) => (
                <Marker key={idx} position={[alumni.user_detail.lat, alumni.user_detail.long]}>
                    <Popup>
                        <Card style={{width: '15rem'}}>
                            <Card.Img variant='top' src={alumni.user_detail.photo}/>
                            <Card.Body>
                                <Card.Title>{alumni.user_detail.name}</Card.Title>
                                <Card.Text>{alumni.user_detail.classOf} | {alumni.user_detail.address}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Card } from 'react-bootstrap'
import 'leaflet/dist/leaflet.css'
import './Component.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { env } from '../../config'
import { Icon } from 'leaflet'
import marker from '../../src/assets/marker-icon.png'

export default function Map() {
    const [alumniDataApi, setAlumniDataApi] = useState([])

    useEffect(() => {
        axios.get(env.BACKEND_URL+'/api/authenticated/user/list', {
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

    const mark = new Icon({
        iconUrl: marker,
        iconSize: [15, 25],
    });

    return (
        <MapContainer center={[-7.955016997867799, 112.61331307869033]} zoom={5} style={{height: '92vh', width: '100%'}}>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {alumniDataApi.map((alumni, idx) => (
                <Marker key={idx} icon={mark} position={[alumni.user_detail.lat, alumni.user_detail.long]}>
                    <Popup>
                        <Card style={{width: '15rem'}}>
                            <Card.Img variant='top' src={alumni.user_detail.image_url}/>
                            <Card.Body>
                                <Card.Title>{alumni.name}</Card.Title>
                                <Card.Text>{alumni.user_detail.graduation_year} | {alumni.user_detail.address}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
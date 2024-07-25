/* eslint-disable react-hooks/exhaustive-deps */
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Card } from 'react-bootstrap'
import 'leaflet/dist/leaflet.css'
import './Component.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { env } from '../../config'
import { Icon } from 'leaflet'
import { Whatsapp } from 'react-bootstrap-icons'

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
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const formatPhoneNumber = (number) => {
        if (number.startsWith('0')) {
            return '62' + number.slice(1)
        }
        return number
    }

    return (
        <MapContainer center={[-7.955016997867799, 112.61331307869033]} zoom={5} style={{height: '92vh', width: '100%'}}>
            <TileLayer
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {alumniDataApi.map((alumni, idx) => (
                <Marker key={idx} icon={mark} position={[alumni.user_detail.lat, alumni.user_detail.long]}>
                    <Popup>
                        <Card style={{width: '15rem'}}>
                            <Card.Img 
                                variant='top' 
                                src={env.BACKEND_ASSET_URL + '/' + alumni.user_detail.image_url}
                                onError={(e) => {
                                    e.target.onError = null
                                    e.target.src = 'https://i.pinimg.com/564x/28/c2/0b/28c20b3bf4e1a48334b2278d3c7fb447.jpg'
                                  }}
                            />
                            <Card.Body>
                                <Card.Title>{alumni.name}</Card.Title>
                                <Card.Text>{alumni.user_detail.graduation_year} | {alumni.user_detail.address}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <a href={`https://wa.me/${formatPhoneNumber(alumni.user_detail.mobile)}`} target='_blank' rel='noopener noreferrer'>
                                    <Whatsapp size={25}/>
                                </a>
                            </Card.Footer>
                        </Card>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}
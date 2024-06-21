import { Nav, Navbar } from 'react-bootstrap'
import { Instagram } from 'react-bootstrap-icons'
import './Navbar.css'

export default function BottomNavbar() {
  return (
    <div>
        <Navbar fixed='bottom' bg='dark' variant='dark'>
            <Nav className='mx-auto'>
                <Navbar.Text>Anesthesiology Universitas Brawijaya</Navbar.Text>
                <Navbar.Text><div className='vertical-line'></div></Navbar.Text>
                <Nav.Link href='https://www.instagram.com/anestesibrawijaya/' target='_blank'>
                    <Instagram size={25}/>
                </Nav.Link>
            </Nav>
        </Navbar>
    </div>
  )
}


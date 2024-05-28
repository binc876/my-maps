import { useNavigate } from 'react-router-dom'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import Logo1 from '../../assets/logoUB.png'
import Logo2 from '../../assets/logoAremanest.webp'
import './Navbar.css'

const navMenu = [
  {
    id: 1,
    path: 'dashboard',
    menu: 'Dashboard'
  },
  {
    id: 2,
    path: 'profile-alumni',
    menu: 'Profile'
  }
]

export default function NavbarAlumni () {
  const navigate = useNavigate()

  return (
    <div>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand>
            <img src={Logo1} className='logos'/>
            <img src={Logo2} className='logos'/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav'/>
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='mx-auto'>
              {navMenu.map((menu) => {
                return (
                  <Nav.Link
                    key={menu.id} 
                    onClick={() => navigate('/'+`${menu.path}`)}
                    className={({isActive}) => {
                      return (
                        !isActive ? 'active' : 'active'
                      )
                    }}
                  >
                    {menu.menu}
                  </Nav.Link>
                )
              })}
            </Nav>
            <div>
              <Button variant='danger' className='btn-logout' onClick={() => navigate('/')}>Logout</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

import { Navbar, Nav, Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useUserDetail } from '../utils/useUserDetail'
import { ProtectedComponent } from './protectedComponent'

export const NavbarComponent = () => {
  const { userDetail } = useUserDetail()

  const logout = () => {
    localStorage.removeItem('irk-user')
    // Rerender the page to update the navbar
    window.location.reload()
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-4 mb-4">
      <Navbar.Brand as={Link} to="/">
        Seleksi Lab IRK
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/about">
            About
          </Nav.Link>
          <Nav.Link as={Link} to="/contact">
            Contact
          </Nav.Link>
          <ProtectedComponent allowedRole="assistant">
            <Nav.Link as={Link} to="/manage">
              Manage
            </Nav.Link>
          </ProtectedComponent>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/profile">
            {userDetail.name}
          </Nav.Link>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
        <Image
          src={userDetail.picture}
          alt="Profile Image"
          roundedCircle
          className="ml-2"
          style={{ width: '30px', height: '30px' }}
        />
      </Navbar.Collapse>
    </Navbar>
  )
}

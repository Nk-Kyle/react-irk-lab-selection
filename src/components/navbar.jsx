import React from 'react'
import { Navbar, Nav, Image } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import { useUserDetail } from '../utils/useUserDetail'
import { ProtectedComponent } from './protectedComponent'
import styles from './navbar.module.css'; 

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
          <Nav.Link as={NavLink} exact="true" to="/about">
            About
          </Nav.Link>
          <Nav.Link as={NavLink} exact="true" to="/contact">
            Contact
          </Nav.Link>
          <Nav.Link as={NavLink} exact="true" to="/leaderboard">
            Leaderboard
          </Nav.Link>
          <ProtectedComponent allowedRole="assistant">
            <Nav.Link as={NavLink} exact="true" to="/manage">
              Manage
            </Nav.Link>
          </ProtectedComponent>
        </Nav>
        <Nav>
          <Nav.Link className={styles.username}>{userDetail.name}</Nav.Link>
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

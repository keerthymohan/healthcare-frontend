import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/ContextShare';

function PatientHeader() {
      const {setLoginResponse} = useContext(loginResponseContext)
  
  const[token,settoken] = useState(sessionStorage.getItem('token') || "")
  
  const navigate = useNavigate()

  const userlogout = ()=>{
    token && settoken('')
    token && sessionStorage.removeItem('token')
    token && sessionStorage.removeItem("existingUsers")
    setLoginResponse(false)
    navigate('/')

  }
  return (
    <>
    <Navbar expand="lg" className="bg-light">
      <Container>
        <Navbar.Brand href="/">
        <img src={logo} alt="" style={{ width: '90px', height: '90px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            <Nav.Link href="/patienthome" className='me-md-5'>HOME</Nav.Link> 
            <Nav.Link href="/doctorlist" className='me-md-5'>ALL-DOCTORS</Nav.Link>
            <Nav.Link href="/myappointment" className='me-md-5'>MY-APPOINTMENTS</Nav.Link>
            <NavDropdown title={<FontAwesomeIcon icon={faUserPlus} />} id="basic-nav-dropdown">
              <NavDropdown.Item href="/myProfile">My Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={userlogout} >Logout</NavDropdown.Item>
              
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    </>
  )
}

export default PatientHeader
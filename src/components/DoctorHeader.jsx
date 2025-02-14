import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/ContextShare';

function DoctorHeader() {
      const {setLoginResponse} = useContext(loginResponseContext)
  
    const [dToken, setDToken] = useState(sessionStorage.getItem('dToken') || "")
    const navigate = useNavigate()

    const doctorlogout=()=>{
      dToken && setDToken('')
      dToken && sessionStorage.removeItem('dToken')
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
            
            <Nav.Link href="/doctorappointment" className='me-md-5'>APPOINTMENTS</Nav.Link> 
            <Nav.Link href="/doctorprofile" className='me-md-5'>MY-PROFILE</Nav.Link>
            <button onClick={doctorlogout} className='btn btn-primary p-2 rounded'>LOGOUT</button>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default DoctorHeader
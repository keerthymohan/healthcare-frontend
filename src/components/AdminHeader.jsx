import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/ContextShare';

function AdminHeader() {
      const {setLoginResponse} = useContext(loginResponseContext)
  
  const [aToken,setaToken]= useState(sessionStorage.getItem('aToken') || "")
  const navigate = useNavigate()

  const logout = ()=>{
    aToken && setaToken('')
    aToken && sessionStorage.removeItem('aToken')
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
            
            <Nav.Link href="/adminappointment" className='me-md-5'>APPOINTMENTS</Nav.Link> 
            <Nav.Link href="/adddoctor" className='me-md-5'>ADD-DOCTORS</Nav.Link>
            <Nav.Link href="/admindoctorlist" className='me-md-5'>DOCTOR-LIST</Nav.Link>
            <button onClick={logout} className='btn btn-primary p-2 rounded'>LOGOUT</button>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default AdminHeader
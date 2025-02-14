import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import logo from '../assets/logo.png'

function Header() {
  return (
    <>
        <div className='d-flex bg-secondary'>
                <div className='ms-md-5 ms-2 my-3'>
                    <img src={logo} alt="" style={{ width: '150px', height: '120px' }} />
                </div>
                <div className='container d-flex align-items-center ms-auto me-3 mt-4'>
                    <div className="ms-auto me-md-5 ">
                        <Dropdown>
                            <Dropdown.Toggle variant="primary" id="dropdown-basic"> LOGIN </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/adminlogin" className='text-dark'>ADMIN</Dropdown.Item>
                                <Dropdown.Item href="/doctorlogin" className='text-dark'>DOCTOR</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </div>

                </div>
            </div>
    </>
  )
}

export default Header
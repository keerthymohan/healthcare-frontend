import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Doctors from '../components/Doctors'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import homebg from '../assets/homebg.jpg'

function Home() {
  return (
    <>
    <Header/>
    <div style={{ backgroundImage: `url(${homebg})`, height: '500px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }} >
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.71)', height: '500px' }} >

          <div className="d-flex flex-column justify-content-center align-items-center text-center text-light" style={{ height: '500px', width: '100%' }}>
            <h5 style={{ fontSize: '1.5rem' }}>THE PRESERVATION OF <br /><span className='text-warning' style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>HEALTH</span><br />IS EASIER THAN THE <br /><span className='text-warning' style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>CURE</span><br />OF THE DISEASE</h5>

            <Link to='/login'><button className='mt-3 btn btn-primary rounded-pill p-2 ps-3 pe-3'>Book Appointment <FontAwesomeIcon icon={faArrowRight} className='ms-2' /></button></Link>
          </div>
        </div>

      </div>

      <div className="container mt-5">
            <h1 className='text-center mb-5'>OUR TOP DOCTORS</h1>
            <Doctors/>

            <div className='d-flex align-items-center justify-content-center mt-5'>
                    <Link to='/login'><button className='btn btn-primary p-2 ps-4 pe-4 '>SEE MORE...</button></Link>
                </div>
          </div>


      <Footer/>
    </>
  )
}

export default Home
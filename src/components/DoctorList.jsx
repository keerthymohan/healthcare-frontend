import React, { useEffect, useState } from 'react'
import PatientHeader from './PatientHeader'
// import Doctors from './Doctors'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getAllUserDoctorApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import { serverUrl } from '../services/serviceUrl'

function DoctorList() {
  const [alldoc,setAlldoc] = useState([])
  // const [searchKey,setSearchKey] = useState("")
const [searchKey,setSearchKey] = useState("")
  const getAllUserDoctor = async()=>{
    const result = await getAllUserDoctorApi(searchKey)

    // console.log(result);
    setAlldoc(result.data)

  }
  useEffect(()=>{
    getAllUserDoctor()
  },[])

  useEffect(()=>{
    getAllUserDoctor()
  },[searchKey])


//   useEffect(()=>{
//     getAllUserDoctor()
// },[searchKey])  
  return (
    <>
    <PatientHeader/>
    <div className="my-5">
            <div className="container">
              <div className="row">
                <div className="col-md-4"></div>
                <div className="col-md-4 d-flex">
                  <input onChange={(e)=>setSearchKey(e.target.value)} type="text" placeholder='Specialization' className='form-control shadow' />
                    <FontAwesomeIcon style={{ color: 'lightgray', marginTop: '10px', marginLeft: '-30px' }} icon={faMagnifyingGlass} />
                </div>
                <div className="col-md-4"></div>
              </div>

            </div>
          </div>
          <div className="container">
            <div className="row">
              {alldoc.map((item,index)=>(
                <div className="col-md-3 mt-3" key={index}>
                  <Link to={`/appointment/${item._id}`} style={{ textDecoration: 'none' }}>
                <Card style={{ width: '100%' }}>
                  <Card.Img variant="top" src={`${serverUrl}/upload/${item.image}`} style={{ height: '170px' }} />
                  <Card.Body>
                    <Card.Title className='text-primary fw-bold'>{item.name}</Card.Title>
                    <Card.Text>
                      <p> {item.degree} - {item.speciality}</p>
                      <p>Contact Number : {item.contactnumber}</p>

                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>

                </div>

              ))
                }
            </div>
          {/* <Doctors/> */}
          </div>
    </>
  )
}

export default DoctorList
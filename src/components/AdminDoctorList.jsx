import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import Card from 'react-bootstrap/Card';
import { serverUrl } from '../services/serviceUrl';
import { getAdminDoctorApi } from '../services/allApi';


function AdminDoctorList() {

  const [alldoctor, setAllDoctor] = useState([])
  // console.log(alldoctor);

  const getAllDoctor = async () => {
    const result = await getAdminDoctorApi()
    setAllDoctor(result.data)
  }

  useEffect(() => {
    getAllDoctor()
  }, [])

  return (
    <>
      <AdminHeader />
      <div className='container'>
        <h1 className='mt-5'>All Doctors</h1>
        <div className='mt-5'>
          <div className="row">
            {alldoctor.map((item) => (
              <div className='col-md-3 mt-3'>
                <Card style={{ width: '100%' }}>
                  <Card.Img variant="top" src={`${serverUrl}/upload/${item.image}`} style={{ height: '200px' }} />
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      <h6>{item.degree} - {item.speciality}</h6>
                      <p>{item.contactnumber}</p>

                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>

            ))}


          </div>


        </div>
      </div>
    </>
  )
}

export default AdminDoctorList
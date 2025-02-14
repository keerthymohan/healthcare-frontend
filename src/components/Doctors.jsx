import React, { useEffect, useState } from 'react'
import { getDoctorListApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { serverUrl } from '../services/serviceUrl'
import Card from 'react-bootstrap/Card';


function Doctors() {

  const [doctor, setDoctor] = useState([])
  const getDoctorData = async () => {
    const result = await getDoctorListApi()
    // console.log(result);

    setDoctor(result.data)
}
useEffect(() => {
    getDoctorData()
}, [])

  return (
    <>
      <div className="container">
        <div className="row">
          {doctor.slice(0, 8).map((item, index) => (

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

      </div>
    </>
  )
}

export default Doctors
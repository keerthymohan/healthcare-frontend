import React, { useEffect, useState } from 'react'
import PatientHeader from '../components/PatientHeader'
import { serverUrl } from '../services/serviceUrl';
import axios from 'axios';
import Documents from '../components/Documents';

function Myprofile() {
  const [userData, setUserData] = useState({})
  console.log(userData);

  const userProfileData = async () => {
    try {
      const token = sessionStorage.getItem("token")
      const result = await axios.get(`${serverUrl}/get-profile`, { headers: { Authorization: `Bearer ${token}` } })
      // console.log(result);
      if (result?.data) {
        setUserData(result.data.userData)
      }


    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    userProfileData()
  }, [])
  return (
    <>
    <PatientHeader/>
    {userData &&
        <div className='container mt-5 '>
          <h4 className='mb-4 text-primary fw-bold'>MY PPROFILE</h4>
          <h6>Name : {userData?.patientname}</h6>
          <h6>Email : {userData?.email}</h6>
          <h6>Phone Number : {userData?.mobileNumber}</h6>

          <div className='mt-4'>
            <Documents/>
          </div>
        </div>
        

      }

    </>
  )
}

export default Myprofile
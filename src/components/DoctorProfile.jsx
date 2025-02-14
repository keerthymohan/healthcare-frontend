import React, { useEffect, useState } from 'react'
import { serverUrl } from '../services/serviceUrl'
import axios from 'axios'
import DoctorHeader from './DoctorHeader'
import { ToastContainer, toast } from 'react-toastify';


function DoctorProfile() {

    const [dToken, setDToken] = useState(sessionStorage.getItem('dToken') || "")

    const [profileData, setProfileData] = useState(false)
    const getProfileData = async () => {
        try {
            const result = await axios.get(`${serverUrl}/doctor-profile`, { headers: { Authorization: `Bearer ${dToken}` } })
            if (result.status == 200) {
                setProfileData(result.data.profileData)
                //   console.log(result.data.profileData);

            }

        } catch (error) {
            toast.error(`something went wrong`)
        }
    }
    useEffect(() => {
        if (dToken) {
            getProfileData()
        }
    }, [dToken])
    return (
        <>
            <DoctorHeader />
            <div className='container  p-4 my-5'>
                <div className="row ">
                    <div className="col-md-2"></div>

                    <div className="col-md-7 border p-3">
                        <div>
                            <img src={`${serverUrl}/upload/${profileData.image}`} alt="" style={{ height: '170px' }} />
                        </div>
                        <div className='container mt-4 p-4 bg-light'>

                            <h4 className='text-primary fw-bold '>{profileData.name} </h4>
                            <div className='d-flex align-items-center'>
                                <h5>{profileData.degree} - {profileData.speciality} </h5>
                                <p className='border ms-3 rounded ps-2 pe-2' >{profileData.experience} </p>
                            </div>

                            <div>
                                <h5>About :</h5>
                                <p>{profileData.about}</p>
                                <h5>Appointment Fee : ₹ <span className='text-primary'>{profileData.fees}</span></h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>


            </div>
            <ToastContainer position='top-center' autoClose={2000} theme="colored" />

        </>
    )
}

export default DoctorProfile
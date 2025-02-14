import React, { useEffect, useState } from 'react'
import PatientHeader from '../components/PatientHeader'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { serverUrl } from '../services/serviceUrl';


function MyAppointment() {
  const [token, settoken] = useState(sessionStorage.getItem('token') || "")
  const [appointment, setappointment] = useState([])

  const getUserApointments = async () => {
    try {
      const result = await axios.get(`${serverUrl}/userappointment`,{headers : {Authorization: `Bearer ${token}`}})

      // console.log(result);
      if(result.status == 200){
        setappointment(result.data.appointment.reverse())
        console.log(result.data.appointment);
        
      }
      

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    getUserApointments()
  },[])
  return (
    <>
      <PatientHeader />
      <div className="container  p-3 ">
        <h4 className='fw-bold mb-4 mt-4'>ALL APPOINTMENTS</h4>
        <div className='table-responsive'>

          <table className='border w-100 '>
            <thead className='bg-primary text-center'>
              <tr>
                <th className='p-3'>#</th>
                <th className='p-3'>Doctor Name</th>
                <th className='p-3'>Specialization</th>
                <th className='p-3'>Date and Time</th>
                <th className='p-3'>Action</th>
              </tr>
            </thead>
            {appointment.map((item,index)=>(
              <tbody className='text-center'>
              <tr>
                <td className="p-3">{index+1} </td>
                <td className="p-3">{item.docData.name}
                </td>
                <td className='p-3'>{item.docData.speciality}</td>
                <td className='p-3'>{item.slotDate} || {item.slotTime} </td>
                <td className='p-3'>
                    {!item.cancel && !item.isCompleted && <button onClick={()=>cancelAppointment(item._id)} className='btn btn-danger rounded p-2 ps-2 pe-2 '>Cancel Appointment</button>}
                    {item.cancel && !item.isCompleted && <button className='btn  rounded p-2 ps-2 pe-2 '>Appointment cancelled</button>}
                    {item.isCompleted && <p className='text-success'>Completed</p>}
                    </td>

              </tr>
            </tbody>

            ))
              }

          </table>


        </div>

      </div>

      <ToastContainer position='top-center' autoClose={2000} theme="colored" />
    </>
  )
}

export default MyAppointment
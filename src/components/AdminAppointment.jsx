import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import axios from 'axios'
import { serverUrl } from '../services/serviceUrl'
import { ToastContainer, toast } from 'react-toastify';

function AdminAppointment() {
  const [aToken, setaToken] = useState(sessionStorage.getItem('aToken') || "")
  const [appointment, setAppointment] = useState([])

  const getAllAppointment = async () => {
    try {
      const result = await axios.get(`${serverUrl}/admin-appointment`,{headers: {Authorization: `Bearer ${aToken}` }})
      // console.log(result);
      if(result.status == 200){
        setAppointment(result.data.appointment.reverse())
        console.log(result.data.appointment);
        
      }else{
        toast.error(result.data.message)
        
      }
      

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }
  useEffect(()=>{
    if(aToken){
      getAllAppointment()
    }

  },[aToken])
  return (
    <>
      <AdminHeader />
      <div className="container my-5 p-3 ">
        <h4 className='fw-bold mb-4'>ALL APPOINTMENTS</h4>
        <div className='table-responsive'>
          <table className='border w-100 '>
            <thead className='bg-primary text-center'>
              <tr>
                <th className='p-3'>#</th>
                <th className='p-3'>Patient Name</th>
                <th className='p-3'>Doctor</th>
                <th className='p-3'>Date and Time</th>
                <th className='p-3'>Fees</th>
                <th className='p-3'>Action</th>

              </tr>
            </thead>
            {appointment.map((item,index)=>(
              <tbody className='text-center'>

              <tr>
              <td className='p-3'>{index+1}</td>
              <td className='p-3'>{item.userData.patientname}</td>
              <td className='p-3'>{item.docData.name} </td>
              <td className='p-3'>{item.slotDate} , {item.slotTime} </td>
              <td className='p-3'>₹ {item.amount}</td>
              <td>
                    {item.cancel?
                    <p className='text-danger'> Cancelled</p>
                    : item.isCompleted?<p className='text-success'> Completed</p>:
                    <p className='text-warning'> Booked</p>
                    
                    }
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

export default AdminAppointment
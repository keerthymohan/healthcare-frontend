import React, { useEffect, useState } from 'react'
import DoctorHeader from './DoctorHeader'
import axios from 'axios'
import { serverUrl } from '../services/serviceUrl'
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';

function DoctorAppointment() {

  const [dToken, setDToken] = useState(sessionStorage.getItem('dToken') || "")
  const [appointment, setAppointment] = useState([])

  const getAppointments = async()=>{
    try{
      const result = await axios.get(`${serverUrl}/doctor-appointment`,{ headers: { Authorization: `Bearer ${dToken}` } })
      console.log(result);
      
      if(result.status == 200){
        setAppointment(result.data.appointment.reverse())
        console.log(result.data.appointment);
        
      } else {

        toast.error(result.data.message)

      }

    }catch (error) {
      toast.error(`something went wrong`)
    }
  }

  const completeAppointment = async(appointmentId)=>{
    try{
      const result = await axios.post(`${serverUrl}/complete-appointment`,{appointmentId},{ headers: { Authorization: `Bearer ${dToken}` } })

      if(result.status == 200){
        toast.success('Apointment Completed')
        getAppointments()
      }else {
        toast.error(result.data.message)
      }
    }catch (error) {
      toast.error(`something went wrong`)
    }

  }



  const cancelAppointment = async(appointmentId)=>{
    try{
      const result = await axios.post(`${serverUrl}/cancel-doctorappointment`,{appointmentId},{ headers: { Authorization: `Bearer ${dToken}` } })

      if(result.status == 200){
        toast.success('Apointment Cancelled')
        getAppointments()
      }else {

        toast.error(result.data.message)

      }


    }catch (error) {
      toast.error(`something went wrong`)
    }

  }


  useEffect(()=>{
    if(dToken){
      getAppointments()
    }
    },[dToken])
  return (
    <>
    <DoctorHeader/>

    <div className="container my-3 p-3 ">
            <h4 className='fw-bold mb-4'>ALL APPOINTMENTS</h4>
             <div className='table-responsive'>
                <table className='border w-100 '>
                  <thead className='bg-primary text-center'>
                    <tr>
                    <th className='p-3 '>#</th>
                      <th className='p-3'>Patient Name</th>
                      <th className='p-3'>Date and Time</th>
                      <th className='p-3'>Fees</th>
                      <th className='p-3'>Action</th>
    
                    </tr>
                  </thead>
                  
                   {appointment.map((item,index)=>(
                    <tbody className='text-center'>
      
                    <tr>
                      <td className='p-3'>{index+1}</td>
                      <td className='p-3'>{item.userData.patientname
                      } </td>
                      <td className='p-3'>{item.slotDate
                      } , {item.slotTime} </td>
                      <td className='p-3'>₹ {item.amount
                      }</td>
                      <td>
                        {item.cancel?
                        <p className='text-danger'>Cancelled</p>
                        : item.isCompleted ?
                        <p className='text-success'>Completed</p>:
                        <div className='d-flex align-items-center justify-content-evenly'>
                        <button onClick={()=>completeAppointment(item._id)}  className='btn rounded-pill ps-3 pe-3 btn-light'><FontAwesomeIcon icon={faCheck} /></button>
                          
                         
                          <button onClick={()=>cancelAppointment(item._id)}  className='btn rounded-pill ps-3 pe-3 btn-light '><FontAwesomeIcon icon={faXmark} /></button>
                      </div>
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

export default DoctorAppointment
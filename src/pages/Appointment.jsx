import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom'
import { getDoctorListApi } from '../services/allApi'
import PatientHeader from '../components/PatientHeader'
import { serverUrl } from '../services/serviceUrl'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios'


function Appointment() {
  const navigate = useNavigate()
  const [token, settoken] = useState(sessionStorage.getItem('token') || "")

  // console.log(token);
  const [doctors, setDoctors] = useState([])

  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const daysofWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const getDoctorData = async () => {
    const result = await getDoctorListApi()
    setDoctors(result.data)
  }
  useEffect(() => {
    getDoctorData()
  }, [])

  const { docId } = useParams()
  // console.log(docId);

  const [doctorinfo, setdocinfo] = useState({})
  const fetchdoctorInfo = async () => {
    const doctorinfo = doctors.find(doc => doc._id == docId)
    setdocinfo(doctorinfo)
    // console.log(doctorinfo);
  }

  useEffect(() => {
    getAvailableSlots()
  }, [doctorinfo])

  useEffect(() => {
    fetchdoctorInfo()
  }, [doctors, docId])

  const getAvailableSlots = async () => {
    setDocSlots([])
    // get current date
    let today = new Date()
    for (let i = 1; i <= 7; i++) {
      // getting date with index
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      // set end time of the date with index
      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(20, 0, 0, 0)

      // setting hours
      if (today.getDate() == currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 15 ? currentDate.getHours() + 1 : 15)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(15)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })


        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()
        const slotDate = `${day}-${month}-${year}`
        // console.log(slotDate);
        const slotTime = formattedTime
        // console.log(slotTime);
        const isSlotAvailable = doctorinfo.slots_booked[slotDate] && doctorinfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {

          // add slot to array
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })

        }


        // increment current time by 30 minute
        currentDate.setMinutes(currentDate.getMinutes() + 30)

      }
      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warning('Login to book appoitment')
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()
      const slotDate = `${day}-${month}-${year}`
      // console.log(slotDate);

      const result = await axios.post(`${serverUrl}/book-appointment`, { docId, slotDate, slotTime }, { headers: { Authorization: `Bearer ${token}` } })
      // console.log(result);
      if (result.status == 200) {
        toast.success(result.data.message)
        getDoctorData()
        setTimeout(() => {
          navigate('/myappointment')

        }, 2000)

      } else {
        toast.error(result.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  }


  useEffect(() => {
    console.log(docSlots);
  }, [docSlots])



  return (
    <>
      <PatientHeader />
      {doctorinfo &&
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 border border-primary p-4 mt-5">

              <div className='d-md-flex align-items-center '>
                <img src={`${serverUrl}/upload/${doctorinfo.image}`} alt="" style={{ height: '300px', width: '290px' }} />

                <div className='ms-md-5 mt-md-0 mt-4'>
                  <h2 className='text-primary fw-bold'>{doctorinfo.name}</h2>
                  <div className='d-flex align-items-center '>
                    <p>{doctorinfo.degree} - {doctorinfo.speciality}</p>
                    <p className=' border ms-3 ps-2 pe-2 rounded'>{doctorinfo.experience}</p>
                  </div>
                  <p>Contact Number : {doctorinfo.contactnumber}</p>
                </div>

              </div>
              <hr />

              <div>
                <h4>ABOUT</h4>
                <p>{doctorinfo.about}</p>
                <h4>Appointment Fee: ₹ <span className='text-primary'>{doctorinfo.fees}</span> </h4>
              </div>

            </div>

            <div className="row">
              <div className="col-md-2"></div>
              <div className="col-md-8">

                <h4 className='mt-5'>BOOKING SLOTS</h4>
                <div className='d-flex gap-3 align-items-center w-full mt-5 overflow-auto '>
                  {docSlots.length && docSlots.map((item, index) => (
                    <div onClick={() => setSlotIndex(index)} className={`text-center p-3 rounded-pill cursor-pointer ${slotIndex == index ? 'bg-primary text-light' : 'bg-light'}`} key={index}>
                      <p>{item[1] && daysofWeek[item[0].datetime.getDay()]} </p>
                      <p>{item[1] && item[0].datetime.getDate()} </p>

                    </div>
                  ))}

                </div>

                <div className='d-flex align-items-center gap-3 w-full overflow-auto mt-5'>
                  {docSlots.length && docSlots[slotIndex].map((item, index) => (
                    <p onClick={() => setSlotTime(item.time)} className={`fs-6 rounded-pill flex-shrink-0  cursor-pointer ${item.time == slotTime ? 'bg-primary text-light' : 'bg-light'} border border-info p-3`} key={index}>
                      {item.time.toLowerCase()}
                    </p>
                  ))}

                </div>
                <button onClick={bookAppointment} className='btn btn-primary ps-4 pe-4 rounded-pill mt-5'>BOOK APPOINTMENT</button>

              </div>
              <div className="col-md-2"></div>
            </div>

            <div className="col-md-2"></div>

          </div>
        </div>
      }
      <Footer />
      <ToastContainer position='top-center' autoClose={2000} theme="colored" />
    </>
  )
}

export default Appointment
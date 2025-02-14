import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import { useNavigate } from 'react-router-dom'
import { addDoctorApi } from '../services/allApi'
import profileicon from '../assets/profileicon.png'
import { ToastContainer, toast } from 'react-toastify';



function AddDoctor() {
  const navigate = useNavigate()
  const [preview, setPreview] = useState("")

  const [aToken, setAToken] = useState(sessionStorage.getItem('aToken') || "")
// console.log(aToken);
const [key, setKey] = useState(1)
const [doctordetails, setDoctorDetails] = useState({
  name: "",
  speciality: "Dermatologist",
  email: "",
  password: "",
  degree: "",
  experience: "1 year",
  fees: "",
  contactnumber: "",
  about: "",
  image: ""
})
// console.log(doctordetails);

const handleFile = (e) => {
  setDoctorDetails({ ...doctordetails, image: e.target.files[0] })
}
useEffect(() => {
  if (doctordetails.image) {
    setPreview(URL.createObjectURL(doctordetails.image))

  }
}, [doctordetails.image])

const addDoctor = async()=>{
  const { name, speciality, email, password, degree, experience, fees, contactnumber, about, image } = doctordetails
  if (!name || !speciality || !email || !password || !degree || !experience || !fees || !contactnumber || !about || !image) {
    toast.info('Enter the necessary details')

  }else{
    const reqBody = new FormData()
    reqBody.append("name", name)
    reqBody.append("speciality", speciality)
    reqBody.append("email", email)
    reqBody.append("password", password)
    reqBody.append("degree", degree)
    reqBody.append("experience", experience)
    reqBody.append("fees", fees)
    reqBody.append("contactnumber", contactnumber)
    reqBody.append("about", about)
    reqBody.append("image", image)
    if (aToken) {
      const reqHeader = {
        "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${aToken}`
      }
      const result = await addDoctorApi(reqBody,reqHeader)
      // console.log(result);
      if(result.status == 200){
        toast.success("Doctor added successfully")

        setDoctorDetails({
          name: "",
          speciality: "",
          email: "",
          password: "",
          degree: "",
          experience: "",
          fees: "",
          contactnumber: "",
          about: "",
          image: ""

        })
        setTimeout(() => {
          navigate('/admindoctorlist')
      }, 2000)
        setPreview("")
        if(key==1){
          setKey(0)
        }else{
          setKey(1)
        }
      }else if(result.success == 406){
        result.warning(result.response.data)
      }else{
        toast.error("something went wrong")
      }
    }else{
      toast.warning('please login')
    }
  }
}
useEffect(() => {
  if (sessionStorage.getItem('aToken')) {
    setAToken(sessionStorage.getItem("aToken"))
  }
}, [])

  return (
    <>
    <AdminHeader/>
    <div className='container'>
        <h4 className='fw-bold my-5'>ADD DOCTOR</h4>
        <div className='border p-md-4 p-3'>
          <label htmlFor="doctorimage">
            <input type="file" id='doctorimage' className='d-none' key={key} onChange={(e) => handleFile(e)} />
            <img src={preview?preview: profileicon} alt="" style={{ width: '100px', height: '100px' }} />
            <h6>Upload doctor image</h6>
          </label>
          <div className="d-md-flex mt-4 ">
            <div className='w-100'>
              <label htmlFor="">Full Name</label>
              <input value={doctordetails.name} onChange={(e) => setDoctorDetails({ ...doctordetails, name: e.target.value })} type="text" placeholder='Full Name' className='form-control border rounded mt-2' />
            </div>

            <div className='w-100 ms-md-3 ms-0'>
              <label htmlFor="">Speciality</label>
              <select value={doctordetails.speciality} onChange={(e) => setDoctorDetails({ ...doctordetails, speciality: e.target.value })} name="" id="" className='form-select w-100 border rounded mt-2' style={{ height: '38px' }}>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrician">Pediatrician</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="Pulminologist">Pulminologist</option>
                <option value="Neurologist">Neurologist</option>
              </select>
            </div>
          </div>

          <div className="d-md-flex mt-4 ">
            <div className='w-100'>
              <label htmlFor="">Email</label>
              <input value={doctordetails.email} onChange={(e) => setDoctorDetails({ ...doctordetails, email: e.target.value })} type="text" placeholder='Email' className='form-control border rounded mt-2' />
            </div>

            <div className='w-100 ms-md-3 ms-0'>
              <div className='w-100'>
                <label htmlFor="">Password</label>
                <input value={doctordetails.password} onChange={(e) => setDoctorDetails({ ...doctordetails, password: e.target.value })} type="password" placeholder='Password' className='form-control border rounded mt-2' />
              </div>

            </div>
          </div>

          <div className="d-md-flex mt-4 ">
            <div className='w-100'>
              <label htmlFor="">Degree</label>
              <input value={doctordetails.degree} onChange={(e) => setDoctorDetails({ ...doctordetails, degree: e.target.value })} type="text" placeholder='Degree' className='form-control border rounded mt-2' />
            </div>

            <div className='w-100 ms-md-3 ms-0'>
              <label htmlFor="">Experience</label>
              <select value={doctordetails.experience} onChange={(e) => setDoctorDetails({ ...doctordetails, experience: e.target.value })} name="" id="" className='form-select w-100 border rounded mt-2' style={{ height: '38px' }}>
                <option value="1 years">1 years</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="4 years">4 years</option>
                <option value="5 years">5 years</option>
                <option value="7 years">7 years</option>
                <option value="10 years">10 years</option>
              </select>

            </div>
          </div>

          <div className="d-md-flex mt-4 ">
            <div className='w-100'>
              <label htmlFor="">Fees</label>
              <input value={doctordetails.fees} onChange={(e) => setDoctorDetails({ ...doctordetails, fees: e.target.value })} type="number" placeholder='Doctor Fees' className='form-control border rounded mt-2' />
            </div>

            <div className='w-100 ms-md-3 ms-0'>
              <div className='w-100'>
                <label htmlFor="">Contact Number</label>
                <input value={doctordetails.contactnumber} onChange={(e) => setDoctorDetails({ ...doctordetails, contactnumber: e.target.value })} type="tel" placeholder='Contact Number' className='form-control border rounded mt-2' />
              </div>

            </div>
          </div>

          <div className="mt-4 d-flex flex-column w-100">
            <label htmlFor="">Description</label> <br />
            <textarea value={doctordetails.about} onChange={(e) => setDoctorDetails({ ...doctordetails, about: e.target.value })} rows="4" ></textarea>

          </div>
          <div className="my-4 d-flex align-items-center justify-content-center">
            <button onClick={addDoctor} className='btn btn-primary rounded-pill p-2 w-50'>ADD DOCTOR</button>
          </div>

        </div>

      </div>
      <ToastContainer position='top-center' autoClose={2000} theme="colored" />

    </>
  )
}

export default AddDoctor
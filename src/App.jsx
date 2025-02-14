
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import Login from './pages/Login'
import AddDoctor from './components/AddDoctor'
import AdminAppointment from './components/AdminAppointment'
import AdminDoctorList from './components/AdminDoctorList'
import DoctorAppointment from './components/DoctorAppointment'
import DoctorProfile from './components/DoctorProfile'
import DoctorList from './components/DoctorList'
import PatientHome from './pages/PatientHome'
import Myprofile from './pages/Myprofile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import PagenotFound from './pages/PagenotFound'
import { useContext } from 'react'
import { loginResponseContext } from './context/ContextShare'
function App() {
  const {loginResponse} = useContext(loginResponseContext)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/adminlogin' element={loginResponse? <AdminLogin />: <PagenotFound/>} />
        <Route path='/doctorlogin' element={<AdminLogin Doctorlogin={true} />} />

        <Route path='/login' element={<Login/> } />
        <Route path='patientregister' element={<Login Patientregister={true} />} />

        <Route path='/adddoctor' element={<AddDoctor />} />
        <Route path='/adminappointment' element={<AdminAppointment />} />
        <Route path='/admindoctorlist' element={<AdminDoctorList />} />

        <Route path='/doctorappointment' element={<DoctorAppointment/>} />
        <Route path='/doctorprofile' element={<DoctorProfile/>} />

        <Route path='/doctorlist' element={<DoctorList />} />

        <Route path='/patienthome' element={<PatientHome />} />
        <Route path='/myProfile' element={<Myprofile />} />
        <Route path='/myappointment' element={<MyAppointment />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />


        <Route path='*' element={<PagenotFound />} />
    </Routes>
      
    </>
  )
}

export default App

import React, { useContext, useState } from 'react'
import bg from '../assets/bgimg.png'
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { loginApi, registerRequestApi } from '../services/allApi';
import { loginResponseContext } from '../context/ContextShare';

function Login({ Patientregister }) {

  const { setLoginResponse } = useContext(loginResponseContext)
  const navigate = useNavigate()
  const [userdetails, setUserdetails] = useState({
    patientname: "",
    email: "",
    mobileNumber: "",
    password: ""
  })
  // console.log(userdetails);
  const handleRegister = async () => {
    const { patientname, email, mobileNumber, password } = userdetails
    if (!patientname || !email || !mobileNumber || !password) {
      toast.info("Fill the form completely")

    } else {
      const result = await registerRequestApi(userdetails)
      // console.log(result);
      if (result.status == 200) {
        toast.success('Registration successful')
        setUserdetails({
          patientname: "",
          email: "",
          mobileNumber: "",
          password: ""
        })
        setTimeout(() => {
          navigate('/login')

        }, 2000)
      } else if (result.status == 406) {
        toast.warning(result.response.status)
      }
      else {
        toast.error('something went wrong')
      }

    }

  }

  const handleLogin = async () => {
    const { email, password } = userdetails
    if (!email || !password) {
      toast.info('fill the form completely')
    } else {
      const result = await loginApi({ email, password })
      // console.log(result);
      if (result.status == 200) {
        toast.success('Login Successfull')
        setLoginResponse(true)
        sessionStorage.setItem("existingUsers", JSON.stringify(result.data.existingUsers))
        sessionStorage.setItem("token", result.data.token)

        setUserdetails({
          email: "",
          password: ""
        })
        setTimeout(() => {
          navigate('/patienthome')
        }, 2000)

      } else if (result.status == 406) {
        toast.warning(result.response.status)
      }
      else {
        toast.error('something went wrong')
      }


    }

  }


  return (
    <>
      <div style={{ backgroundImage: `url(${bg})`, height: '750px', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }} >



        <div className='d-flex justify-content-center align-items-center' style={{ width: '100%', height: '100vh' }}>
          <div className='shadow p-md-3 p-4 ' style={{ width: '450px' }}>
            {!Patientregister ? <h2 className='fw-bold text-center text-light pt-5'>PATIENT LOGIN</h2>
              :
              <h2 className='fw-bold text-center text-light pt-5'>PATIENT REGISTER</h2>}

            <form>
              {Patientregister && <div className="mt-4">
                <label htmlFor="" className='text-light'>FULL NAME :</label>
                <input onChange={(e) => setUserdetails({ ...userdetails, patientname: e.target.value })} value={userdetails.patientname} type="text" className='form-control mt-2' />
              </div>}

              <div className="mt-4">
                <label htmlFor="" className='text-light'>EMAIL :</label>
                <input onChange={(e) => setUserdetails({ ...userdetails, email: e.target.value })} value={userdetails.email} type="text" className='form-control mt-2' />
              </div>


              {Patientregister && <div className="mt-4">
                <label htmlFor="" className='text-light'>Phone number</label>
                <input onChange={(e) => setUserdetails({ ...userdetails, mobileNumber: e.target.value })} value={userdetails.mobileNumber} type="text" className='form-control mt-2' />
              </div>}


              <div className="mt-3">
                <label htmlFor="" className='text-light'>PASSWORD :</label>
                <input onChange={(e) => setUserdetails({ ...userdetails, password: e.target.value })} value={userdetails.password} type="password" className='form-control mt-2' />
              </div>
            </form>

            {!Patientregister ?
              <div>
                <div className='d-flex justify-content-center'>
                  <button onClick={handleLogin} className='btn btn-info rounded p-2 my-4 w-100'>Login</button>
                </div>
                <p className='text-white text-center'>Don't have an account <Link to='/patientregister' className='text-danger'><span>Register</span></Link></p>
              </div>
              :
              <div>
                <div className='d-flex justify-content-center'>
                  <button onClick={handleRegister} className='btn btn-info rounded p-2 my-4 w-100'>Register</button>
                </div>
                <p className='text-white text-center'>Already registered? <Link to='/login' className='text-danger'><span>Login</span></Link></p>
              </div>
            }

          </div>
        </div>

      </div>
      <ToastContainer position='top-center' autoClose={2000} theme="colored" />
    </>
  )
}

export default Login
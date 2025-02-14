import React, { useContext, useState } from 'react'
import bg from '../assets/bgimg.png'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { adminLoginApi } from '../services/allApi';
import axios from 'axios';
import { serverUrl } from '../services/serviceUrl';
import { loginResponseContext } from '../context/ContextShare';



function AdminLogin({ Doctorlogin }) {
    const {setLoginResponse} = useContext(loginResponseContext)
    const navigate = useNavigate()
    const [dToken, setDToken] = useState("")

    const [aToken, setAToken] = useState("")
    const [adminLogin, setAdminLogin] = useState({
        email: "",
        password: ""
    })
    const [loginDoctor, setLoginDoctor] = useState({
        email: "",
        password: ""
    })
    console.log(loginDoctor);

    const handleLogin = async () => {
        const { email, password } = adminLogin
        if (!email || !password) {
            toast.info('Fill the form completely')

        } else {
            const result = await adminLoginApi({ email, password })
            // console.log(result);

            if (result.status == 200) {
                toast.success('Login Successful')
                setLoginResponse(true)
                sessionStorage.setItem("aToken", result.data.token)
                setAToken(result.data.token);

                setAdminLogin({
                    email: "",
                    password: ""
                })
                setTimeout(() => {
                    navigate('/adminappointment')
                }, 2000)
            } else if (result.status == 406) {
                toast.warning("incorrect email or password")
            }
            else {
                toast.error('something went wrong')
            }


        }
    }

    const doctorLogin = async () => {
        const { email, password } = loginDoctor
        if (!email || !password) {
            toast.info('Fill the form completely')

        } else{
            const result = await axios.post(`${serverUrl}/doctor-login`,{email,password})
            console.log(result);
            if(result.status == 200){
                toast.success('Login Successful')
                setLoginResponse(true)
                sessionStorage.setItem("dToken", result.data.token)
                setDToken(result.data.token);
                console.log(result.data.token);
                setLoginDoctor({
                    email: "",
                    password: ""
                })
                setTimeout(() => {
                    navigate('/doctorappointment')
                }, 2000)
                
            }else if (result.status == 406) {
                toast.warning('incorrect email or password')
            }
            else {
                toast.error('something went wrong')
            }
            
        }

    }

    return (
        <>
            <div style={{ backgroundImage: `url(${bg})`, height: '100vh', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }} >

                {!Doctorlogin ?
                    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100%' }}>
                        <div className='shadow p-4 ' style={{ width: '450px' }}>
                            <h2 className='fw-bold text-center text-light mt-3'>ADMIN LOGIN</h2>

                            <form>
                                <div className="mt-4">
                                    <label htmlFor="" className='text-light'>EMAIL :</label>
                                    <input type="text" value={adminLogin.email} onChange={(e) => setAdminLogin({ ...adminLogin, email: e.target.value })} placeholder='Email' className='form-control mt-2' />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="" className='text-light'>PASSWORD :</label>
                                    <input type="password" value={adminLogin.password} onChange={(e) => setAdminLogin({ ...adminLogin, password: e.target.value })} placeholder='Password' className='form-control mt-2' />
                                </div>
                            </form>

                            <div className='d-flex justify-content-center'>
                                <button onClick={handleLogin} className='btn btn-info rounded p-2 my-4 w-100'>Login</button>
                            </div>

                        </div>
                    </div>

                    :

                    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh', width: '100%' }}>
                        <div className='shadow p-4 ' style={{ width: '450px' }}>
                            <h2 className='fw-bold text-center text-light mt-3'>DOCTOR LOGIN</h2>
                            <form>
                                <div className="mt-4">
                                    <label htmlFor="" className='text-light'>EMAIL :</label>
                                    <input value={loginDoctor.email} onChange={(e) => setLoginDoctor({ ...loginDoctor, email: e.target.value })} type="text" placeholder='Email' className='form-control mt-2' />
                                </div>
                                <div className="mt-3">
                                    <label htmlFor="" className='text-light'>PASSWORD :</label>
                                    <input value={loginDoctor.password} onChange={(e) => setLoginDoctor({ ...loginDoctor, password: e.target.value })} type="password" placeholder='Password' className='form-control mt-2' />
                                </div>
                            </form>

                            <div className='d-flex justify-content-center'>
                                <button onClick={doctorLogin} className='btn btn-info rounded p-2 my-4 w-100'>Login</button>
                            </div>
                        </div>
                    </div>}



            </div>
            <ToastContainer position='top-center' autoClose={2000} theme="colored" />

        </>
    )
}

export default AdminLogin
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { googleLoginApi, loginApi, registerApi } from '../services/allApi'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'

const Auth = ({ register }) => {

  const navigate = useNavigate()

  const [userDetails, setuserDetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails);

  //User Registration
  const handleRegister = async () => {
    console.log("inside reigister");

    const { username, email, password } = userDetails

    if (!username || !email || !password) {
      toast.info("please fill the form completely");
    } else {
      const result = await registerApi({ username, email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success("Register successfully")
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else if (result.status == 409) {
        toast.warning(result.response.data)
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else {
        toast.error('Something went wrong')
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }

  // User Login
  const handleLogin = async () => {
    const { email, password } = userDetails

    if (!email || !password) {
      toast.info('please fill the complete details')
    } else {
      const result = await loginApi({ email, password })
      console.log(result);
      if (result.status == 200) {
        toast.success("login successfull")
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)

        setTimeout(() => {
          if (result.data.existingUser.email == "bookstoreAdmin@gmail.com") {
            navigate('/adminhome')
          } else {
            navigate('/')
          }
        }, 2500)

      }
      else if (result.status == 401) {
        toast.warning(result.response.data)
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else if (result.status == 404) {
        toast.warning("Account does not exist")
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
      else {
        toast.error("something went wrong")
        setuserDetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }

  // user googlelogin
  const handleGoogleLogin = async (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential)
    console.log(details);

    const result = await googleLoginApi({ username: details.name, email: details.email, password: 'googlepswd', photo: details.picture })
    console.log(result);
    if (result.status == 200) {
      toast.success("login successfully")
      sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
      sessionStorage.setItem("token", result.data.token)
      setTimeout(() => {
        navigate('/')
      }, 2500)
    }
    else {
      toast.info('something went wrong')
    }
  }

  return (
    <>
      <div className='md:grid grid-cols-3' id='loginPage'>
        <div></div>

        <div className='flex flex-col justify-center items-center '>
          <h1 className='text-3xl text-white font-bold'>BOOK STORE</h1>

          <form className='w-full bg-gray-900 flex flex-col justify-center items-center p-10'>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%' }} className='flex justify-center items-center border border-white'>
              <FontAwesomeIcon icon={faUser} className='text-white fa-2x' />
            </div>
            {!register ? <h3 className='text-white mt-5 text-3xl mb-8'>Login</h3>
              :
              <h3 className='text-white mt-5 text-3xl mb-8'>Register</h3>}

            {register && <div className='mb-5 w-full mt-8'>
              <input onChange={(e) => setuserDetails({ ...userDetails, username: e.target.value })} type="text" placeholder='username' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
            </div>}

            <div className='mb-5 w-full '>
              <input onChange={(e) => setuserDetails({ ...userDetails, email: e.target.value })} type="text" placeholder='Email Id' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
            </div>
            <div className='mb-5 w-full'>
              <input onChange={(e) => setuserDetails({ ...userDetails, password: e.target.value })} type="text" placeholder='password' className='p-2 rounded placeholder-gray-600 bg-white w-full' />
            </div>

            <div className='mb-5 w-full flex justify-between'>
              <p className='text-amber-300' style={{ fontSize: '10px' }}>*Never share your password with others</p>
              {!register && <p className='text-white underline' style={{ fontSize: '10px' }}>Forget Password</p>}
            </div>

            {register ? <div className='mb-2 w-full'>
              <button onClick={handleRegister} type='button' className=' bg-green-800 text-white w-full p-3 rounded'>Register</button>
            </div>
              :
              <div className='mb-2 w-full'>
                <button onClick={handleLogin} type='button' className=' bg-green-800 text-white w-full p-3 rounded'>Login</button>
              </div>}

            {!register && <p className='text-white'>--------------or--------------</p>}

            {!register && <div className='mb-5 mt-3 w-full'>
              {/* <button className=' bg-white text-black w-full p-3 rounded'>Sign in with Google</button> */}
              <GoogleLogin width={'200px'}
                onSuccess={credentialResponse => {
                  console.log(credentialResponse);
                  handleGoogleLogin(credentialResponse)
                }}
                onError={() => {
                  toast.error('Login Failed');
                }}
              />;
            </div>}

            {register ?
              <p className='text-white'>Are you  Already a User ? <Link to={'/login'}>Login</Link></p>
              :
              <p className='text-white'>Are you a New User ? <Link to={'/register'}>Register</Link></p>
            }

          </form>

        </div>

        <div></div>
      </div>

      <ToastContainer position="top-center" theme="colored" autoClose={1000} />
    </>
  )
}

export default Auth
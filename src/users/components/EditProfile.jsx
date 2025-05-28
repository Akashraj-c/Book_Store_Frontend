import { faPen, faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { editUserProfileApi } from '../../services/allApi'
import { userProfileUpdateStatusContext } from '../../context/ContextShare'

const EditProfile = () => {

  const [offcanvasStatus, setOffCanvasStatus] = useState(false)
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    cPaswword: "",
    bio: "",
    profile: ""
  })
  // console.log(userDetails);

  const [preview, setPreview] = useState('')
  const [token, setToken] = useState("")
  const { setUserProfileUpdateStatus } = useContext(userProfileUpdateStatusContext)

  const handleProfileUpload = (e) => {
    setUserDetails({ ...userDetails, profile: e.target.files[0] })

    const url = URL.createObjectURL(e.target.files[0])
    // console.log(url);
    setPreview(url)
  }
  // console.log(preview);


  const handleSubmit = async () => {
    const { username, password, cPaswword, bio, profile } = userDetails
    if (!username || !password || !cPaswword) {
      toast.info('please fill the form completely')
    }
    else {
      if (password != cPaswword) {
        toast.info('password must match')
      }
      else {
        if (preview) {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          const reqBody = new FormData()
          for (let key in userDetails) {
            reqBody.append(key, userDetails[key])
          }
          const result = await editUserProfileApi(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            sessionStorage.setItem('existingUser', JSON.stringify(result.data))
            toast.info('updated successfully')
            setUserProfileUpdateStatus(result.data)
            handleReset()
          }

        }
        else {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }
          const result = await editUserProfileApi({ username, password, bio, profile: existingUser.profile }, reqHeader)
          console.log(result);
          if (result.status == 200) {
            sessionStorage.setItem('existingUser', JSON.stringify(result.data))
            toast.info('updated successfully')
            setUserProfileUpdateStatus(result.data)
            handleReset()
          }
        }
      }
    }
  }

  const handleReset = () => {
    setUserDetails({
      username: "",
      password: "",
      cPaswword: "",
      bio: "",
      profile: ""
    })
    setPreview("")
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      setToken(token)
      const userProfile = JSON.parse(sessionStorage.getItem('existingUser'))
      setUserProfileUpdateStatus(userProfile.profile)
    }
  }, [])


  return (
    <>
      <div className='flex justify-end mt-5 md:mt-0'>
        <button onClick={() => setOffCanvasStatus(true)} className='text-blue-600 border border-blue-600 rounded p-3 hover:bg-blue-600 hover:text-white'><FontAwesomeIcon icon={faPenToSquare} /> Edit</button>
      </div>

      {offcanvasStatus && <div>
        <div onClick={() => setOffCanvasStatus(false)} className='fixed inset-0 bg-gray-500/75 transition-all-5s w-full h-full  transform transition-transform duration-500 ease-in-out translate-x-0'></div>

        <div className='bg-white h-full w-90 z-50 fixed top-0 left-0'>
          <div className='bg-gray-900 px-3 py-4 flex justify-between text-white text-2xl'>
            <h1>Edit User Profile</h1>
            <FontAwesomeIcon icon={faXmark} onClick={() => setOffCanvasStatus(false)} />
          </div>
          <div className='flex justify-center items-center flex-col mt-3'>
            <label htmlFor="profileFile">
              <input id='profileFile' onChange={(e) => handleProfileUpload(e)} type="file" className='hidden' />
              <img src={preview ? preview : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="no img" style={{ width: '150px', height: '150px', borderRadius: '50%' }} />
              <div className='bg-yellow-300 py-1 px-2 rounded z-53 fixed' style={{ marginLeft: '125px', marginTop: '-35px' }}><FontAwesomeIcon icon={faPen} /></div>
            </label>

            <div className="mb-3 mt-5 w-full px-5">
              <input type="text" value={userDetails.username} onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })} placeholder='username' className='w-full border border-gray-300 rounded p-2' />
            </div>

            <div className="mb-3  w-full px-5">
              <input type="text" value={userDetails.password} onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} placeholder='Password' className='w-full border border-gray-300 rounded p-2' />
            </div>

            <div className="mb-3  w-full px-5">
              <input type="text" value={userDetails.cPaswword} onChange={(e) => setUserDetails({ ...userDetails, cPaswword: e.target.value })} placeholder='Confirm Password' className='w-full border border-gray-300 rounded p-2' />
            </div>

            <div className="mb-3  w-full px-5">
              <textarea placeholder='Bio' value={userDetails.bio} onChange={(e) => setUserDetails({ ...userDetails, bio: e.target.value })} rows={5} className='w-full border border-gray-300 p-2 rounded'></textarea>
            </div>

            <div className='flex justify-end w-full px-5'>
              <button onClick={handleReset} type='button' className='bg-amber-600 text-black rounded py-3 px-4 hover:bg-white hover:border hover:border-amber-600 hover:text-amber-600'>Reset</button>

              <button onClick={handleSubmit} type='button' className='bg-green-700 text-black ms-3 rounded py-3 px-4 hover:bg-white hover:border hover:border-green-700 hover:text-green-700'>Submit</button>
            </div>
          </div>
        </div>
      </div>}

    </>
  )
}

export default EditProfile
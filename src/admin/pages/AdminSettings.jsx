import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { toast, ToastContainer } from 'react-toastify'
import { updateProfileApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
import { adminProfileUpdateStatusContext } from '../../context/ContextShare'

const AdminSettings = () => {

  const [token, settoken] = useState('')
  const [adminDetails, setAdminDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    profile: ""
  })
  // console.log(adminDetails);
  const [preview, setPreview] = useState("")
  const [existingProfileImage, setExistingprofileImage] = useState("")
  const [updateStatus, setUpdateStatus] = useState({})
  const{setAdminProfileUpdateStatus}=useContext(adminProfileUpdateStatusContext)

  const handleFileAdd = (e) => {
    console.log(e.target.files[0]);
    setAdminDetails({ ...adminDetails, profile: e.target.files[0] })
    console.log(adminDetails.profile);

    if (e.target.files[0] != '') {
      const url = URL.createObjectURL(e.target.files[0])
      console.log(url);
      setPreview(url)
      setExistingprofileImage(user.profile)
    }

  }
  console.log(preview);

  const handleReset = () => {

       if (sessionStorage.getItem('token')) {
      // const token = sessionStorage.getItem('token')
      // settoken(token)
      const user = JSON.parse(sessionStorage.getItem('existingUser'))
      setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
      setExistingprofileImage(user.profile)

    }

  }

  const handleAdd = async () => {
    const { username, password, cPassword, profile } = adminDetails
    console.log(username, password, cPassword, profile);

    if (!username || !password || !cPassword) {
      toast.info("please fill the form completely")
    }
    else {
      if (password != cPassword) {
        toast.warning('password must match')
      }
      else {
        if (preview) {
          const reqBody = new FormData()
          for (let key in adminDetails) {
            reqBody.append(key, adminDetails[key])
          }

          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }

          const result = await updateProfileApi(reqBody, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success('profile updated successfully')
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setUpdateStatus(result.data)
            setAdminProfileUpdateStatus(result.data)
          }
          else {
            toast.error('something went wrong')
            setUpdateStatus(result)
          }
        }
        else {
          const reqHeader = {
            "Authorization": `Bearer ${token}`
          }

          const result = await updateProfileApi({ username, password, profile: existingProfileImage }, reqHeader)
          console.log(result);
          if (result.status == 200) {
            toast.success('profile updated successfully')
            sessionStorage.setItem("existingUser", JSON.stringify(result.data))
            setUpdateStatus(result.data)
            setAdminProfileUpdateStatus(result.data)
          }
          else {
            toast.error('something went wrong')
            setUpdateStatus(result)
          }
        }
      }

    }
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      settoken(token)
      const user = JSON.parse(sessionStorage.getItem('existingUser'))
      setAdminDetails({ username: user.username, password: user.password, cPassword: user.password })
      setExistingprofileImage(user.profile)

    }
  }, [updateStatus])

  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-100 flex flex-col items-center p-5' style={{ marginTop: '-6px' }}>
          <AdminSidebar  />
        </div>

        <div className='my-10'>
          <h1 className='text-2xl font-bold text-center '>Settings</h1>
          <div className='md:grid grid-cols-2 px-12 mt-10'>
            <div className='flex flex-col items-center justify-center md:mb-0 mb-5'>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur vel praesentium magni, saepe sequi, commodi ipsam soluta veniam  tenetur.
                Et aperiam repellendus soluta quaerat saepe autem eum porro, mollitia recusandae ipsum voluptas pariatur, cumque aspernatur, odit sed cum optio. Nam voluptates labore deserunt, sint exercitationem reiciendis? Ratione, obcaecati officia?
              </p>
              <br />
              <p>
                Lorem, ipsum dolor ducimus eaque eos quia, similique molestiae vitae fugiat perspiciatis odio adipisci sit amet consectetur adipisicing elit. Quaerat dicta ab nihil esse, enim impedit dolor consectetur ex quam aut laboriosam sequi suscipit quis fugiat eveniet eaque voluptatem. Cumque, facilis.
                At libero rem aperiam magni, quae quisquam, quasi sint molestias, quo fugiat corrupti. Exercitationem dolorum distinctio facere a  Sit.
              </p>
            </div>

            <div>
              <div className='flex flex-col justify-center items-center  '>
                <form className='bg-blue-100 p-5 md:w-md w-sm rounded-md flex flex-col items-center h-full '>

                  <div>
                    {existingProfileImage == "" ? <img src={preview ? preview : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="no img" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                      :
                      <img src={preview ? preview : `${serverUrl}/uploads/${existingProfileImage}`} alt="no img" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />}


                    <div style={{ marginLeft: '80px', marginTop: '-20px' }}>
                      <label htmlFor="AdminprofileFile">
                        <input id='AdminprofileFile' onChange={(e) => handleFileAdd(e)} type="file" className='hidden' />
                        <FontAwesomeIcon className='bg-amber-500 p-1 rounded text-white text-xs ' icon={faPenToSquare} />
                      </label>
                    </div>
                  </div>

                  <input value={adminDetails.username} onChange={(e) => setAdminDetails({ ...adminDetails, username: e.target.value })} type="text" placeholder='Name' className='bg-white w-full px-3 py-2 rounded-md mt-8 outline-gray-300' />
                  <input value={adminDetails.password} onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })} type="text" placeholder='Password' className='bg-white w-full px-3 py-2 rounded-md mt-3  outline-gray-300' />
                  <input value={adminDetails.cPassword} onChange={(e) => setAdminDetails({ ...adminDetails, cPassword: e.target.value })} type="text" placeholder='Confirm Password' className='bg-white w-full px-3 py-2 rounded-md mt-3  outline-gray-300' />
                  <div className='flex w-full'>
                    <button type='button' onClick={handleReset} className='bg-yellow-400  mt-5 mx-1 w-full  py-2 text-white rounded-md'>Reset</button>
                    <button type='button' onClick={handleAdd} className='bg-green-600  mt-5 mx-1 w-full py-2 text-white rounded-md'>Update </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />

      <ToastContainer position="top-center" theme="colored" autoClose={1000} />

    </>
  )
}

export default AdminSettings
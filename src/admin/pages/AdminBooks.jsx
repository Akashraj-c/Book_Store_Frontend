import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { approveBookApi, getAllBookAdminApi, getallUserApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'


const AdminBooks = () => {
  const [BookList, setBookList] = useState(true)
  const [Users, setUsers] = useState(false)
  const [bookDetails, setBookDetails] = useState([])
  const [token, setToken] = useState('')
  const [approveStatus, setApproveStatus] = useState(false)
  const [allUsers, setAllUsers] = useState([])

  const getAllAdminBook = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await getAllBookAdminApi(reqHeader)
    console.log(result);
    if (result.status == 200) {
      setBookDetails(result.data)
    }
  }
  // console.log(bookDetails);


  const approveBook = async (data) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }
    const result = await approveBookApi(data, reqHeader)
    console.log(result);
    if (result.status == 200) {
      setApproveStatus(!approveStatus)
    }
    else {
      toast.error('Something went wrong')
    }

  }

  const getAllUsers = async (token) => {

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await getallUserApi(reqHeader)
    console.log(result);
    if (result.status == 200) {
      setAllUsers(result.data)
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem('token')
      setToken(token)
      if (BookList == true) {
        getAllAdminBook(token)
      }
      else if (Users == true) {
        getAllUsers(token)
      }
      else {
        console.log('something went wrong');

      }
    }

  }, [approveStatus,BookList ,Users])


  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-100 flex flex-col items-center p-5' style={{ marginTop: '-6px' }}>
          <AdminSidebar />
        </div>

        <div className='flex flex-col items-center mt-10'>
          <h1 className=' text-2xl font-bold'>All Books</h1>

          <div className='mt-5 flex '>
            <p onClick={() => { setBookList(true); setUsers(false) }} className={BookList ? 'px-2 text-blue-600 border-t border-r cursor-pointer' : "px-2 border-r border-b cursor-pointer"}>Book List</p>
            <p onClick={() => { setBookList(false); setUsers(true) }} className={Users ? 'px-2 text-blue-600 border-t border-r cursor-pointer' : "px-2  border-b cursor-pointer"}>Users</p>
          </div>

          {BookList &&
            <div className='md:grid grid-cols-4 w-full my-14  px-16 '>

              {
                bookDetails?.length > 0 ?
                  bookDetails.map((item, index) => (
                    <div key={index} className='p-3 '>
                      <div className={item?.status == 'sold' ? 'p-3 opacity-54 shadow-2xl rounded-lg' : 'p-3 shadow-2xl rounded-lg'}>
                        <img src={item?.imageurl} alt="no image" style={{ width: '100%', height: '250px' }} className='rounded-lg' />
                        <div className='flex justify-center items-center flex-col mt-3'>
                          <p>{item?.author}</p>
                          <h3 className='text-lg font-bold'>{item?.title}</h3>
                          <p className='text-orange-500'>{item?.userMail}</p>
                          <div className='px-3 w-full'>
                            {item?.status == 'pending' && <button onClick={() => approveBook(item)} className='text-white bg-green-600 w-full hover:bg-white hover:text-green-600 hover:border hover:border-green-600'>Approved</button>}

                          </div>
                          <div className='flex justify-end w-full'>
                            {item?.status == 'Approved' && <img src="https://static.vecteezy.com/system/resources/previews/023/527/502/non_2x/green-check-mark-icon-symbol-logo-tick-symbol-green-color-transparent-design-free-png.png" alt="" style={{ width: '35px', height: '30px' }} />}
                          </div>

                        </div>
                      </div>
                    </div>
                  ))

                  :
                  <p>No books</p>
              }

            </div>
          }

          {Users &&
            <div className='my-20'>
              <div className="md:grid grid-cols-3 ">
                {
                  allUsers?.length > 0 ?
                    allUsers.map((item, index) => (
                      <div key={index} className='bg-gray-300 px-5 py-2 md:mb-16 mb-10 rounded md:mx-4 '>
                        <p className='text-orange-700 mb-1'>ID:{item?._id}</p>
                        <div className='flex'>
                          <img src={item.profile == "" ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" : `${item?.profile}`} alt="no img" style={{ width: '60px', height: '60px', borderRadius: '50%' }} />
                          <div className='ms-6'>
                            <h1 className='text-blue-600 text-lg'>{item?.username}</h1>
                            <p className='text-sm'>{item?.email}</p>
                          </div>
                        </div>
                      </div>
                    ))

                    :
                    <p>no users</p>
                }
              </div>
            </div>
          }

        </div>
      </div>

      <ToastContainer position="top-center" theme="colored" autoClose={1000} />
      <Footer />
    </>
  )
}

export default AdminBooks
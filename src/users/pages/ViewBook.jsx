import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackward, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link, useParams } from 'react-router-dom'
import { getABookApi, makePaymentApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
import { loadStripe } from '@stripe/stripe-js';
import { toast, ToastContainer } from 'react-toastify'

const ViewBook = () => {
  const [modalStatus, setModalStatus] = useState(false)
  const [viewBookDetails, setViewBookDetails] = useState({})
  const [token, setToken] = useState('')

  const { id } = useParams()
  // console.log(id);


  const getABook = async (id) => {
    const result = await getABookApi(id)
    // console.log(result);
    if (result.status == 200) {
      setViewBookDetails(result.data)
    }
  }
  // console.log(viewBookDetails);


  const makePayment = async () => {
    // console.log(viewBookDetails);
    // object instance
    const stripe = await loadStripe('pk_test_51RSxzwQUKn8ZnziN1tHhpmh7Lokbg0Gx0hdiHZi4zkjJ1jMV2Rydw1vEyNCtvkDnvnAxxLO2iohFurymTUi0NG2W00i50Uc3Qr');
    // data to update in backend
    const reqBody = {
      bookDetails: viewBookDetails
    }

    const reqHeader = {
      "Authorization": `Bearer ${token}`
    }

    const result = await makePaymentApi(reqBody, reqHeader)
    console.log(result);
    // console.log(result.data.existingBook);

    const sessionid = result.data.sessionId
    
    const response = stripe.redirectToCheckout({
      sessionId: sessionid
    })

    if (response.error) {
      toast.error('something went wrong')
    }

  }

  useEffect(() => {
    getABook(id)
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      setToken(token)
    }
  }, [])

  return (
    <>
      <Header />
      <div className='md:p-10 p-5'>
        <div className='md:grid grid-cols-[1fr_4fr] border border-gray-400 md:p-6 shadow-lg shadow-gray-400 rounded'>

          <div className='md:p-2 p-12 '>
            <img onClick={() => setModalStatus(true)} className='h-96' src={viewBookDetails?.imageurl} alt="" />
          </div>

          <div>
            <div className=' text-center'>
              <h1 className='md:text-2xl font-extrabold md:px-0 px-2'>{viewBookDetails?.title}</h1>
              <h6 className='text-blue-500 font-bold '> {viewBookDetails?.author}</h6>
            </div>

            <div className='md:p-10 p-5 mt-5 '>
              <div className='md:flex justify-between font-bold '>
                <h6 className='md:mb-0 mb-2'>Publisher : {viewBookDetails?.publisher}</h6>
                <h6 className='md:mb-0 mb-2'>Language : {viewBookDetails?.language}</h6>
                <h6 className='md:mb-0 mb-2'>No of Pages : {viewBookDetails?.noofpages}</h6>
              </div>
              <div className='md:flex justify-between font-bold md:mt-4'>
                <h6 className='md:mb-0 mb-2'>Seller Mail : {viewBookDetails?.userMail}</h6>
                <h6 className='md:mb-0 mb-2'>Real Price : ${viewBookDetails?.price}</h6>
                <h6 >ISBN : {viewBookDetails?.isbn}</h6>
              </div>
            </div>

            <div className='md:px-10 md:py-10 px-4 font-bold'>
              <p className='text-justify'>{viewBookDetails?.abstract}</p>
            </div>

            <div className='flex md:justify-end justify-around px-5 md:py-0 py-5'>
              <Link to={'/allbooks'}> <button className='py-2 px-8 bg-blue-500 text-white rounded-lg text-lg font-bold me-3 '><FontAwesomeIcon icon={faBackward} className='me-2' />Back</button></Link>
              <button type='button' onClick={makePayment} className='py-2 px-8 bg-green-700 text-white rounded-lg text-lg font-bold'>Buy $13</button>
            </div>

          </div>
        </div>
      </div>

      {modalStatus && <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

        <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              {/* tittle  */}
              <div className="bg-gray-900 p-2 flex  justify-between  sm:px-4">
                <h1 className='text-2xl text-white'>Detailed View </h1>
                <FontAwesomeIcon icon={faXmark} onClick={() => setModalStatus(false)} className='text-white text-2xl' />
              </div>

              {/* body of modal  */}
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex justify-center items-center">
                  {viewBookDetails?.uploadedImg.map((item) => (
                    <img src={`${serverUrl}/uploads/${item}`} alt="no image" style={{ height: '300px', width: '200px' }} className='me-2' />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>}

      <Footer />
      <ToastContainer position="top-center" theme="colored" autoClose={1000} />

    </>
  )
}

export default ViewBook
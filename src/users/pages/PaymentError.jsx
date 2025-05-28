import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

const PaymentError = () => {
  return (
    <>
    <Header/>
        <div className='container my-10'>

            <div className='md:grid grid-cols-2 px-20 flex flex-col justify-center items-center'>
                <div>
                    <h1 className='md:text-4xl text-red-600 '>Sorry ! Your payment is unsuccessfull</h1>
                    <p className='my-4 text-2xl'>We Appolagize for the inconvience caused andappreciate your visit to bookstore </p>
                    <Link to={'/allbooks'}> <button className='bg-blue-600 px-4 py-3 text-white my-5 rounded'>Explore More Books</button> </Link>
                </div>
                <div className='flex justify-center items-center'>
                  <img src="https://assets-v2.lottiefiles.com/a/49e16c26-3b66-11ef-80a5-0bef9e517567/93M2IqVm7P.gif" alt="noImg" className='w-96' />
                </div>
            </div>

        </div>
    <Footer/>
    </>
  )
}

export default PaymentError
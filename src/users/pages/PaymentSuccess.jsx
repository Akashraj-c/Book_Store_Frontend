import React from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { Link } from 'react-router-dom'

const PaymentSuccess = () => {
  return (
    <>
    <Header/>
        <div className='container my-10'>

            <div className='md:grid grid-cols-2 px-20 flex flex-col justify-center items-center'>
                <div>
                    <h1 className='md:text-4xl text-blue-600 '>Congratulation</h1>
                    <p className='my-4 text-2xl'>Thankyou  for shopping with Bookstore . Hope you have a good time with us. </p>
                    <Link to={'/allbooks'}> <button className='bg-blue-600 px-4 py-3 text-white my-5 rounded'>Explore More Books</button> </Link>
                </div>
                <div className='flex justify-center items-center'>
                  <img src="https://i.pinimg.com/originals/f5/0f/07/f50f07fb58f1cfec0d71234a0613772d.gif" alt="noImg" className='w-full' />
                </div>
            </div>

        </div>
    <Footer/>
    </>
  )
}

export default PaymentSuccess
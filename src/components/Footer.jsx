import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faSquareTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import React from 'react'


function Footer() {
  return (
    <>
      <div className='md:grid grid-cols-3 p-3 bg-gray-900 '>

        
          <div className='text-white mt-3 p-4'>
            <h1 className='mt-3'>ABOUT US</h1>
            <p className='mt-4 text-justify'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat sapiente quasi incidunt vitae iste, ratione reiciendis quo praesentium eos eius earum suscipit enim distinctio animi accusantium qui. Voluptatum, consectetur quasi!</p>
          </div>

        <div className='mt-3 p-4 text-white'>
          <h1 className='mt-3'>NEWSLETTER</h1>
          <p className='mt-4'>Stay updated with our latest trends</p>
          <div className='mt-2'>
            <input className='text-white bg-white p-1' type="text" placeholder='enter' />
            <button className='bg-yellow-300 p-1 px-2'><FontAwesomeIcon icon={faArrowRight} /></button>
          </div>
        </div>

        <div className='text-white mt-3 p-4'>
          <h1 className='mt-3'>FOLLOW US</h1>
          <p className='mt-4'>Let us be social</p>
          <div className='mt-2 text-2xl'>
            <FontAwesomeIcon className='me-3' icon={faInstagram} />
            <FontAwesomeIcon className='me-3' icon={faFacebook} />
            <FontAwesomeIcon className='me-3' icon={faSquareTwitter} />
            <FontAwesomeIcon className='me-3' icon={faLinkedin} />
          </div>
        </div>
      </div>
      <div className='bg-black text-white flex justify-center items-center '>
        <h3 className='p-4'>Copyright © 2023 All rights reserved | This website is made with ❤ by Akashraj C</h3>
      </div>
    </>
  )
}

export default Footer
import React from 'react'
import { Link } from 'react-router-dom'

const PagenotFound = () => {
  return (
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='md:grid grid-cols-3 '>
        <div></div>
        <div className='flex justify-center items-center flex-col p-5 md:p-0'>
        <img style={{width:'600px'}} src="https://cdn.dribbble.com/userupload/24278108/file/original-78d5a175341b5698c5e82e902ff801a6.gif" alt="" />
      <h6>Oh No!</h6>
      <h1 className='md:text-5xl text-2xl'>Look Like Your're Lost</h1>
      <p>The page you are looking for is not available</p>
     <Link to={'/'}> <button className='border mt-4 px-4 py-3 bg-blue-900 rounded text-white hover:bg-white hover:border-blue-900 hover:text-blue-900'>BACK HOME</button></Link>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default PagenotFound
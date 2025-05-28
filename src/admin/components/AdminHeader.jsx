import { faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminHeader = () => {

    const navigate = useNavigate()
    
    const logout = () => {
        sessionStorage.removeItem('existingUser')
        sessionStorage.removeItem('token')
        navigate('/')
    }


    return (
        <>
            <div className='flex justify-between md:px-20 px-8 p-3'>
                <div className='flex items-center'>
                    <img style={{ width: '50px', height: '50px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGqKZ_XghbsCkjKJFYhJ-tu1uSbYJPeqsJ3w&s" alt="no img" />
                    <h1 className='text-2xl font-bold ms-2'>BOOK STORE</h1>
                </div>
                <button onClick={logout} className='px-4 py-1 border rounded hover:bg-black hover:text-white '><FontAwesomeIcon icon={faPowerOff} /> logout</button>
            </div>

            <marquee behaviour='' direction='left' className='w-full p-3  bg-black'>
                <p className='text-white'>Welcome Admin ! You're all set to manage and monitor the system . Let's get to work!</p>
            </marquee>

        </>
    )
}

export default AdminHeader
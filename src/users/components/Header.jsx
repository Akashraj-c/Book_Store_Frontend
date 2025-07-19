import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faAddressCard, faBars, faPowerOff, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const [collapse, setCollapse] = useState(false)
  const [dropDownStatus, setDropDownStatus] = useState(false)
  const [token, setToken] = useState("")

  const navigate = useNavigate()

  // logout
  const handleLogout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('existingUser')
    navigate('/login')
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      setToken(token)
    }
  }, [])

  return (
    <>
      <div className='grid grid-cols-3 p-3'>
        <div className='flex items-center'>
          <img style={{ width: '50px', height: '50px' }} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGqKZ_XghbsCkjKJFYhJ-tu1uSbYJPeqsJ3w&s" alt="no img" />
          <h1 className='text-2xl md:hidden ms-2'>BOOKSTORE</h1>
        </div>
        <div className='md:flex hidden justify-center items-center'>
          <h1 className='text-3xl font-extrabold'>BOOK STORE</h1>
        </div>
        <div className='md:flex justify-end items-center hidden'>
          <FontAwesomeIcon icon={faInstagram} className='me-3' />
          <FontAwesomeIcon icon={faTwitter} className='me-3' />
          <FontAwesomeIcon icon={faFacebookF} className='me-3' />

          {!token ? <Link to={'/login'}><button className='border border-black rounded px-3 py-2 ms-3'><FontAwesomeIcon icon={faUser} className='me-2' />Login</button></Link>
            :
            <div className="relative inline-block text-left">
              <div>

                <button onClick={() => setDropDownStatus(!dropDownStatus)} type="button" className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs  hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">

                  <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" alt="user icon" style={{ width: '60px', height: '40px' }} className='mx-2' />
                </button>

              </div>

              {dropDownStatus && <div class="absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1" role="none">
                  <Link to={'/profile'}> <p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0"><FontAwesomeIcon icon={faAddressCard} className='me-2' /> Profile</p></Link>

                  <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 cursor-pointer" role="menuitem" tabIndex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' /> Logout</button>

                </div>
              </div>}

            </div>}


        </div>
      </div>



      {/* navbar */}
      <nav className='p-3 w-full bg-gray-900 text-white md:flex justify-center'>

        <div className='flex justify-between items-center  md:hidden'>
          <FontAwesomeIcon onClick={() => setCollapse(!collapse)} icon={faBars} className='text-2xl' />

          {!token ? <Link to={'/login'}><button className='border border-white rounded px-3 py-2 ms-3'><FontAwesomeIcon icon={faUser} className='me-2' />Login</button></Link>
            :
            <div className="relative inline-block text-left">
              <div>

                <button onClick={() => setDropDownStatus(!dropDownStatus)} type="button" className="inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs  hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">

                  <img src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" alt="user icon" style={{ width: '60px', height: '40px' }} className='mx-2' />
                </button>

              </div>

              {dropDownStatus && <div className="absolute right-0 z-10 mt-2 w-30 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1" role="none">
                  <Link to={'/profile'}> <p className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-0"><FontAwesomeIcon icon={faAddressCard} className='me-2' /> Profile</p></Link>

                  <button type='button' onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="menu-item-1"><FontAwesomeIcon icon={faPowerOff} className='me-2' /> Logout</button>
                </div>
              </div>}

            </div>}

        </div>

        <ul className={collapse ? 'md:flex' : 'md:flex justify-center hidden'}>
          <Link to={'/'}><li className='mx-4'>Home</li></Link>
          <Link to={'/allbooks'}> <li className='mx-4'>Books</li></Link>
          <Link to={'/careers'}><li className='mx-4'>Careers</li></Link>
          <Link to={'/contact'}><li className='mx-4'>Contact</li></Link>
        </ul>
      </nav>
    </>
  )
}

export default Header
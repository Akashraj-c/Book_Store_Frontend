import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getAllBookApi } from '../../services/allApi'
import { searchKeyContext } from '../../context/ContextShare'

const AllBooks = () => {

    const [collapse, setCollapse] = useState(false)
    const [token, setToken] = useState("")
    const [allBooks, setAllBooks] = useState([])
    const [tempArray, setTempArray] = useState()

    // const existingUser = sessionStorage.getItem("existingUser")
    // console.log(existingUser);


    const { searchKey, setSearchKey } = useContext(searchKeyContext)
    console.log(searchKey);


    const getAllBooks = async (searchKey, tok) => {
        const reqHeader = {
            "Authorization": `Bearer ${tok}`
        }

        const result = await getAllBookApi(searchKey, reqHeader)
        console.log(result);
        if (result.status == 200) {

            setAllBooks(result.data)
            setTempArray(result.data)
        }
    }
    // console.log(allBooks);

    const filter = (data) => {
        if (data == 'No-Filter') {
            setAllBooks(tempArray)
        }
        else {
            setAllBooks(tempArray.filter((item) => item.category.toLowerCase() == data.toLowerCase()))
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            const tok = sessionStorage.getItem('token')
            setToken(tok)
            getAllBooks(searchKey, tok)
        }
    }, [searchKey])

    return (
        <>
            <Header />

            {/*When the user is loggin  */}
            {token && <div>
                <div className='flex flex-col justify-center items-center my-8'>
                    <h1 className='text-3xl font-medium'>Collections</h1>
                    <div className='flex justify-center items-center w-full mt-2'>
                        <input type="text" onChange={(e) => setSearchKey(e.target.value)} placeholder='search by title' className=' px-3 py-2 border border-gray-200  me-2 placeholder-gray-700 shadow md:w-1/4 w-1/2  outline-gray-300' />
                        <button className='bg-blue-900 text-white px-3 py-2 hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white shadow'>Search</button>
                    </div>
                </div>

                <div className="md:grid grid-cols-[1fr_4fr] md:py-10 md:px-20 p-5">
                    <div>
                        <div className='flex justify-between'>
                            <h1 className='text-2xl font-medium'>Filters</h1>
                            <span className='md:hidden'><FontAwesomeIcon icon={faBars} onClick={() => setCollapse(!collapse)} /></span>
                        </div>
                        <div className={collapse ? 'md:block' : 'md:block justify-center hidden'}>
                            <div className='mt-3' onClick={() => filter('Literary')}>
                                <input type="radio" id='Literary' name='filter' />
                                <label className='ms-3' htmlFor="Literary">Literary Fiction</label>
                            </div>

                            <div className='mt-3' onClick={() => filter('Philosophy')}>
                                <input type="radio" id='Philosophy' name='filter' />
                                <label className='ms-3' htmlFor="Philosophy">Philosophy</label>
                            </div>

                            <div className='mt-3' onClick={() => filter('Romance')}>
                                <input type="radio" id='Romance' name='filter' />
                                <label className='ms-3' htmlFor="Romance">Romance</label>
                            </div>

                            <div className='mt-3' onClick={() => filter('Horror')}>
                                <input type="radio" id='Horror' name='filter' />
                                <label className='ms-3' htmlFor="Horror">Horror</label>
                            </div>

                            <div className='mt-3' onClick={() => filter('Auto/Biography')}>
                                <input type="radio" id='Auto/Biography' name='filter' />
                                <label className='ms-3' htmlFor="Auto/Biography">Auto/Biography</label>
                            </div>

                            <div className='mt-3' onClick={() => filter('Self-Help')}>
                                <input type="radio" id='Self-Help' name='filter' />
                                <label className='ms-3' htmlFor="Self-Help">Self-Help</label>
                            </div>

                            <div className='mt-3' onClick={() => filter('Politics')}>
                                <input type="radio" id='Politics' name='filter' />
                                <label className='ms-3' htmlFor="Politics">Politics</label>
                            </div>

                            <div className='mt-3' onClick={() => filter('No-Filter')}>
                                <input type="radio" id='No-Filter' name='filter' />
                                <label className='ms-3' htmlFor="No-Filter">No-Filter</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='md:grid grid-cols-4 w-full  '>
                            {
                                allBooks?.length > 0 ?
                                    allBooks?.map((item, index) => (
                                        <div key={index} hidden={item.status == 'pending' || item.status == 'sold'} className='p-3 '>
                                            <div className='p-3 shadow-2xl rounded-lg'>
                                                <img src={item?.imageurl} alt="no image" style={{ width: '100%', height: '300px' }} className='rounded-lg' />
                                                <div className='flex justify-center items-center flex-col mt-3'>
                                                    <p className='font-bold'>{item?.author.slice(0, 20)}...</p>
                                                    <h3>{item?.title.slice(0, 20)}...</h3>
                                                    <Link to={`/view-books/${item._id}`} className='w-full px-3'><button className='px-3 py-2 w-full bg-blue-900 text-white hover:border hover:border-blue-900 hover:text-blue-900 hover:bg-white'>View Book</button></Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                    :
                                    <p>No Books</p>
                            }


                        </div>
                    </div>
                </div>
            </div>}

            {/* not logged in */}
            {!token && <div className='grid grid-cols-3'>
                <div></div>
                <div className='flex flex-col w-full justify-center items-center'>
                    <img src="https://media.tenor.com/9Ez46wr-voMAAAAC/lock.gif" alt="no img" className='w-1/2' />
                    <p className='text-2xl mt-3'>Please <Link to={'/login'} className='text-red-500 underline'>Login</Link> To Explore More</p>
                </div>
                <div></div>
            </div>}

            <Footer />
        </>
    )
}

export default AllBooks
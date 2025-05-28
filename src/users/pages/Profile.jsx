import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { faCircleCheck, faSquarePlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditProfile from '../components/EditProfile'
import { toast, ToastContainer } from 'react-toastify'
import { deleteAUserBookApi, getAllUserBookApi, getAllUserBroughtBookApi, uploadBookApi } from '../../services/allApi'
import { serverUrl } from '../../services/serverUrl'
import { userProfileUpdateStatusContext } from '../../context/ContextShare'

const Profile = () => {
    const [sellStatus, setsellStatus] = useState(true)
    const [bookStatus, setbookStatus] = useState(false)
    const [purchaseStatus, setpurchaseStatus] = useState(false)

    const [bookDetails, setBookDetails] = useState({
        title: "",
        author: "",
        noofpages: "",
        imageurl: "",
        price: "",
        dprice: "",
        abstract: "",
        publisher: "",
        language: "",
        isbn: "",
        category: "",
        uploadedImages: []
    })
    // console.log(bookDetails);

    const [preview, setPreview] = useState("")
    const [previewList, setPreviewList] = useState([])
    const [token, setToken] = useState('')
    const [userBook, setUserBook] = useState([])
    const [userBroughtBook, setUserBroughtBook] = useState([])
    const [deleteStatus, setDeleteStatus] = useState('')
    const [existingUserProfile, setExistingUserProfile] = useState('')
    const { userProfileUpdateStatus } = useContext(userProfileUpdateStatusContext)

    const handleimgUploads = (e) => {
        console.log(e.target.files[0]);

        const fileArray = bookDetails.uploadedImages
        fileArray.push(e.target.files[0])
        setBookDetails({ ...bookDetails, uploadedImages: fileArray })

        const url = URL.createObjectURL(e.target.files[0])
        console.log(url);

        setPreview(url)

        setPreviewList(url)

        const newArray = previewList
        newArray.push(url)
        setPreviewList(newArray)
    }

    const handleReset = () => {
        setBookDetails({
            title: "",
            author: "",
            noofpages: "",
            imageurl: "",
            price: "",
            dprice: "",
            abstract: "",
            publisher: "",
            language: "",
            isbn: "",
            category: "",
            uploadedImages: []
        })
        setPreview("")
        setPreviewList([])
    }

    const handleSubmit = async () => {
        const { title, author, noofpages, imageurl, price, dprice, abstract, publisher, language, isbn, category, uploadedImages } = bookDetails

        if (!title || !author || !noofpages || !imageurl || !price || !dprice || !abstract || !publisher || !language || !isbn || !category || !uploadedImages) {
            toast.info("please fill the form completely")
        } else {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }

            const reqBody = new FormData()

            for (let key in bookDetails) {
                if (key != 'uploadedImages') {
                    reqBody.append(key, bookDetails[key])
                }
                else {
                    bookDetails.uploadedImages.forEach((item) => {
                        reqBody.append("uploadedImages", item)
                    })
                }
            }

            const result = await uploadBookApi(reqBody, reqHeader)
            console.log(result);

            if (result.status == 401) {
                toast.warning(result.response.data)
                handleReset()
            }
            else if (result.status == 200) {
                toast.success('Book addedd succesfully')
                handleReset()
            }
            else {
                toast.error('something went wrong')
                handleReset()
            }

        }
    }

    const getallUserBook = async () => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await getAllUserBookApi(reqHeader)
        console.log(result);
        if (result.status == 200) {
            setUserBook(result.data)
        }
    }

    const getallUserBroughtBook = async () => {
        const reqHeader = {
            "Authorization": `Bearer ${token}`
        }
        const result = await getAllUserBroughtBookApi(reqHeader)
        console.log(result);
        if (result.status == 200) {
            setUserBroughtBook(result.data)
        }
    }

    const handleDelete = async (id) => {
        const result = await deleteAUserBookApi(id)
        console.log(result);
        if (result.status == 200) {
            toast.info('deleted successfully')
            setDeleteStatus(result)
        }
    }

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
            setExistingUserProfile(JSON.parse(sessionStorage.getItem('existingUser')))
        }
    }, [userProfileUpdateStatus])
    // console.log(existingUserProfile);

    useEffect(() => {
        if (bookStatus == true) {
            getallUserBook()
        }
        else if (purchaseStatus == true) {
            getallUserBroughtBook()
        }
        else {
            console.log('something went wrong');
        }

    }, [bookStatus, deleteStatus])

    return (
        <>
            <Header />
            <div className=' w-full bg-gray-900' style={{ height: '200px' }}></div>
            <div style={{ width: '200px', height: '200px', borderRadius: '50%', marginLeft: '70px', marginTop: '-130px' }} className='bg-white p-3 flex justify-center items-center'>
                {existingUserProfile?.Profile == '' ?
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" style={{ width: '180px', height: '180px', borderRadius: '50%' }} />
                    :
                    <img src={`${serverUrl}/uploads/${userProfileUpdateStatus}`} alt="" style={{ width: '180px', height: '180px', borderRadius: '50%' }} />}
            </div>

            <div className='md:flex justify-between items-center px-20 mt-5'>
                <p>
                    <span className='md:text-3xl text-2xl'>{existingUserProfile.username} </span>
                    <FontAwesomeIcon icon={faCircleCheck} className='text-blue-600  ms-3' />
                </p>
                <EditProfile />
            </div>
            <p className='md:px-20 px-5 my-5 text-justify'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae nulla nesciunt doloremque tempore accusamus officia, modi aliquam maxime possimus nobis voluptas! Soluta corrupti ex, nobis aspernatur velit consectetur rem similique!
                Ratione accusantium obcaecati necessitatibus exercitationem at dolores id tempora recusandae, blanditiis provident qui maxime illum minima ullam rem repudiandae voluptate ex quia velit commodi nostrum enim reprehenderit? Repellendus, pariatur quisquam!</p>

            <div className='md:px-40'>
                {/* tab */}
                <div className='flex justify-center items-center  my-5'>
                    <p onClick={() => { setsellStatus(true); setbookStatus(false); setpurchaseStatus(false) }} className={sellStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Sell Book</p>

                    <p onClick={() => { setsellStatus(false); setbookStatus(true); setpurchaseStatus(false) }} className={bookStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Book Status</p>

                    <p onClick={() => { setsellStatus(false); setbookStatus(false); setpurchaseStatus(true) }} className={purchaseStatus ? 'p-4 text-blue-600 border-l border-t border-r border-gray-200 rounded cursor-pointer' : 'p-4 text-black border-b border-gray-200 cursor-pointer'}>Purchase History</p>
                </div>

                {/* content */}
                {sellStatus && <div className='mb-10 bg-gray-200 rounded-lg md:mx-0 mx-2 p-5'>
                    <h1 className='text-center text-3xl font-bold py-4 mb-3 '>Book Details</h1>
                    <div className='md:grid grid-cols-2 '>
                        <div className='px-3'>
                            <div>
                                <input type="text" value={bookDetails.title} onChange={(e) => setBookDetails({ ...bookDetails, title: e.target.value })} placeholder='Title' className='bg-white px-3 py-2 rounded-lg w-full' />
                            </div>
                            <div>
                                <input onChange={(e) => setBookDetails({ ...bookDetails, author: e.target.value })} value={bookDetails.author} type="text" placeholder='Author' className='bg-white px-3 py-2  rounded-lg w-full mt-5' />
                            </div>
                            <div>
                                <input onChange={(e) => setBookDetails({ ...bookDetails, noofpages: e.target.value })} value={bookDetails.noofpages} type="text" placeholder='No of pages' className='bg-white px-3 py-2  rounded-lg w-full  mt-5' />
                            </div>
                            <div>
                                <input onChange={(e) => setBookDetails({ ...bookDetails, imageurl: e.target.value })} value={bookDetails.imageurl} type="text" placeholder='Image Url' className='bg-white px-3 py-2  rounded-lg w-full  mt-5' />
                            </div>
                            <div>
                                <input onChange={(e) => setBookDetails({ ...bookDetails, price: e.target.value })} value={bookDetails.price} type="text" placeholder='Price' className='bg-white px-3 py-2  rounded-lg w-full  mt-5' />
                            </div>
                            <div>
                                <input onChange={(e) => setBookDetails({ ...bookDetails, dprice: e.target.value })} value={bookDetails.dprice} type="text" placeholder='Discount Price' className='bg-white px-3 py-2  rounded-lg w-full  mt-5' />
                            </div>
                            <div>
                                <textarea onChange={(e) => setBookDetails({ ...bookDetails, abstract: e.target.value })} value={bookDetails.abstract} rows={5} placeholder='Abstract' className='bg-white w-full px-3 py-2 mt-5  rounded-lg'></textarea>
                            </div>
                        </div>

                        <div className='px-3'>
                            <div>
                                <input onChange={(e) => setBookDetails({ ...bookDetails, publisher: e.target.value })} value={bookDetails.publisher} type="text" placeholder='Publisher' className='bg-white px-3 py-2  rounded-lg w-full' />
                            </div>
                            <div>
                                <input onChange={(e) => setBookDetails({ ...bookDetails, language: e.target.value })} value={bookDetails.language} type="text" placeholder='Language' className='bg-white px-3 py-2  rounded-lg w-full mt-5' />
                            </div>
                            <div>
                                <input onChange={(e) => setBookDetails({ ...bookDetails, isbn: e.target.value })} value={bookDetails.isbn} type="text" placeholder='ISBN' className='bg-white px-3 py-2  rounded-lg w-full  mt-5' />
                            </div>
                            <div>
                                <input onChange={(e) => setBookDetails({ ...bookDetails, category: e.target.value })} value={bookDetails.category} type="text" placeholder='Category' className='bg-white px-3 py-2  rounded-lg w-full  mt-5' />
                            </div>

                            <div className='mt-3 flex justify-center items-center'>
                                {!preview ? <label htmlFor="imageFile">
                                    <input onChange={(e) => handleimgUploads(e)} id='imageFile' type="file" className='hidden' />
                                    <img src="https://cdn3.iconfinder.com/data/icons/it-and-ui-mixed-filled-outlines/48/default_image-1024.png" alt="no img" style={{ width: '100%', height: '300px' }}
                                    />
                                </label>
                                    :
                                    <img src={preview} alt="no img" style={{ width: '200px', height: '250px' }}
                                    />}
                            </div>

                            {preview && <div className='flex justify-center items-center mt-2'>
                                {previewList?.map((item, index) => (
                                    <img key={index} src={item} alt="no img" style={{ width: '70px', height: '70px' }} className='me-2' />
                                ))}
                                {previewList.length < 3 && <label htmlFor="imageFile">
                                    <input onChange={(e) => handleimgUploads(e)} id='imageFile' type="file" className='hidden' />
                                    <FontAwesomeIcon icon={faSquarePlus} className='fa-2x shadow ms-3' />
                                </label>}
                            </div>}

                        </div>
                    </div>
                    <div className='flex justify-end mt-2'>
                        <button onClick={handleReset} className='bg-amber-400 px-3 py-2 rounded-lg me-3 hover:bg-white hover:border hover:border-amber-400 hover:text-amber-400'>Reset</button>
                        <button onClick={handleSubmit} className='bg-green-600 text-white px-3 py-2 rounded-lg  hover:bg-white hover:border hover:border-green-600 hover:text-green-600'>Submit</button>
                    </div>

                </div>}

                {bookStatus && <div className='p-10 my-20 shadow rounded-lg'>
                    {userBook?.length > 0 ?
                        userBook?.map((item, index) => (
                            <div key={index} className='bg-gray-200 p-4 rounded mb-5'>
                                <div className='md:grid grid-cols-[3fr_1fr]'>
                                    <div className='px-4'>
                                        <h1 className='text-2xl font-bold'>{item?.title}</h1>
                                        <h2>{item?.author}</h2>
                                        <h3 className='text-blue-600'>$ {item?.price} </h3>
                                        <p className='text-justify'>{item?.abstract} </p>

                                        <div className='flex mt-3'>
                                            {item.status == 'pending' && <img src="https://st.depositphotos.com/2274151/2861/i/450/depositphotos_28617343-stock-photo-pending-stamp.jpg" alt="" style={{ width: '70px', height: '70px' }} />}

                                            {item.status == 'Approved' && <img src="https://pngimg.com/uploads/approved/approved_PNG13.png" alt="" style={{ width: '70px', height: '70px' }} />}

                                            {item?.status == 'sold' && <img src="http://clipart-library.com/images_k/sold-transparent-background/sold-transparent-background-10.png" alt="" style={{ width: '70px', height: '70px' }} />}
                                        </div>
                                    </div>

                                    <div>
                                        <img src={item?.imageurl} alt="no img" className='w-full h-80 rounded' />
                                        <div className='flex justify-end mt-4'>
                                            <button type='button' onClick={() => handleDelete(item?._id)} className='px-3 py-2 bg-red-600 text-white hover:bg-white hover:text-red-600  hover:border hover:border-red-600 rounded-md'>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))

                        :
                        <div className='flex flex-col justify-center items-center'>
                            <img src="https://gifdb.com/images/high/book-staring-saying-read-me-eevdk8dxt36nkymw.gif" alt="no img" style={{ width: '200px', height: '200px' }} />
                            <p className='text-red-600 text-2xl'>No Books Yet</p>
                        </div>}

                </div>}

                {purchaseStatus && <div className='p-10 my-20 shadow rounded-lg'>
                    {userBroughtBook?.length > 0 ?
                        userBroughtBook.map((item,index) => (
                            <div key={index} className='bg-gray-200 p-4 mb-5 rounded'>
                                <div className='md:grid grid-cols-[3fr_1fr]'>
                                    <div className='px-4'>
                                        <h1 className='text-2xl font-bold'>{item?.title}</h1>
                                        <h2>{item?.author}</h2>
                                        <h3 className='text-blue-600'>${item?.price}</h3>
                                        <p className='text-justify'>{item?.abstract}</p>

                                        <div className='flex '>
                                            {item.status == 'pending' && <img src="https://st.depositphotos.com/2274151/2861/i/450/depositphotos_28617343-stock-photo-pending-stamp.jpg" alt="" style={{ width: '70px', height: '70px' }} />}

                                            {item.status == 'Approved' && <img src="https://pngimg.com/uploads/approved/approved_PNG13.png" alt="" style={{ width: '70px', height: '70px' }} />}

                                            {item?.status == 'sold' && <img src="http://clipart-library.com/images_k/sold-transparent-background/sold-transparent-background-10.png" alt="" style={{ width: '70px', height: '70px' }} />}
                                        </div>
                                    </div>


                                    <div>
                                        <img src={item?.imageurl} alt="no img" className='w-full' />
                                    </div>
                                </div>
                            </div>
                        ))

                        :
                        <div className='flex flex-col justify-center items-center'>
                            <img src="https://gifdb.com/images/high/book-staring-saying-read-me-eevdk8dxt36nkymw.gif" alt="no img" style={{ width: '200px', height: '200px' }} />
                            <p className='text-red-600 text-2xl'>No Purchase Yet</p>
                        </div>}

                </div>}
            </div>
            <Footer />

            <ToastContainer position="top-center" theme="colored" autoClose={1000} />

        </>
    )
}

export default Profile
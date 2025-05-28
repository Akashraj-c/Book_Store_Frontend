import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../../components/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUpRightFromSquare, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons'
import { applyJobApi, getAllJobApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'

const Careers = () => {

    const [modalStatus, setModalStatus] = useState(false)
    const [allJobs, setAllJobs] = useState("")
    const [searchkey, setSearchKey] = useState("")
    const [token, setToken] = useState("")
    const [title, setTitle] = useState("")
    const [applicationDetails, setApplicationDetails] = useState({
        fullname: "",
        qualification: "",
        email: "",
        phone: "",
        coverletter: "",
        resume: ""
    })
    // console.log(applicationDetails);


    const getAllJobs = async (searchKey) => {
        const result = await getAllJobApi(searchKey)
        // console.log(result);
        if (result.status == 200) {
            setAllJobs(result.data)
        }
    }
    // console.log(allJobs);


    // submit
    const applyAJob = async () => {

        const { fullname, qualification, email, phone, coverletter, resume } = applicationDetails
        if (!fullname || !qualification || !email || !phone || !coverletter || !resume) {
            toast.info('please fill the form completely')
        } else {
            const reqHeader = {
                "Authorization": `Bearer ${token}`
            }
            console.log(reqHeader);

            const reqBody = new FormData()
            for (let key in applicationDetails) {
                reqBody.append(key, applicationDetails[key])
            }
            reqBody.append("jobtitle", title) //title = state

            const result = await applyJobApi(reqBody, reqHeader)
            console.log(result);
            if (result.status == 200) {
                toast.success('apply successfully')
                handleReset()
                setModalStatus(false)
            }
            else if (result.status == 400) {
                toast.info(result.response.data)
                handleReset()
            }
            else {
                toast.error('something went wrong')
                handleReset()
            }
        }
    }

    const handleReset = () => {
        setApplicationDetails({
            fullname: "",
            qualification: "",
            email: "",
            phone: "",
            coverletter: "",
            resume: ""
        })
        // modern browsers wount allow you to set value directly to a input tab with file type (empty value("") is only allowed)
        document.getElementById('fileInput').value = ''
    }

    // open modal
    const handleModal = (data) => {
        setModalStatus(true)
        // console.log(data); 
        setTitle(data)
    }
    // console.log(title);


    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            setToken(sessionStorage.getItem('token'))
        }
        getAllJobs(searchkey)
    }, [searchkey])

    return (
        <>
            <Header />

            <div className='flex justify-center items-center flex-col md:px-40'>
                <h1 className='my-5 text-3xl font-medium'>Careers</h1>
                <p className='md:text-center text-justify p-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa ipsam debitis quam, amet explicabo deserunt dolores odio distinctio asperiores quae dolorum, assumenda temporibus sed possimus perspiciatis ipsum veniam at iure?
                    Libero rem rerum totam tempora, dolor explicabo ipsa delectus maxime numquam odio sapiente cum laboriosam ex aut quas maiores vitae? Impedit repudiandae mollitia obcaecati amet ab fugit similique quibusdam ipsa?</p>
            </div>

            <div className='md:p-20 p-5'>
                <h1 className='text-2xl font-medium'>Current Openings</h1>

                <div className='flex justify-center items-center w-full mt-2'>
                    <input onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Job title' className=' px-3 py-2 border border-gray-200  me-2 placeholder-gray-700 shadow md:w-1/4 w-1/2  outline-gray-300' />
                    <button className='bg-green-900 text-white px-3 py-2 hover:border hover:green-blue-900 hover:text-green-900 hover:bg-white shadow'>Search</button>
                </div>

                <div className='md:px-20 py-5'>
                    {allJobs.length > 0 ?
                        allJobs.map((item, index) => (
                            <div key={index} className='shadow border border-gray-200  mb-4'>
                                <div className='md:grid grid-cols-[8fr_1fr] p-5'>
                                    <div>
                                        <h1>{item?.title}</h1>
                                        <hr />
                                        <p className='mt-3'><FontAwesomeIcon icon={faLocationDot} className='me-3 text-blue-600' />Kochi</p>
                                        <p className='mt-3'>Job Type : {item?.jType}</p>
                                        <p className='mt-3'>Salary : {item?.salary}</p>
                                        <p className='mt-3'>Qualification : {item?.qualification}</p>
                                        <p className='mt-3'>Experience : {item?.experience}</p>
                                        <p className='text-justify mt-3'>Description : {item?.description}</p>
                                    </div>
                                    {/* <div onClick={() => setModalStatus(true)} className='flex md:justify-center items-start justify-end'>
                                        <button className='bg-blue-800 md:mt-0 mt-5 text-white p-3 rounded ms-3 hover:bg-white hover:border hover:border-blue-800 hover:text-blue-800'>Apply <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></button>
                                    </div> */}

                                    <div onClick={() => handleModal(item?.title)} className='flex md:justify-center items-start justify-end'>
                                        <button className='bg-blue-800 md:mt-0 mt-5 text-white p-3 rounded ms-3 hover:bg-white hover:border hover:border-blue-800 hover:text-blue-800'>Apply <FontAwesomeIcon icon={faArrowUpRightFromSquare} /></button>
                                    </div>

                                </div>
                            </div>
                        ))

                        :
                        <p>No job Openings</p>
                    }
                </div>
            </div>


            {/* Modal */}
            {modalStatus && <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

                <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex md:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                            {/* title */}
                            <div className="bg-gray-900 p-4  flex justify-between sm:px-6">
                                <h1 className='text-white text-2xl'>Application form</h1>
                                <FontAwesomeIcon icon={faXmark} onClick={() => setModalStatus(false)} className='text-white fa-2x' />
                            </div>

                            {/* Body */}
                            <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                                <div className="grid grid-cols-2">

                                    <div className='p-3'>
                                        <div className="mb-3">
                                            <input value={applicationDetails.fullname} onChange={(e) => setApplicationDetails({ ...applicationDetails, fullname: e.target.value })} type="text" placeholder='Full Name' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                        </div>
                                        <div className="mb-3 ">
                                            <input value={applicationDetails.email} onChange={(e) => setApplicationDetails({ ...applicationDetails, email: e.target.value })} type="text" placeholder='Email ID' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                        </div>
                                    </div>

                                    <div className='p-3'>
                                        <div className="mb-3">
                                            <input value={applicationDetails.qualification} onChange={(e) => setApplicationDetails({ ...applicationDetails, qualification: e.target.value })} type="text" placeholder='Qualification' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                        </div>
                                        <div className="mb-3 ">
                                            <input value={applicationDetails.phone} onChange={(e) => setApplicationDetails({ ...applicationDetails, phone: e.target.value })} type="text" placeholder='Phone' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full' />
                                        </div>
                                    </div>

                                </div>

                                <div className="mb-3 px-3 w-full">
                                    <textarea onChange={(e) => setApplicationDetails({ ...applicationDetails, coverletter: e.target.value })} placeholder='Cover Letter' className='p-2 border border-gray-400 rounded placeholder-gray-500 w-full'></textarea>
                                </div>

                                <div className="mb-3 px-3 w-full">
                                    <p className='text-gray-400'>Resume</p>
                                    <input id='fileInput' onChange={(e) => setApplicationDetails({ ...applicationDetails, resume: e.target.files[0] })} type="file" className='border border-gray-400 rounded placeholder-gray-500 w-full file:bg-gray-400 file:p-2 file:text-white' />
                                </div>
                            </div>

                            {/* Footer of the modal */}
                            <div class="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button onClick={applyAJob} type="button" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white hover:text-black hover:border hover:border-green-600 sm:ml-3 sm:w-auto">Submit</button>

                                <button onClick={handleReset} type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold shadow-xs ring-1 ring-gray-300 ring-inset text-white hover:text-black hover:border hover:border-orange-500  hover:bg-gray-50 sm:mt-0 sm:w-auto">Reset</button>
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

export default Careers
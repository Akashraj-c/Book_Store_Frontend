import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import AdminHeader from '../components/AdminHeader'
import AdminSidebar from '../components/AdminSidebar'
import { faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash'
import { addJobApi, deleteJobApi, getAllApplicantApi, getAllJobApi } from '../../services/allApi'
import { toast, ToastContainer } from 'react-toastify'
import { serverUrl } from '../../services/serverUrl'
import { Link } from 'react-router-dom'


const AdminCareers = () => {
  const [JobPost, setJobPost] = useState(true)
  const [viewApplicant, setViewApplicant] = useState(false)
  const [modalStatus, setModalStatus] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [jobDetails, setJobDetails] = useState({
    title: "",
    location: "",
    jType: "",
    salary: "",
    qualification: "",
    experience: "",
    description: ""
  })
  const [allJobData, setAllJobData] = useState([])
  const [addJobStatus, setAddJobStatus] = useState({})
  const [deleteJobStatus, setDeleteJobStatus] = useState({})
  const [allApplicant, setAllApplicant] = useState([])



  const handleReset = () => {
    setJobDetails({
      title: "",
      location: "",
      jType: "",
      salary: "",
      qualification: "",
      experience: "",
      description: ""
    })
  }

  const addJob = async () => {
    const { title, location, jType, salary, qualification, experience, description } = jobDetails
    if (!title || !location || !jType || !salary || !location || !qualification || !experience || !description) {
      toast.info('please fill the form completely')
    }
    else {
      const result = await addJobApi({
        title, location, jType, salary, qualification, experience, description
      })
      console.log(result);
      if (result.status == 200) {
        toast.success('job added successfully')
        handleReset()
        setModalStatus(false)
        setAddJobStatus(result.data)
      }
      else if (result.status == 400) {
        toast.warning(result.response.data)
        handleReset()
      }
      else {
        toast.error('something went wrong')
        handleReset()
      }
    }
  }

  const getAllJobs = async (searchKey) => {
    const result = await getAllJobApi(searchKey)
    // console.log(result);
    if (result.status == 200) {
      setAllJobData(result.data)
    }
  }
  // console.log(allJobData);

  const deleteJob = async (id) => {
    const result = await deleteJobApi(id)
    console.log(result);
    if (result.status == 200) {
      setDeleteJobStatus(result.data)
    }
  }

  const getAllAplicant = async () => {
    const result = await getAllApplicantApi()
    // console.log(result);
    if (result.status == 200) {
      setAllApplicant(result.data)
    }
  }
  console.log(allApplicant);

  useEffect(() => {
    if (JobPost == true) {
      getAllJobs(searchKey)
    }
    else if (viewApplicant == true) {
      getAllAplicant()
    }
    else {
      console.log('something went wrong');
    }
  }, [addJobStatus, searchKey, deleteJobStatus, JobPost, viewApplicant])


  return (
    <>
      <AdminHeader />
      <div className='md:grid grid-cols-[1fr_4fr]'>
        <div className='bg-blue-100 flex flex-col items-center p-5' style={{ marginTop: '-6px' }}>
          <AdminSidebar />
        </div>

        <div className='flex flex-col items-center mt-10'>
          <h1 className=' text-2xl font-bold'>All Books</h1>

          <div className='mt-5 flex '>
            <p onClick={() => { setJobPost(true); setViewApplicant(false) }} className={JobPost ? 'px-2 text-blue-600 border-t border-r cursor-pointer' : "px-2 border-r border-b cursor-pointer"}>Job Post</p>
            <p onClick={() => { setJobPost(false); setViewApplicant(true) }} className={viewApplicant ? 'px-2 text-blue-600 border-t  cursor-pointer' : "px-2  border-b cursor-pointer"}>View Applicant</p>
          </div>

          {JobPost && <div>
            <div className='w-full flex justify-between items-center mt-10 md:px-20 px-2'>
              <div className='flex items-center w-full'>
                <input value={searchKey} onChange={(e) => setSearchKey(e.target.value)} type="text" placeholder='Job title' className=' px-3 py-2 border border-gray-200  me-2 placeholder-gray-700 shadow md:w-2/6 w-2/3  outline-gray-300' />
                <button className='bg-green-900 text-white px-3 py-2 hover:border hover:green-blue-900 hover:text-green-900 hover:bg-white shadow'>Search</button>
              </div>

              <div >
                <button onClick={() => setModalStatus(true)} className='py-1 text-blue-600  border border-blue-600 md:w-26 w-20 '>Add Job</button>
              </div>
            </div>

            <div className='md:px-20 py-20 px-5'>
              {allJobData?.length > 0 ?
                allJobData?.map((item, index) => (
                  <div key={index} className='shadow border border-gray-200 mb-4'>
                    <div className='md:grid grid-cols-[8fr_1fr] p-5'>
                      <div>
                        <h1>{item?.title}</h1>
                        <hr />
                        <p className='mt-3'><FontAwesomeIcon icon={faLocationDot} className='me-3 text-blue-600' />Kochi</p>
                        <p className='mt-3'>Job Type : {item?.jType}</p>
                        <p className='mt-3'>Salary : {item?.salary}</p>
                        <p className='mt-3'>Qualification : {item?.qualification} </p>
                        <p className='mt-3'>Experience : {item?.experience}</p>
                        <p className='text-justify mt-3'>Description: {item?.description}</p>
                      </div>
                      <div className='flex md:justify-center items-start justify-end'>
                        <button onClick={() => deleteJob(item?._id)} className='bg-red-600 md:mt-0 mt-5 text-white px-4 py-2 rounded ms-3 hover:bg-white hover:border hover:border-red-600 hover:text-red-600'>Delete <FontAwesomeIcon icon={faTrash} className='ms-1' /></button>
                      </div>
                    </div>
                  </div>
                ))
                :
                <p>no jobs added</p>
              }
            </div>
          </div>}

          {viewApplicant && <div className='mt-10 w-full '>
            <div className='flex items-center px-12'>
              <input type="text" placeholder='Job title' className=' px-3 py-2 border border-gray-200  me-2 placeholder-gray-700 shadow outline-gray-300 md:w-2/6 w-full' />
              <button className='bg-green-900 text-white px-3 py-2 hover:border hover:green-blue-900 hover:text-green-900 hover:bg-white shadow'>Search</button>
            </div>

            <div className='overflow-x-auto'>
              {allApplicant?.length > 0 ?
                <table className='md:mx-10 mx-5 md:my-20 my-14 table-fixed '>
                  <thead className='bg-blue-600 px-10 rounded-2xl text-white'>
                    <tr>
                      <th className='py-2 px-10 border rounded-bl-lg rounded-tl-lg'>SL.NO</th>
                      <th className='py-2 px-10 w-full'>Job Title</th>
                      <th className='py-2 px-10 border '>Name</th>
                      <th className='py-2 px-10 border '>Qualification</th>
                      <th className='py-2 px-10 border '>Email</th>
                      <th className='py-2 px-10 border '>Phone</th>
                      <th className='py-2 px-10 border '>Cover Letter</th>
                      <th className='py-2 px-10 border rounded-br-lg rounded-tr-lg'>Resume</th>
                    </tr>
                  </thead>
                  <tbody className='border border-gray-300' >
                    {allApplicant.map((item, index) => (
                      <tr key={index}>
                        <td className='py-2 px-3 border border-gray-200'>{index + 1}</td>
                        <td className='py-2 px-2 border border-gray-200'>{item?.jobtitle}</td>
                        <td className='py-2 px-2 border border-gray-200'>{item?.fullname}</td>
                        <td className='py-2 px-2 border border-gray-200'>{item?.qualification}</td>
                        <td className='py-2 px-2 border border-gray-200'>{item?.email}</td>
                        <td className='py-2 px-2 border border-gray-200'>{item?.phone}</td>
                        <td className='py-2 px-2 border border-gray-200'>{item?.coverletter}</td>
                        <td className='py-2 px-2 border border-gray-200'><Link target='_blank' className='text-blue-600 underline' to={`${serverUrl}/pdfUpload/${item?.resume}`}> {item?.resume.slice(0,16)}</Link></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                :
                <p className='text-center mt-10'>No Applicantions yet</p>
              }
            </div>
          </div>}

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
              <div class="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                <div className='mb-4'>
                  <input type="text" value={jobDetails.title} onChange={(e) => setJobDetails({ ...jobDetails, title: e.target.value })} placeholder='Job Title' className='bg-white px-3 py-2 rounded-lg w-full border border-gray-400 outline-gray-200' />
                </div>

                <div className='mb-4'>
                  <input type="text" value={jobDetails.location} onChange={(e) => setJobDetails({ ...jobDetails, location: e.target.value })} placeholder='Location' className='bg-white px-3 py-2 rounded-lg w-full border border-gray-400 outline-gray-200' />
                </div>

                <div className='mb-4'>
                  <input type="text" value={jobDetails.jType} onChange={(e) => setJobDetails({ ...jobDetails, jType: e.target.value })} placeholder='Job Type' className='bg-white px-3 py-2 rounded-lg w-full border border-gray-400 outline-gray-200' />
                </div>

                <div className='mb-4'>
                  <input type="text" value={jobDetails.salary} onChange={(e) => setJobDetails({ ...jobDetails, salary: e.target.value })} placeholder='Salary' className='bg-white px-3 py-2 rounded-lg w-full border border-gray-400 outline-gray-200' />
                </div>

                <div className='mb-4'>
                  <input type="text" value={jobDetails.qualification} onChange={(e) => setJobDetails({ ...jobDetails, qualification: e.target.value })} placeholder='Qualification' className='bg-white px-3 py-2 rounded-lg w-full border border-gray-400 outline-gray-200' />
                </div>

                <div className='mb-4'>
                  <input type="text" value={jobDetails.experience} onChange={(e) => setJobDetails({ ...jobDetails, experience: e.target.value })} placeholder='Experience' className='bg-white px-3 py-2 rounded-lg w-full border border-gray-400 outline-gray-200' />
                </div>

                <div className='mb-4'>
                  <textarea type="text" value={jobDetails.description} onChange={(e) => setJobDetails({ ...jobDetails, description: e.target.value })} placeholder='Description' className='bg-white px-3 py-2 rounded-lg w-full border border-gray-400 outline-gray-200' />
                </div>


              </div>

              {/* Footer of the modal */}
              <div class="bg-gray-200 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button onClick={addJob} type="button" class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-white hover:text-black hover:border hover:border-green-600 sm:ml-3 sm:w-auto">Submit</button>

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

export default AdminCareers
import { commonApi } from "./commonApi"
import { serverUrl } from "./serverUrl"


// register - content-Type - Application/json
export const registerApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/register`,reqBody)
}

// login
export const loginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/login`,reqBody)
}

// google login api
export const googleLoginApi = async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/google-login`,reqBody)
}

// get home book
export const homeBookApi =async()=>{
    return await commonApi('GET',`${serverUrl}/all-home-book`)
}


// get all jobs
export const getAllJobApi = async(searchKey)=>{
    return await commonApi('GET',`${serverUrl}/get-allJobs?search=${searchKey}`)
}



// ------------------------

// users
//  upload book

export const uploadBookApi = async(reqBody , reqHeader)=>{
    return await commonApi ('POST',`${serverUrl}/add-book`,reqBody,reqHeader)
}

// get all books
export const getAllBookApi =async(searchKey,reqHeader)=>{
    // query parameter  baseurl?key=value
    return await commonApi('GET',`${serverUrl}/all-books?search=${searchKey}`,'',reqHeader)
}

// api to view a book
export const getABookApi = async(id)=>{
    return await commonApi('GET',`${serverUrl}/view-book/${id}`)
}

// api to apply job application
export const applyJobApi =async(reqBody,reqHeader)=>{
    return await commonApi("POST",`${serverUrl}/apply-job`,reqBody,reqHeader)
}

// api edit user profile
export const editUserProfileApi = async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/edit-user-profile`,reqBody,reqHeader)
}

// api to get all user book
export const getAllUserBookApi=async(reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/user-book`,"",reqHeader)
}

// api to delete a user boook api
export const deleteAUserBookApi = async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/delete-user-book/${id}`)
}

// api to get all user brought book
export const getAllUserBroughtBookApi=async(reqHeader)=>{
    return await commonApi("GET",`${serverUrl}/user-brought-book`,"",reqHeader)
}

// api to make payment
export const makePaymentApi =async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/make-payment`,reqBody,reqHeader)
}

// ------------------------Admin
// 
export const getAllBookAdminApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/admin-allBook`,"",reqHeader)
}

// api to approve a book
export const approveBookApi = async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/approve-book`,reqBody,reqHeader)
}

// api to get all users
export const getallUserApi = async(reqHeader)=>{
    return await commonApi('GET',`${serverUrl}/all-Users`,"",reqHeader)
}

// api to add-job
export const addJobApi=async(reqBody)=>{
    return await commonApi('POST',`${serverUrl}/add-job`,reqBody)
}

// api to delete a job
export const deleteJobApi = async(id)=>{
    return await commonApi('DELETE',`${serverUrl}/delete-job/${id}`)
}

// api to get all applicant
export const getAllApplicantApi = async()=>{
    return await commonApi('GET',`${serverUrl}/all-applicant`)
}

// api to update the profile
export const updateProfileApi = async(reqBody,reqHeader)=>{
    return await commonApi('PUT',`${serverUrl}/admin-profile-update`,reqBody,reqHeader)
}
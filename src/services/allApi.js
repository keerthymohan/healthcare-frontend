import { commonApi } from "./commonApi"
import { serverUrl } from "./serviceUrl"


// admin login
export const adminLoginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/adminlogin`, reqBody, "")
}

// add doctor
export const addDoctorApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/add-doctor`, reqBody, reqHeader)
}

// add documents
export const addDocumentsApi = async(reqBody,reqHeader)=>{
    return await commonApi('POST',`${serverUrl}/add-document`,reqBody,reqHeader)
}
// get admin doctor
export const getAdminDoctorApi = async () => {
    return await commonApi('GET', `${serverUrl}/all-doctor`)
}

// get userall doctor
export const getAllUserDoctorApi = async(searchKey)=>{
    return await commonApi('GET',`${serverUrl}/all-userdoctor?search=${searchKey}`)
}

// user register
export const registerRequestApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/register`, reqBody, "")
}
// user login
export const loginApi = async (reqBody) => {
    return await commonApi('POST', `${serverUrl}/login`, reqBody, "")
}
// get  doctor
export const getDoctorListApi = async () => {
    return await commonApi('GET', `${serverUrl}/doctor-list`)
}

// get document
export const getAllDocumentApi = async()=>{
    return await commonApi('GET',`${serverUrl}/display-document`)
}

// api to remove documents
export const deleteDocumentApi = async(id,reqHeader)=>{
    return await commonApi('DELETE',`${serverUrl}/remove-documents/${id}`,{},reqHeader)
}

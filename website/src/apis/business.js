import { get, patch, post, destroy } from './httpClient'

export const addBusiness = (body) => post('/business/create', body)
export const updateBusiness = (body, id) => patch(`/business/update/${id}`, body)
export const getBusinesses = (query) => get('/business', query)
export const deleteBusinesses = (body) => get('/business/delete', body)
export const getOtp = (company_phone) => patch('/business/getotp', { company_phone })
export const verifyOtp = (body) => post('/business/verifyotp', body)

export const setstatus = (id,status) => patch('/business/setstatus', { business_id: [id],status: status })
export const setprofilestatus = (id,profile_status) => patch('/business/setprofilestatus', {business_id: id, profile_status: profile_status})

export const detailBusiness = (params) => get(`/business/getone/${params}`)
export const getProductList = (params) => get(`/business/product_list/${params}`)
export const validate = (body) => patch('/business/validate',body)
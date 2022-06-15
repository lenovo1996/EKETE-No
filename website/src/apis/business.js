import { get, patch, post, destroy } from './httpClient'

export const addBusiness = (body) => post('/business/create', body)
export const updateBusiness = (body, id) => post('/business/update/' + id, body)
export const getBusinesses = (query) => get('/business', query)
export const deleteBusinesses = (body) => get('/business/delete', body)
export const getOtp = (company_phone) => post('/business/getotp', { company_phone })
export const verify = (body) => post('/business/verifyotp', body)

export const setstatus = (id,status) => patch('/business/setstatus', { business_id: [id],status: status })
export const detailBusiness = (params) => get(`/business/getone/${params}`)
export const getProductList = (params) => get(`/business/product_list/${params}`)


import { post, get, patch, destroy } from './httpClient'

export const register = (body) => post('/admin/register', body)
export const login = (body, headers) => post('/admin/login', body, headers)
export const getOtpAdmin = (body, headers) => post('/admin/getOtpAdmin', body, headers)
export const verify = (body) => post('/admin/verifyotp', body)
// export const getOtp = (body, headers) => post('admin/loginadmin', body, headers)
export const loginAdmin = (body, headers) => post('admin/loginadmin', body, headers)
export const getOtp = (phone) => post('admin/getotp', { phone })


export const checkAdmin = (phone) => post('/admin/check-admin', { phone })
export const checkLink = (body) => post('/authorization/checkverifylink', body)
export const createuserAdmin = (body) => post('admin/create', body)
export const getuserAdmin = (query) => get('/admin', query)
export const updateuserAdmin = (body, id) => patch(`/admin/update/${id}`, body)
export const deleteuserAdmin = (userAdmin_id) => destroy(`/admin/delete/${userAdmin_id}`)

export const resetPassword = (body) => post('/admin/recoverypassword', body)
// export const refresh = (body) => post('/userEKT/refreshtoken', body)
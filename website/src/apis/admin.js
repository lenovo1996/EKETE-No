import { post, get, patch } from './httpClient'

export const register = (body) => post('/admin/register', body)
export const login = (body, headers) => post('/admin/login', body, headers)
export const getOtpAdmin = (body, headers) => post('/admin/getOtpAdmin', body, headers)
export const verify = (body) => post('/admin/verifyotp', body)
export const getOtp = (body, headers) => post('admin/getotp', body, headers)
export const checkAdmin = (phone) => post('/admin/check-admin', { phone })
export const checkLink = (body) => post('/authorization/checkverifylink', body)

export const getuserAdmin = (query) => get('admin', query)
export const updateuserAdmin = (body, id) => patch(`/admin/update/${id}`, body)




// export const resetPassword = (body) => post('/userEKT/recoverypassword', body)
// export const refresh = (body) => post('/userEKT/refreshtoken', body)
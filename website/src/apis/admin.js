import { post, get, patch } from './httpClient'

export const register = (body) => post('/admin/register', body)
export const login = (body, headers) => post('/admin/login', body, headers)

export const verify = (body) => post('/admin/verifyotp', body)
export const getOtpLogin = (body, headers) => post('admin/getotp-login', body, headers)
export const checkAdmin = (phone) => post('/admin/check-admin', { phone })
export const checkLink = (body) => post('/authorization/checkverifylink', body)
export const getOtp = (phone) => post('admin/getotp', { phone })

export const getuserAdmin = (query) => get('admin', query)
export const updateuserAdmin = (body, id) => patch(`/admin/update/${id}`, body)

export const resetPassword = (body) => post('/admin/recoverypassword', body)
// export const refresh = (body) => post('/userEKT/refreshtoken', body)
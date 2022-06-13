import { get, post, destroy, patch } from './httpClient'

export const addMenu = (body) => post('/menuUserEKT/create', body)
export const getMenuU = (query) => get('/menuUserEKT', query)
export const updateMenu = (body, id) => patch(`/menuUserEKT/update/${id}`, body)
export const deleteMenu = (id) => patch('/menuUserEKT/delete', { menu_id: [id] })
export const setstatus = (id,status) => patch('/menuUserEKT/setstatus', { menu_id: [id],status: status })
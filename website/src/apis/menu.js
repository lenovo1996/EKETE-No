import { get, post, destroy, patch } from './httpClient'

export const addMenu = (body) => post('/menu/create', body)
export const getMenu = (query) => get('/menu', query)
export const updateMenu = (body, id) => patch(`/menu/update/${id}`, body)
export const deleteMenu = (id) => patch('/menu/delete', { menu_id: [id] })
export const setstatus = (id,status) => patch('/menu/setstatus', { menu_id: [id],status: status })
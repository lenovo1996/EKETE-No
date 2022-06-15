import { get, post, destroy, patch } from './httpClient'

export const addMenu = (body) => post('/menuAdmin/create', body)
export const getMenu = (query) => get('/menuAdmin', query)
export const updateMenu = (body, id) => patch(`/menuAdmin/update/${id}`, body)
export const deleteMenu = (id) => patch('/menuAdmin/delete', { menu_id: [id] })
export const setstatus = (id,body) => patch('/menuAdmin/setstatus', { menu_id: [id], body })
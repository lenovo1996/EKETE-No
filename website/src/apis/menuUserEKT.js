import { get, post, destroy, patch } from './httpClient'

export const addMenu = (body) => post('/menuUserEKT/create', body)
export const getMenu = (query) => get('/menuUserEKT', query)
export const updateMenu = (body, id) => patch(`/menuUserEKT/update/${id}`, body)
export const deleteMenu = (id) => destroy('/menuUserEKT/delete', { menu_id: [id] })
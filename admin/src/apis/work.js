import { get } from './httpClient'

export const getWork = (query) => get('/work', query)
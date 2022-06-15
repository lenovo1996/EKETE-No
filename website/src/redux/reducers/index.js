import { combineReducers } from 'redux'
import login from './login.js'
import store from './store.js'
import branch from './branch.js'
import invoice from './invoice.js'
import setting from './setting.js'
import menuAdmin from './menu-admin'
import menuUser from './menu-user'
const rootReducers = combineReducers({ login, store, branch, invoice, setting, menuAdmin, menuUser})
export default rootReducers

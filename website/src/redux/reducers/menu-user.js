import {each} from 'underscore'

let initialState = [];

const menuUser = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MENU_USER': {
      state = action.menu_data;
      return [ ...state ]
    }

    case 'UPDATE_MENU_USER': {
      each(state, (item, index) => {
        if (item.menu_id == action.menu_id) {
          state[index].status = action.status;
        }
      })
      return [ ...state ]
    }

    default:
      return state
  }
}

export default menuUser

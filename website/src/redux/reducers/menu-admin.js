import {each} from 'underscore'

let initialState = [];

const menuAdmin = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MENU_ADMIN': {
      state = action.menu_data;
      return [ ...state ]
    }

    case 'UPDATE_MENU_ADMIN': {
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

export default menuAdmin

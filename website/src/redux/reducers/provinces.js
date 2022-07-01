import {each} from 'underscore'

let initialState = [];

const provinces = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PROVINCES': {
      state = action.provinces_data;
      return [ ...state ]
    }
    default:
      return state
  }
}

export default provinces

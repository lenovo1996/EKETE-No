import {each} from 'underscore'

let initialState = [];

const business = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BUSINESS': {
      state = action.data;
      return [ ...state ]
    }

    case 'UPDATE_BUSINESS': {
      each(state, (item, index) => {
        if (item.business_id == action.data.business_id) {
          each(['status', 'profile_status'], (field) => {
            if (typeof action.data[field] != 'undefined') {
              state[index][field] = action.data[field];
            }
          })
        }
      })
      return [ ...state ]
    }

    default:
      return state
  }
}

export default business

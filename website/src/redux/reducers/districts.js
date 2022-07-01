import {each} from 'underscore'

let initialState = [];

const districts = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_DISTRICTS': {
      state = action.districts_data;
      return [ ...state ]
    }
    default:
      return state
  }
}

export default districts

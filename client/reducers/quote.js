import {
  QUOTE_REQUEST, QUOTE_SUCCESS, QUOTE_FAILURE
} from '../actions'

const initialState = {
  isFetching: false,
  quote: '',
  errorMessage: ''
}

export default function quote(state = initialState, action) {
  switch (action.type) {
    case QUOTE_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: ''
      }
    case QUOTE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        quote: action.response,
      }
    case QUOTE_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      }
    default:
      return state
    }
}
import {combineReducers} from 'redux'

import auth from './auth'
import quote from './quote'

// We combine the reducers here so that they
// can be left split apart above
const quotesApp = combineReducers({
  auth,
  quote
})

export default quotesApp
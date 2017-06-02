import request from '../utils/api'
import { saveUserToken, removeUser } from '../utils/auth'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

function requestRegister(creds) {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

export function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function registerUser (creds) {
    return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestRegister(creds))

    return request('post', '/register', creds)
      .then((response) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(registerError(response.body.message))
          return Promise.reject(response.body.message)
        } else {
          // If login was successful, set the token in local storage
          const userInfo = saveUserToken(response.body.token)
          // Dispatch the success action
          dispatch(receiveLogin(userInfo))
        }
      }).catch(err => 
        dispatch(registerError(err.response.body.message))
      )
  }
}


// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    user
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return request('post', '/authenticate', creds)
      .then((response) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(response.body.message))
          return Promise.reject(response.body.message)
        } else {
          // If login was successful, set the token in local storage
         const userInfo = saveUserToken(response.body.token)
          // Dispatch the success action
          dispatch(receiveLogin(userInfo))
        }
      }).catch(err => dispatch(loginError(err.response.body.message)))
  }
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Logs the user out
export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout())
    removeUser()
    dispatch(receiveLogout())
  }
}

export const QUOTE_REQUEST = 'QUOTE_REQUEST'
export const QUOTE_SUCCESS = 'QUOTE_SUCCESS'
export const QUOTE_FAILURE = 'QUOTE_FAILURE'

// Uses the API middlware to get a quote
export function fetchQuote () {
  return function (dispatch) {
    dispatch(requestQuote())
    request('get', '/quote')
    .then(res => {
      dispatch(receiveQuote(res.body.message))
    })
    .catch(err => dispatch(quoteError(err.response.body.message)))
  }
}

export function fetchSecretQuote () {
  return function (dispatch) {
    dispatch(requestQuote())
    request('get', '/secret')
    .then(res => {
      dispatch(receiveQuote(res.body.message))
    })
    .catch(err => dispatch(quoteError(err.response.body.message)))
  }
}

export function receiveQuote (quote) {
  return {
    type: QUOTE_SUCCESS,
    isFetching: false,
    response: quote
  }
}

function requestQuote() {
  return {
    type: QUOTE_REQUEST,
    isFetching: true,
  }
}

function quoteError(message) {
  return {
    type: QUOTE_FAILURE,
    isFetching: false,
    message
  }
}

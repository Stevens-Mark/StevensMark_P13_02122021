// import axios
import axios from 'axios'
// redux tools kit functions
import { createAction, createReducer } from '@reduxjs/toolkit'

/**
* Initial state
*/
const initialTokenState = {
  isLoading: false,
  isLoggedIn: false,
  token: null,
  isError: '',
}

/**
 * Actions
 */
export const tokenFetching = createAction('token/fetching')

export const tokenResolved = createAction(
  'token/resolved',
  (token) => ({
    payload:  token,
  })
)

export const tokenRejected = createAction(
  'token/rejected',
  (error) => ({
    payload:  error,
  })
)

// reset to initial state on logout
export const tokenReset = createAction('token/reset')

/**
 * API call
 * Checks if user exists in the database & if true returns a 'token'
 * @function fetchToken
 * @param {object} store 
 * @param {string} email 
 * @param {string} password 
 * @returns {string} token or error message to store
 */
export async function fetchToken(store, email, password) {
  // start the request
    store.dispatch(tokenFetching())
  try {
    // use axios to make the query
    const response = await axios.post('http://localhost:3001/api/v1/user/login', {
      email: email,
      password: password
    })
    const token = await response.data.body.token
    // if request resolved then save the token in the store
     store.dispatch(tokenResolved(token))
   } catch (error) {
    // otherwise request rejected
    store.dispatch(tokenRejected(error.response.data.message))
  }
}

/**
 *  Reducer for token fetching
 * @function createReducer
 * @param {object} state
 * @param {string} action
 * @returns {object} new state
 */
 export default createReducer(initialTokenState, (builder) => {
  builder
  .addCase(tokenFetching, (draft, action) => {
    draft.isLoading = true
    return
  })
  .addCase(tokenResolved, (draft, action) => {
    draft.isLoading = false
    draft.isLoggedIn = true
    draft.token = action.payload
    draft.isError = ''
    return
  })
  .addCase(tokenRejected, (draft, action) => {
    draft.isLoading = false
    draft.isLoggedIn = false
    draft.token = null
    draft.isError = action.payload
    return
  })
  // for user logout
  .addCase(tokenReset, (draft, action) => {
    draft.isLoading = false
    draft.isLoggedIn = false
    draft.token = null
    draft.isError = ''
    return 
  })
})



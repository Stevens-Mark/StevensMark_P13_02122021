// import axios
import axios from 'axios'
// redux tools kit function
import { createAction, createReducer } from '@reduxjs/toolkit'

/**
* Initial state
*/
const initialUserState = {
  isLoading: false,
  isUpdated: false,
  user: {},
  isError: '',
}

/**
 * Actions
 */
// for fetching user data
export const userFetching = createAction('user/fetching')

export const userResolved = createAction(
  'user/resolved',
  (user) => ({
    payload:  user,
  })
)

export const userRejected = createAction(
  'user/rejected',
  (error) => ({
    payload:  error,
  })
)

// for updating user data
export const userUpdateSending = createAction('user/updateSending')

export const userUpdateSuccess = createAction(
  'user/updateSuccess',
  (user) => ({
    payload:  user,
  })
)

export const userUpdateFail = createAction('user/updateFail')

// reset to initial state on logout
export const userReset = createAction('user/reset')

/**
 * API call
 * Using the retrieved 'token' for authentication 
 * the function retrieves the user's name
 * @function fetchUser
 * @param {object} store 
 * @param {string} token
 * @returns {object|string} user information or error message to store
 */
 export async function fetchUser(store, token) {
  // start the request
    store.dispatch(userFetching())
  try {
    // use axios to make the query
    const response = await axios.post('http://localhost:3001/api/v1/user/profile', 
    {}, 
    {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })
    const user = await response.data.body
    // if request resolved then save the user in the store
     store.dispatch(userResolved(user))
  } catch (error) {
    // otherwise request rejected
    store.dispatch(userRejected(error.response.data.message))
  }
}

/**
 * API call
 * Using the retrieved 'token' for authentication 
 * the function updates the user name
 * @function updateUser
 * @param {object} store 
 * @param {string} token
 * @param {string} newFirst: new first name
 * @param {string} newLast: new last name
 * @returns {object} user's new name to store
 */
 export async function updateUser(store, token, firstName, lastName) {
  // start the update request
    store.dispatch(userUpdateSending())
  try {
    // use axios to make the query
    const response = await axios.put('http://localhost:3001/api/v1/user/profile', 
    {
       firstName, lastName
    }, 
    {
      headers: { 'Authorization': `Bearer ${token}`}
    })
    const user = await response.data.body
    // if request update resolved then save the user in the store
     store.dispatch(userUpdateSuccess(user))
  } catch (error) {
    // otherwise update request rejected
    store.dispatch(userUpdateFail())
  }
}

/**
 * Reducer for user fetching & updating
 * @function createReducer
 * @param {object} state
 * @param {string} action
 * @returns {object} new state
 */
export default createReducer(initialUserState, (builder) => {
  builder
  .addCase(userFetching, (draft, action) => {
    draft.isLoading = true
    return
  })
  .addCase(userResolved, (draft, action) => {
    draft.isLoading = false
    draft.user = action.payload
    draft.isError = ''
    return
  })
  .addCase(userRejected, (draft, action) => {
    draft.isLoading = false
    draft.user = {}
    draft.isError = action.payload
    return
  })
  // for user name updating
  .addCase(userUpdateSending, (draft, action) => {
    draft.isLoading = true
    return
  })
  .addCase(userUpdateSuccess, (draft, action) => {
    draft.isLoading = false
    draft.isUpdated = true
    draft.user = action.payload
    draft.isError = ''
    return
  })
  .addCase(userUpdateFail, (draft, action) => {
    draft.isLoading = false
    draft.isUpdated = false
    // draft.isError = action.payload
    return
  })
  // for user logout
  .addCase(userReset, (draft, action) => {
    draft.isLoading = false
    draft.isUpdated = false
    draft.user = {}
    draft.isError = ''
    return 
  })
})

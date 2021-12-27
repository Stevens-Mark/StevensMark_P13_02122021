// import axios
import axios from 'axios'
// import the Immer produce function
import produce from "immer"
// redux tools kit function
import { createAction } from '@reduxjs/toolkit'

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
* Initial state
*/
 const initialUserState = {
   isLoading: false,
   isUpdated: false,
   user: {},
   isError: '',
 }

/**
 * @function userReducer
 * @param {object} state
 * @param {string} action
 * @returns {object} new state
 */
export function userReducer(state = initialUserState, action) {
  // use immer to change the state
  return produce(state, (draft) => {
    // make a switch on the type of the action
    switch (action.type) {
      case userFetching.toString(): {
          draft.isLoading = true
          return
      }
       case userResolved.toString(): {
          draft.isLoading = false
          draft.user = action.payload
          draft.isError = ''
          return
      }
      case userRejected.toString(): {
          draft.isLoading = false
          draft.user = {}
          draft.isError = action.payload
          return
      }
      // for user name updating
      case userUpdateSending.toString(): {
        draft.isLoading = true
        return
      }
      case userUpdateSuccess.toString(): {
        draft.isLoading = false
        draft.isUpdated = true
        draft.user = action.payload
        draft.isError = ''
        return
      }
      case userUpdateFail.toString(): {
        draft.isLoading = false
        draft.isUpdated = false
        // draft.isError = action.payload
        return
      }
      // for user logout
      case userReset.toString(): {
        draft.isLoading = false
        draft.isUpdated = false
        draft.user = {}
        draft.isError = ''
        return 
      }
      // Otherwise (invalid action)
      default:
        // do nothing (return the state without modifications)
        return state
    }
  })
}

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
    console.log(user)
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
 * @function UpdateUser
 * @param {object} store 
 * @param {string} token
 * @param {string} newFirst: new first name
 * @param {string} newLast: new last name
 * @returns {object|string} user's new name to store
 */
 export async function UpdateUser(store, token, newFirst, newLast) {

  // start the update request
    store.dispatch(userUpdateSending())
  try {
    // use axios to make the query
    const response = await axios.put('http://localhost:3001/api/v1/user/profile', 
    {
      firstName: newFirst,
      lastName: newLast
    }, 
    {
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    })
    const user = await response.data.body
    console.log(user)
    // if request update resolved then save the user in the store
     store.dispatch(userUpdateSuccess(user))
  } catch (error) {
    // otherwise update request rejected
    store.dispatch(userUpdateFail())
  }
}

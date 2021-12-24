// import axios
import axios from 'axios'
//import the Immer produce function
import produce from "immer";

/**
 * Constants/Actions
 */
const FETCHING = 'user/fetching'
const RESOLVED = 'user/resolved'
const REJECTED = 'user/rejected'

const SENDING ='user/updateSending'
const SUCCESS = 'user/updateSuccess'
const FAIL = 'user/updateFail'

const RESET = 'user/reset'
/**
* Actions creators
*/
export const userFetching = () => ({ type: FETCHING })
export const userResolved = (token) => ({ type: RESOLVED, payload: token })
export const userRejected = (error) => ({ type: REJECTED, payload: error })

export const userUpdateSending = () => ({ type: SENDING })
export const userUpdateSuccess = (firstName, lastName) => ({ type: SUCCESS, payload: { firstName, lastName } })
export const userUpdateFail = (error) => ({ type: FAIL, payload: error })

export const userReset = () => ({ type: RESET })

/**
* Initial state
*/
 const initialUserState = {
   isLoading: false,
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
      case FETCHING: {
          draft.isLoading = true
          return
      }
       case RESOLVED: {
          draft.isLoading = false
          draft.user = action.payload
          draft.isError = ''
          return
      }
      case REJECTED: {
          draft.isLoading = false
          draft.user = {}
          draft.isError = action.payload
          return
      }
      //for user name updating
      case SENDING: {
        draft.isLoading = true
        return
      }
      case SUCCESS: {
        draft.isLoading = false
        draft.user = action.payload
        draft.isError = ''
        return
      }
      case FAIL: {
        draft.isLoading = false
        draft.user = {}
        draft.isError = action.payload
        return
      }
      // for user logout
      case RESET: {
        draft.isLoading = false
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
 * @returns {object|string} user information or error message
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
 * @function UpdateUser
 * @param {object} store 
 * @param {string} token
 * @param {string} newFirst: new first name
 * @param {string} newLast: new last name
 * @returns {object|string} user's new name or error message
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
    // if request update resolved then save the user in the store
     store.dispatch(userUpdateSuccess(user.firstName, user.lastName))
  } catch (error) {
    // otherwise update request rejected
    store.dispatch(userUpdateFail(error.response.data.message))
  }
}

// import axios
import axios from 'axios'
//import the Immer produce function
import produce from "immer"

/**
 * Constants/Actions
 */
const FETCHING = 'token/fetching'
const RESOLVED = 'token/resolved'
const REJECTED = 'token/rejected'
const RESET = 'token/reset'
 
/**
* Actions creators
*/
export const tokenFetching = () => ({ type: FETCHING })
export const tokenResolved = (token) => ({ type: RESOLVED, payload: token })
export const tokenRejected = (error) => ({ type: REJECTED, payload: error })
export const tokenReset = () => ({ type: RESET })
 
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
 * @function tokenReducer
 * @param {object} state
 * @param {string} action
 * @returns {object} new state
 */
export function tokenReducer(state = initialTokenState, action) {
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
          draft.isLoggedIn = true
          draft.token = action.payload
          draft.isError = ''
          return
      }
      case REJECTED: {
          draft.isLoading = false
          draft.isLoggedIn = false
          draft.token = null
          draft.isError = action.payload
          return
      }
      case RESET: {
        draft.isLoading = false
        draft.isLoggedIn = false
        draft.token = null
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
 * Checks if user exists in the database & if true returns a 'token'
 * @function fetchToken
 * @param {object} store 
 * @param {string} email 
 * @param {string} password 
 * @returns {string} token or error message
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

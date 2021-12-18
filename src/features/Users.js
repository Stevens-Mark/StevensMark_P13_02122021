// import { useDispatch } from 'react-redux';

// import axios
import axios from 'axios'
//import the Immer produce function
import produce from "immer";

/**
 * Constants
 */
const FETCHING = 'token/fetching'
const RESOLVED = 'token/resolved'
const REJECTED = 'token/rejected'
 
const LOGOUT = "logout"
 
/**
* Actions creators
*/
export const tokenFetching = () => ({ type: FETCHING })
export const tokenResolved = (token) => ({ type: RESOLVED, payload: token })
export const tokenRejected = (error) => ({ type: REJECTED, payload: error })

export const logout = () => ({ type: LOGOUT })
 
/**
* Initial state
*/
 const initialState = {
   isLoading: false,
   isLoggedIn: false,
   user: {},
   token: null,
   error: '',
 }

/**
 * @function userReducer
 * @param {object} initial state
 * @param {string} action
 * User reducer
 */
export function userReducer(state = initialState, action) {
  // on utilise immer pour changer le state
  return produce(state, (draft) => {
    // on fait un switch sur le type de l'action
    switch (action.type) {
      case FETCHING: {
          draft.isLoading = true
          return
      }
       case RESOLVED: {
          draft.isLoading = false
          draft.isLoggedIn = true
          draft.token = action.payload
          return
      }
      case REJECTED: {
          draft.isLoading = false
          draft.isLoggedIn = false
          draft.token = null
          draft.error = action.payload
          return
      }
      case LOGOUT: {
        draft.isLoading = false
        draft.isLoggedIn = false
        draft.user = {}
        draft.token = null
        draft.error = ''
        return 
    }
      // Otherwise (invalid action)
      default:
        // we do nothing (return the state without modifications)
        return state
    }
  })
}

/**
 * Checks if user exists in the database & if true returns a 'token'
 * @function fetchToken
 * @param {object} store 
 * @param {string} email 
 * @param {string} password 
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


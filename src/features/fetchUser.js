// import axios
import axios from 'axios'
//import the Immer produce function
import produce from "immer";

/**
 * Constants
 */
const FETCHING = 'user/fetching'
const RESOLVED = 'user/resolved'
const REJECTED = 'user/rejected'
 
// const LOGOUT = "user/logout"
 
/**
* Actions creators
*/
export const userFetching = () => ({ type: FETCHING })
export const userResolved = (token) => ({ type: RESOLVED, payload: token })
export const userRejected = (error) => ({ type: REJECTED, payload: error })

// export const logout = () => ({ type: LOGOUT })
 
/**
* Initial state
*/
 const initialStateUser = {
   isLoading: false,
   user: {},
   error: '',
 }

/**
 * @function userReducer
 * @param {object} initial state
 * @param {string} action
 * User reducer
 */
export function userReducer(state = initialStateUser, action) {
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
          draft.user = action.payload
          return
      }
      case REJECTED: {
          draft.isLoading = false
          draft.user = {}
          draft.error = action.payload
          return
      }
    //   case LOGOUT: {
    //     draft.isLoading = false
    //     draft.user = {}
    //     draft.error = ''
    //     return 
    // }
      // Otherwise (invalid action)
      default:
        // we do nothing (return the state without modifications)
        return state
    }
  })
}

/**
 * @function fetchUser
 * @param {object} store 
 * @param {string} token
 */
export async function fetchUser(store, token) {

  // start the request
    store.dispatch(userFetching())
  try {
    // use axios to make the query
    const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
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

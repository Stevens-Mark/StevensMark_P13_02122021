//import the Immer produce function
import produce from "immer";

/**
 * Actions
 */
 const LOGIN = "login"
 const LOGOUT = "logout"
 
 /**
  * Actions creators
  */
 export const login = () => ({ type: LOGIN })
 
 export const logout = () => ({ type: LOGOUT })
 
 /**
  * Initial state
  */
 const initialState = {
   isLoading: false,
   isLoggedIn: false,
   user: {},
   error: false,
 }

 /**
 * @function User Reducer
 * @param {object} initial state
 * @param {string} action
 * User reducer
 */
export function userReducer(state = initialState, action) {
  if (action.type === LOGIN ) {
    return produce(state, (draft) => {
      draft.isLoading = !draft.isLoading
      draft.isLoggedIn = !draft.isLoggedIn
    })
  }
  if (action.type === LOGOUT ) {
    return initialState
  }
  return state
}

  // if (action.type === LOGOUT ) {
  //   return produce(state, (draft) => {
  //     draft.isLoading = false,
  //     draft.isLoggedIn = false,
  //     draft.user = {},
  //     draft.error = false,
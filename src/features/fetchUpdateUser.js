import axios from 'axios'
// redux tool kit function
import { createSlice } from '@reduxjs/toolkit'

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

    store.dispatch(fetching())   // start the request
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/profile', 
    {}, 
    {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const user = await response.data.body
     store.dispatch(resolved(user))      // request resolved: save  user to store
  } catch (error) {  
    store.dispatch(rejected(error.response.data.message)) // request rejected: error mesage
  }
}

/**
 * API call
 * Using the retrieved 'token' for authentication 
 * the function updates the user name
 * @function updateUser
 * @param {object} store 
 * @param {string} token
 * @param {string} new first name
 * @param {string} new last name
 * @returns {object} user's new name to store or nothing
 */
 export async function updateUser(store, token, firstName, lastName) {

    store.dispatch(updateSending())  // start the update request
  try {
    const response = await axios.put('http://localhost:3001/api/v1/user/profile', 
    {
      firstName, lastName
    }, 
    {
      headers: { 'Authorization': `Bearer ${token}`}
    })
    const user = await response.data.body
     store.dispatch(updateSuccess(user))     // request resolved: save new name to store
  } catch (error) {
    store.dispatch(updateFail())      // otherwise update request rejected
  }
}

/**
 * Unify actions and reducers with Redux-Toolkit slices
 * instead of createAction & createReducer
 * create actions & reducer logic regarding user retrieval/updating
 * @function userSlice
 * @param {object} state
 * @param {string} action
 * @returns {object} new state
 */
 const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    isUpdated: false,
    user: {},
    isError: '',
  },
  reducers: {     // reducers allows to define the actions and the reducer
    fetching: (draft) => {
        draft.isLoading = true
    },
    resolved: (draft, action) => {
        draft.isLoading = false
        draft.user = action.payload
        draft.isError = ''
    },
    rejected:  (draft, action) => {
        draft.isLoading = false
        draft.user = {}
        draft.isError = action.payload
    },
    updateSending: (draft) => {      // for user name updating
        draft.isLoading = true
    },
    updateSuccess: (draft, action) => {
        draft.isLoading = false
        draft.isUpdated = true
        draft.user = action.payload
        draft.isError = ''
    },
    updateFail: (draft) => {
        draft.isLoading = false
        draft.isUpdated = false
    },
     resetUser: (draft) => {     // for user logout
        draft.isLoading = false
        draft.isUpdated = false
        draft.user = {}
        draft.isError = ''
    },
  },
})

export const { fetching, resolved, rejected, updateSending, updateSuccess, updateFail, resetUser } = userSlice.actions
export default userSlice.reducer  // export each action & reducer
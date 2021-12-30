// import axios
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
  // start the request
    store.dispatch(fetching())
  try {
    // use axios to make the query
    const response = await axios.post('http://localhost:3001/api/v1/user/profile', 
    {}, 
    {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    const user = await response.data.body
    // if request resolved then save the user in the store
     store.dispatch(resolved(user))
  } catch (error) {
    // otherwise request rejected with corresponding error mesage
    store.dispatch(rejected(error.response.data.message))
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
  // start the update request
    store.dispatch(updateSending())
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
     store.dispatch(updateSuccess(user))
  } catch (error) {
    // otherwise update request rejected
    store.dispatch(updateFail())
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
  // reducers allows to define the actions and the reducer
  reducers: {
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
    // for user name updating
    updateSending: (draft) => {
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
        // draft.isError = action.payload
    },
    // for user logout
    resetUser: (draft) => {
        draft.isLoading = false
        draft.isUpdated = false
        draft.user = {}
        draft.isError = ''
    },
  },
})

// export each action & reducer
export const { fetching, resolved, rejected, updateSending, updateSuccess, updateFail, resetUser } = userSlice.actions
export default userSlice.reducer
// import axios
import axios from 'axios'
// redux tool kit function
import { createSlice } from '@reduxjs/toolkit'

/**
* Initial state
*/
const initialState = {
  isLoading: false,
  isUpdated: false,
  user: {},
  isError: '',
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
      headers: { 'Authorization': `Bearer1 ${token}`}
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
  initialState,
  reducers: {
    fetching: {
      reducer: (draft, action) => {
        draft.isLoading = true
        return
      },
    },
    resolved: {
      // prepare allows to modify the payload
      prepare: (user) => ({
        payload: user,
      }),
      // the reducer function
      reducer: (draft, action) => {
        draft.isLoading = false
        draft.user = action.payload
        draft.isError = ''
        return
      },
    },
    rejected: {
      prepare: (error) => ({
        payload: error,
      }),
      reducer: (draft, action) => {
        draft.isLoading = false
        draft.user = {}
        draft.isError = action.payload
        return
      },
    },
    // for user name updating
    updateSending: {
      reducer: (draft, action) => {
        draft.isLoading = true
        return
      },
    },
    updateSuccess: {
      prepare: (user) => ({
        payload: user,
      }),
      reducer: (draft, action) => {
        draft.isLoading = false
        draft.isUpdated = true
        draft.user = action.payload
        draft.isError = ''
        return
      },
    },
    updateFail: {
      prepare: (error) => ({
        payload: error,
      }),
      reducer: (draft, action) => {
        draft.isLoading = false
        draft.isUpdated = false
        // draft.isError = action.payload
        return
      },
    },
    // for user logout
    resetUser: {
      reducer: (draft, action) => {
        draft.isLoading = false
        draft.isUpdated = false
        draft.user = {}
        draft.isError = ''
        return 
      },
    },
  },
})

// export each action individually
export const { fetching, resolved, rejected, updateSending, updateSuccess, updateFail, resetUser } = userSlice.actions
// export the reducer as default export
export default userSlice.reducer
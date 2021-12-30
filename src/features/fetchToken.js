// import axios
import axios from 'axios'
// redux tool kit function
import { createSlice } from '@reduxjs/toolkit'

/**
 * API call
 * Checks if user exists in the database & if true returns a 'token'
 * @function fetchToken
 * @param {object} store 
 * @param {string} email 
 * @param {string} password 
 * @returns {string} token or error message to store
 */
export async function fetchToken(store, email, password) {
  // start the request
    store.dispatch(fetching())
  try {
    // use axios to make the query
    const response = await axios.post('http://localhost:3001/api/v1/user/login', 
    {
      email, password
    })
    const token = await response.data.body.token
    // if request resolved then save the token in the store
     store.dispatch(resolved(token))
   } catch (error) {
    // otherwise request rejected: with relevant error message
    store.dispatch(rejected(error.response.data.message))
  }
}

/**
 * Unify actions and reducers with Redux-Toolkit slices
 * instead of createAction & createReducer
 * create actions & reducer logic regarding token retrieval
 * @function tokenSlice
 * @param {object} state
 * @param {string} action
 * @returns {object} new state
 */
const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    isLoading: false,
    isLoggedIn: false,
    token: null,
    isError: '',
  },
  // reducers allows to define the actions and the reducer
  reducers: {
    fetching: (draft) => {
        draft.isLoading = true
    },
    resolved: (draft, action) => {
        draft.isLoading = false
        draft.isLoggedIn = true
        draft.token = action.payload
        draft.isError = ''
    },
    rejected: (draft, action) => {
        draft.isLoading = false
        draft.isLoggedIn = false
        draft.token = null
        draft.isError = action.payload
    },
    resetToken: (draft) => {
        draft.isLoading = false
        draft.isLoggedIn = false
        draft.token = null
        draft.isError = ''
    },
  },
})

// export each action & reducer
export const { fetching, resolved, rejected, resetToken } = tokenSlice.actions
export default tokenSlice.reducer

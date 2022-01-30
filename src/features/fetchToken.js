import axios from 'axios'
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
     store.dispatch(fetching())      // start the request
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', 
    {
      email, password
    })
    const token = await response.data.body.token    // if resolved save the token to store
     store.dispatch(resolved(token))
   } catch (error) {                                // request rejected: error message
      if (!error.response) {                    
        store.dispatch(rejected('There is a Network Error !'))
    } else {
        store.dispatch(rejected(error.response.data.message))
    }
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
  reducers: {               // reducers allows to define the actions and the reducer
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

export const { fetching, resolved, rejected, resetToken } = tokenSlice.actions
export default tokenSlice.reducer     // export each action & reducer

// // redux tool kit function
// import { createSlice } from '@reduxjs/toolkit'
// /**
// * Initial state
// */
// const initialState = {
//   darkMode: false,
// }

// /**
//  * Unify actions and reducers with Redux-Toolkit slices
//  * instead of createAction & createReducer
//  * create actions & reducer logic regarding darkMode
//  * @function darkModeSlice
//  * @param {object} state
//  * @param {string} action
//  * @returns {object} new state
//  */
//  const darkModeSlice = createSlice({
//   name: 'darkMode',
//   initialState,
//   reducers: {
//     toggleDarkMode: {
//       reducer: (draft, action) => {
//         draft.darkMode = false
//         return
//       },
//     },
//   },
// })

// // export each action individually
// export const { toggleDarkMode } = darkModeSlice.actions
// // export the reducer as default export
// export default darkModeSlice.reducer


// On utilise des variables pour les noms des actions
// pour éviter les fautes de frappe
const TOGGLE_THEME = 'theme/toggle'
const SET_THEME = 'theme/set'

// action creators

export const toggleTheme = () => ({ type: TOGGLE_THEME })

export const setTheme = (theme = 'light') => ({
  type: SET_THEME,
  payload: theme,
})

// Le reducer
// on utilise une valeur par défaut pour donner le state initial
export default function darkModeReducer(state = 'light', action) {
  if (action.type === TOGGLE_THEME) {
    return state === 'light' ? 'dark' : 'light'
  }
  if (action.type === SET_THEME) {
    return action.payload
  }
  return state
}

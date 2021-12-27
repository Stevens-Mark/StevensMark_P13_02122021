import { createStore, combineReducers } from 'redux'
import { tokenReducer } from '../../features/fetchToken'
import { userReducer } from '../../features/fetchUpdateUser'
/**
* put all reducers together
*/
 const rootReducer = combineReducers({
  token: tokenReducer,
  userStats: userReducer,
})

// create the store & connect devtools
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // This is the chrome Redux plugin
export const store = createStore(rootReducer, reduxDevtools)




// import { configureStore } from '@reduxjs/toolkit'
 
// export default configureStore({
//     reducer: {
//       token: tokenReducer,
//       userStats: userReducer,
//     },
// })
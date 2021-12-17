import { createStore, combineReducers } from 'redux'
import { userReducer } from '../../features/Users'

/**
* put all reducers together
*/
 const rootReducer = combineReducers({
  userReducer,
})


// create the store & connect devtools
const reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // This is the chrome Redux plugin
export const store = createStore(rootReducer, reduxDevtools)





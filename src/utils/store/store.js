import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from '../../features/fetchToken'
import userReducer from '../../features/fetchUpdateUser'
import themeReducer from '../../features/theme'

// create the store & put all reducers together
export default configureStore({
    reducer: {
      token: tokenReducer,
      userStats: userReducer,
      theme: themeReducer,
    },
})
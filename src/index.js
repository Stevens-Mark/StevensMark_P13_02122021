import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
import GlobalStyle from './utils/style/GlobalStyle'
import App from './App'
import reportWebVitals from './reportWebVitals'
// import store
import store from '../src/utils/store/store'

ReactDOM.render(
      // The Provider must encompass the entire application!
    <Provider store={store}>
        <React.StrictMode>
              <GlobalStyle />
              <App />
        </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

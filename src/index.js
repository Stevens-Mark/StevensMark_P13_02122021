import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from "react-redux"
// import { createGlobalStyle } from "styled-components"
import { ThemeProvider } from '../src/utils/functions/context'
import GlobalStyle from './utils/style/GlobalStyle'
// import { ThemeContext } from '../src/utils/functions/context'
// import colors from './utils/style/colors'
import App from './App'
import reportWebVitals from './reportWebVitals'
// import store
import store from '../src/utils/store/store'

ReactDOM.render(
      // Le Provider doit englober toute l'application !
    <Provider store={store}>
        <React.StrictMode>
          <ThemeProvider>
              <GlobalStyle />
              <App />
          </ThemeProvider>
        </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

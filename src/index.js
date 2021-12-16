import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from "styled-components";
import colors from './utils/style/colors';
import App from './App';
import reportWebVitals from './reportWebVitals';

/**
 * CSS Global styles for the site using styled.components
 */
 const GlobalStyle = createGlobalStyle`
 html {
   box-sizing: border-box;
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: #2c3e50;
 }

 body {  
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  // color: ${colors.secondary};
  
 } 

 .main {
    flex: 1;
}
 
 .sr-only {
   border: 0 !important;
   clip: rect(1px, 1px, 1px, 1px) !important; /* 1 */
   -webkit-clip-path: inset(50%) !important;
   clip-path: inset(50%) !important; /* 2 */
   height: 1px !important;
   margin: -1px !important;
   overflow: hidden !important;
   padding: 0 !important;
   position: absolute !important;
   width: 1px !important;
   white-space: nowrap !important; /* 3 */
 }


`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

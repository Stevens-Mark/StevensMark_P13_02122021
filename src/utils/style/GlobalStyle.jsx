import { createGlobalStyle } from 'styled-components'
import { useTheme } from '../functions/theme'
import colors from './colors'

/**
 * CSS Global styles for the site using styled.components
 */
 const StyledGlobalStyle = createGlobalStyle`
 html {
   box-sizing: border-box;
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   color: ${colors.aLink};
 }

 body {  
  background-color: ${({ isDarkMode }) => (isDarkMode ? `${colors.darkModeHighlights}` : `${colors.tertiary}`)};
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  color: ${({ isDarkMode }) => (isDarkMode ? `${colors.tertiary}` : `${colors.secondary}`)};
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

/**
 * @function GlogalStyle
 * @returns global theme css styling (either for day or night depending on state)
 */
function GlobalStyle() {
  const { theme } = useTheme()
  return <StyledGlobalStyle isDarkMode={theme === 'dark'} />
}

export default GlobalStyle
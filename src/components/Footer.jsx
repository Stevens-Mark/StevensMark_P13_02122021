import { useDispatch, useSelector } from 'react-redux'
// styling
import styled from 'styled-components'
import colors from '../utils/style/colors'
// import action
import { toggle } from '../features/theme'
// import selector
import { selectTheme } from '../utils/selectors'

/**
 * CSS for the component using styled.components
 */
 const FOOTER = styled.footer`
  border-top: 2px solid #ccc;
  padding: 2rem 0 1.5rem;
`;

const FooterText = styled.p`
  margin: 0;
  padding: 0;
`;

const NightModeButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => (theme === 'light' ? `${colors.itemTitle}` : `${colors.tertiary}`)};  
`;

/**
 * Renders the footer on each page
 * Also contains button to toggle light/dark mode
 * @function Footer
 * @returns {JSX}
 */
 const Footer = () => {

  const theme = useSelector(selectTheme) // retrieve Redux state
  const dispatch = useDispatch()

  return (
    <FOOTER>
      <FooterText>Copyright 2020 Argent Bank</FooterText>
      <NightModeButton theme={theme} onClick={() => dispatch(toggle())}>
            Change mode : {theme === 'light' ? '☀️' : '🌙'}
        </NightModeButton>
    </FOOTER>
  )
}

export default Footer
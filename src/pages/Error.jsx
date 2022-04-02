import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import colors from '../utils/style/colors'
// import selectors
import { selectTheme } from '../utils/selectors'

/**
 * CSS for the component using styled.components
 */
const ErrorWrapper = styled.main`
  align-items: center;
  background-color: ${({ theme }) => (theme === 'light' ? `${colors.tertiary}` : `${colors.mainBackgroundDarkMode}`)};
  color: ${colors.primary};
  display: flex;
  flex-direction: column;
  min-height: 85vh;
  
  h1 {
    font-size: clamp(6rem, 10vw, 15rem);
    font-weight: 700;
    margin: 6rem 0rem;
  }

  p {
    font-size: clamp(1.125rem, 2vw, 2rem);
    font-weight: 500;
    margin-bottom: 5rem;
    text-align: center;
  }
`;

const ReturnLink = styled(Link)`
  color: ${colors.primary};
  font-size: clamp(0.875rem, 1.5vw, 1.375rem);
  font-weight: 500;
  margin-bottom: 2rem;
`;

/**
 * Component to render Error 404 page
 * @function Error
 * @returns {JSX}
 */
const Error = () => {
  
  // retrieve Redux state
  const theme = useSelector(selectTheme)

  return (
    <ErrorWrapper theme={theme}>
      <h1>404</h1>
      <p>Oops! The page you requested does not exist</p>
      <ReturnLink to="/">Return to the home page</ReturnLink>
    </ErrorWrapper>
  )
}

export default Error


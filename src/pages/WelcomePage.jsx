import styled from 'styled-components'
import Hero from '../components/Hero'
import Feature from '../components/Feature'

/**
 * CSS for the component using styled.components
 */
 const MAIN = styled.main`
  min-height: 85vh;
`;

/**
 * Renders the 'Welcome Page' 
 * @function WelcomePage
 * @returns {JSX}
 */
const WelcomePage = () => {
  return (
      <MAIN>
        <Hero />
        <Feature />
      </MAIN>
  )
}

export default WelcomePage


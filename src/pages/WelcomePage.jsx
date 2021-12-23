import { useEffect } from 'react'
import styled from 'styled-components'
// import components
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
  
  useEffect(() => {
    document.title = 'Argent Bank'
  }, [])

  return (
      <MAIN>
        <Hero />
        <Feature />
      </MAIN>
  )
}

export default WelcomePage


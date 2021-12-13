import styled from 'styled-components'
import heroImg from '../assets/images/bank-tree.jpeg'

/**
 * CSS for the component using styled.components
 */
const HeroContainer = styled.div`
  background-image: url(${heroImg});
  background-position: 0 -50px;
  background-size: cover;
  background-repeat: no-repeat;
  height: 18.75rem;
  position: relative;
  
  @media (min-width: 920px) {
      height: 25rem;
      background-position: 0% 33%;
    }
`;

const HeroContent = styled.section`
  position: relative;
  top: 2rem;
  width: 12.5rem;
  background: white;
  padding: 2rem;
  text-align: left;
  margin: 0 auto;

  @media (min-width: 920px) {
    position: absolute;
    top: 3.125rem;
    right: 3.125rem;
    width: 18.75rem
    margin: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-weight: bold;
  font-size: 1rem;
  margin: 0;

  @media (min-width: 920px) {
    font-size: 1.5rem;
  }
`;

const HeroText = styled.p`
  margin-bottom: 0;
  font-size: 0.9rem;

  @media (min-width: 920px) {
    font-size: 1.2rem;
  }
`;

/**
 * Renders Hero Banner on Homepage
 * @function Hero
 * @returns {JSX}
 */
const Hero = () => {
  return (
    <HeroContainer>
        <HeroContent>
          <h2 className="sr-only">Promoted Content</h2>
          <HeroSubtitle>No fees.</HeroSubtitle>
          <HeroSubtitle>No minimum deposit.</HeroSubtitle>
          <HeroSubtitle>High interest rates.</HeroSubtitle>
          <HeroText>Open a savings account with Argent Bank today!</HeroText>
        </HeroContent>
    </HeroContainer>
    )
}

export default Hero



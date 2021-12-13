import styled from 'styled-components'
/**
 * CSS for the component using styled.components
 */
 const FOOTER = styled.footer`
  display: flex;
  justify-content: center;
  border-top: 2px solid #ccc;
  padding: 2rem 0 1.5rem;
`;

const FooterText = styled.p`
  margin: 0;
  padding: 0;
`;

/**
 * Renders the footer on each page
 * @function Footer
 * @returns {JSX}
 */
 const Footer = () => {
  return (
    <FOOTER>
      <FooterText>Copyright 2020 Argent Bank</FooterText>
    </FOOTER>
  )
}

export default Footer

import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../utils/style/colors'
// logo imports
import logo from '../assets/images/argentBankLogo.png'

/**
 * CSS for the component using styled.components
 */
const MainNavLogo = styled.img`
  display: flex;
  align-items: center;
  max-width: 100%;
  width: 200px;
  // width: clamp(7rem, 12vw, 10rem);
`;

const MainNav = styled.nav`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 20px; 
      i {
        margin-right: 5px;
      }
`;

const MainNavA = styled(NavLink)`
  color:  ${colors.aLink};
  // font-size: clamp(1rem, 1.667vw, 1.5rem);
  font-weight: bold;
  text-decoration: none;
  margin-right: 0.5rem;
    &.${(props) => props.activeClassName} {
      color: ${colors.activeA};
        }
    &:hover {
      color: ${colors.activeA};
      text-decoration: underline;
`;

/**
 * Renders the Header
 * @function Header
 * @returns (JSX)
 */
const Header = () => {
  return (
          <MainNav>
            <MainNavA to="/"><MainNavLogo className="logo" src={logo} alt="Argent Bank"></MainNavLogo>
                <h1 class="sr-only">Argent Bank</h1></MainNavA>
            <MainNavA activeClassName="active" to="/SignIn"><i class="fa fa-user-circle"></i>Sign In</MainNavA>
          </MainNav>
    )
}

export default Header

import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
// styling
import styled from 'styled-components'
import colors from '../utils/style/colors'
// logo import
import logo from '../assets/images/argentBankLogo.png'
// import actions
import { resetUser } from '../features/fetchUpdateUser'
import { resetToken } from '../features/fetchToken'
// import helper function
import { capitalize } from '../utils/functions/capitalize'
// import selectors
import { selectTheme, selectToken, selectUser } from '../utils/selectors'

/**
 * CSS for the component using styled.components
 */
const MainNavLogo = styled.img`
  display: flex;
  align-items: center;
  max-width: 100%;
  width: clamp(10rem, 13vw, 12.5rem);
  border: ${({ theme }) => (theme === 'light' ? `1px solid ${colors.tertiary}` : `1px solid ${colors.primary}`)};
`;

const MainNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.313rem 0.5rem; 
  font-size: clamp(0.9rem, 1.4vw, 1.2rem);
  i {
    margin-right: 0.313rem;
    font-size: clamp(1rem, 1.4vw, 1.2rem);
  }
`;

const MainNavA = styled(NavLink)`
  color: ${({ theme }) => (theme === 'light' ? `${colors.aLink}` : `${colors.tertiary}`)};
  font-weight: bold;
  text-decoration: none;
  margin-right: 0.5rem;

  &.${(props) => props.activeClassName} {
    color: ${colors.activeA};
  }
  &:hover {
    color: ${colors.activeA};
    text-decoration: underline;
  }
`;

const UserName = styled.span`
  display: block;
  @media (min-width: 425px) {
    display: inline-block;
  }
`;

/**
 * Renders the Header
 * @function Header
 * @returns (JSX)
 */
const Header = () => {

  // retrieve Redux states
  const theme = useSelector(selectTheme)
  const isLoggedIn = useSelector(selectToken).isLoggedIn
  const firstName = useSelector(selectUser).user.firstName

  // ensure first letter of name capitalised
  const capitalizedFirst = capitalize(firstName)
  const dispatch = useDispatch()
  
  return (
    <MainNav>
      <MainNavA to="/"><MainNavLogo theme={theme} className="logo" src={logo} alt="Argent Bank"></MainNavLogo>
          <h1 className="sr-only">Argent Bank</h1></MainNavA>
      {!isLoggedIn ? 
        ( 
        <MainNavA theme={theme} activeClassName="active" to="/signin"><i className="fa fa-user-circle"></i>Sign In</MainNavA> 
        ) : 
        ( <div>
            <UserName>
              <MainNavA theme={theme} to="/user"><i className="fa fa-user-circle"></i>{capitalizedFirst}</MainNavA>
            </UserName>
            <MainNavA theme={theme} to="/" 
            onClick={() => { dispatch(resetUser()); dispatch(resetToken());}}>
              <i className="fa fa-sign-out"></i>Sign Out</MainNavA> 
          </div>
        )}
    </MainNav>
  )
}

export default Header

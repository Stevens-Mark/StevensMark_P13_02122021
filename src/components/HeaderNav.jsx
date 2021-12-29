import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import colors from '../utils/style/colors'
// logo import
import logo from '../assets/images/argentBankLogo.png'
// import action creators 
import { resetUser } from '../features/fetchUpdateUser'
import { resetToken } from '../features/fetchToken'
/**
 * CSS for the component using styled.components
 */
const MainNavLogo = styled.img`
  display: flex;
  align-items: center;
  max-width: 100%;
  width: clamp(11rem, 13vw, 12.5rem);
`;

const MainNav = styled.nav`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.313rem 1.25rem; 
      font-size: clamp(1rem, 1.4vw, 1.2rem);
      i {
        margin-right: 0.313rem;
        font-size: clamp(1rem, 1.4vw, 1.2rem);
      }
`;

const MainNavA = styled(NavLink)`
  color:  ${colors.aLink};
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
  const isLoggedIn = useSelector((state) => state.token.isLoggedIn)
  const firstName = useSelector((state) => state.userStats.user.firstName)
  const dispatch = useDispatch()
  
  return (
    <MainNav>
      <MainNavA to="/"><MainNavLogo className="logo" src={logo} alt="Argent Bank"></MainNavLogo>
          <h1 className="sr-only">Argent Bank</h1></MainNavA>
      {!isLoggedIn ? 
        ( 
        <MainNavA activeClassName="active" to="/signin"><i className="fa fa-user-circle"></i>Sign In</MainNavA> 
        ) : 
        ( <div>
            <MainNavA to="/user"><i className="fa fa-user-circle"></i>{firstName}</MainNavA> 
            <MainNavA to="/" 
            onClick={() => { dispatch(resetUser()); dispatch(resetToken());}}>
              <i className="fa fa-sign-out"></i>Sign Out</MainNavA> 
          </div>
        )}
    </MainNav>
  )
}

export default Header

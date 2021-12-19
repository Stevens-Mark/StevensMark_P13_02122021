
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useStore } from 'react-redux'
import styled from 'styled-components'
import colors from '../utils/style/colors'
// logo imports
import logo from '../assets/images/argentBankLogo.png'
//import action creator
import { logout } from '../features/Users'


/**
 * CSS for the component using styled.components
 */
const MainNavLogo = styled.img`
  display: flex;
  align-items: center;
  max-width: 100%;
  width: 12.5rem;
  // cursor: pointer;
  // width: clamp(7rem, 12vw, 10rem);
`;

const MainNav = styled.nav`
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.313rem 1.25rem; 
      i {
        margin-right: 0.313rem;
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
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn)
  // const dispatch = useDispatch
 const store = useStore
  return (
          <MainNav>
            <MainNavA to="/"><MainNavLogo className="logo" src={logo} alt="Argent Bank"></MainNavLogo>
                <h1 className="sr-only">Argent Bank</h1></MainNavA>
            {!isLoggedIn ? 
              ( 
              <MainNavA activeClassName="active" to="/SignIn"><i className="fa fa-user-circle"></i>Sign In</MainNavA> 
              ) : 
              ( <div>
                <MainNavA to="/User"><i className="fa fa-user-circle"></i>Tony</MainNavA> 
                <MainNavA to="/" onClick={() => store.dispatch(logout())}><i class="fa fa-sign-out"></i>Sign Out</MainNavA> 
                </div>
              )}
          </MainNav>
    )
}

export default Header

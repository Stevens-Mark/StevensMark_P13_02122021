import { Link } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../utils/style/colors'


/**
 * CSS for the component using styled.components
 */
const MAIN = styled.main`
  background-color: #12002b;
  min-height: 85vh;
`;

const SignInContent = styled.section`
  box-sizing: border-box;
  background-color: white;
  width: 300px;
  margin: 0 auto;
  padding: 2rem;
  position: relative;
  top: 3rem;

  i {
    font-size: 1rem;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 1rem;
  label {
    font-weight: bold;
  }
  input {
    padding: 5px;
    font-size: 1.2rem;
  }
`;

const InputRemember = styled.div`
  display: flex;

  label {
    margin-left: 0.25rem;
  }
  
`;

const SignInButton = styled(Link)`
  display: block;
  // width: 100%;
  padding: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  border-color: ${colors.primary};
  background-color: ${colors.primary};
  color: ${colors.tertiary};
`;

/**
 * Renders the 'Welcome Page' 
 * @function WelcomePage
 * @returns {JSX}
 */
const SignIn = () => {
  return (
      <MAIN>
        <SignInContent>
          <i class="fa fa-user-circle"></i>
          <h1>Sign In</h1>
          <form>
            <InputWrapper>
                <label for="username">Username</label>
                    <input type="text" id="username" />
              </InputWrapper>
              <InputWrapper>
                <label for="password">Password</label>
                    <input type="password" id="password" />
              </InputWrapper>
              <InputRemember>
                <input type="checkbox" id="remember-me" /><label for="remember-me">Remember me</label>
              </InputRemember>

            <SignInButton to="/">Sign In</SignInButton>
          </form>  
        </SignInContent>
      </MAIN>
  )
}

export default SignIn

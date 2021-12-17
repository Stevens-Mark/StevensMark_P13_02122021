// import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import styled from 'styled-components'
import colors from '../utils/style/colors'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../features/Users'

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

const ErrorMsg = styled.p`
  margin-top: 5px;
  padding: 5px;
  color: red;
`;

const SignInButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  cursor: pointer;
  border-color: ${colors.primary};
  background-color: ${colors.primary};
  color: ${colors.tertiary};
`;

/**
 * Renders the 'Sign In page & form' 
 * @function SignIn
 * @returns {JSX}
 */
const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [invalidInput, setInvalidInput] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const dispatch = useDispatch();

   useEffect(() => {
    document.title = 'Argent Bank | Sign In'
    // if user chose to be remembered then retrieve username from local storage
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const user = rememberMe ? localStorage.getItem('user') : '';
    setEmail(user)
    setRememberMe(rememberMe)
  }, [])


  const handleSubmit = (event) => {
    event.preventDefault()
    //if user chooses to be remembered then save to local storage
    const user = email
    const remembered = rememberMe
    localStorage.setItem('rememberMe', remembered)
    localStorage.setItem('user', rememberMe ? user : '')

    setInvalidInput('')
    if (email === '' || password === '') {
      return setInvalidInput('Please enter both your username and password')
    }
    else {
      dispatch(login())
    }
  }

  return (
      <MAIN>
        <SignInContent>
          <i className="fa fa-user-circle"></i>
          <h1>Sign In</h1>
          
          <form onSubmit={handleSubmit}>

            <InputWrapper>
                <label htmlFor="email">Username</label>
                    <input type="text" id="email" 
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {setEmail(e.target.value)}} />
              </InputWrapper>

              <InputWrapper>
                <label htmlFor="password">Password</label>
                    <input type="password" id="password" 
                      autoComplete="off"
                      onChange={(e) => {setPassword(e.target.value)}} />
              </InputWrapper>

              <InputRemember>
                  <input type="checkbox" id="remember-me" checked={rememberMe} 
                      onChange={() => setRememberMe(!rememberMe)} />
                      <label htmlFor="remember-me">Remember me</label>
              </InputRemember>

              <ErrorMsg>{invalidInput}</ErrorMsg>

            <SignInButton type="submit">Sign In</SignInButton>

          </form>  
          
        </SignInContent>
      </MAIN>
  )
}

export default SignIn

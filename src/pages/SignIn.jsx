import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useStore } from 'react-redux'
import styled from 'styled-components'
import colors from '../utils/style/colors'
import LoadingIcon from '../utils/loader/loadingIcon'
import { fetchToken } from '../features/fetchToken'

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
  const [rememberMe, setRememberMe] = useState(true)

  const store = useStore()
  const navigate = useNavigate()

  const isLoading = useSelector((state) => state.tokenReducer.isLoading)
  const isError = useSelector((state) => state.tokenReducer.error)
  const isLoggedIn = useSelector((state) => state.tokenReducer.isLoggedIn)
  
    useEffect(() => {
    document.title = 'Argent Bank | Sign In'
    // if user chose to be remembered then retrieve username from local storage
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    const user = rememberMe ? localStorage.getItem('user') : '';
    setEmail(user)
    setRememberMe(rememberMe)
  }, [])

    useEffect(() => {
    // Redirect to User transaction page when authenticated/LoggedIn
      if (isLoggedIn) navigate('/User')
  }, [isLoggedIn, navigate])

  const handleSubmit = (event) => {
    event.preventDefault()
    //if user chooses to be remembered then save to local storage
    localStorage.setItem('rememberMe', rememberMe)
    localStorage.setItem('user', rememberMe ? email : '')

    fetchToken(store, email, password)
  }

  return (
      <MAIN>
        <SignInContent>
          <i className="fa fa-user-circle"></i>
          <h1>Sign In</h1>
          {password}
          <form onSubmit={handleSubmit}>

            <InputWrapper>
                <label htmlFor="email">Username</label>
                    <input type="text" id="email" 
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {setEmail(e.target.value)}} 
                      disabled={isLoading ? true : false}/>
                      
              </InputWrapper>

              <InputWrapper>
                <label htmlFor="password">Password</label>
                    <input type="password" id="password" 
                      autoComplete="off"
                      onChange={(e) => {setPassword(e.target.value)}}
                      disabled={isLoading ? true : false} />
              </InputWrapper>

              <InputRemember>
                  <input type="checkbox" id="remember-me" checked={rememberMe} 
                      onChange={() => setRememberMe(!rememberMe)} />
                      <label htmlFor="remember-me">Remember me</label>
              </InputRemember>

              <ErrorMsg>{isError}</ErrorMsg>
              {isLoading && <LoadingIcon />}

            <SignInButton type="submit" 
                disabled={isLoading ? true : false}>Sign In</SignInButton>

          </form>  
          
        </SignInContent>
      </MAIN>
  )
}

export default SignIn

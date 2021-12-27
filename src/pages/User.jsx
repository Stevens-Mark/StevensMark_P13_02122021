import React, { useEffect, useState } from 'react'
import { useSelector, useStore } from 'react-redux'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../utils/style/colors'
// import components
import LoadingIcon from '../utils/loader/LoadingIcon'
import Transactions from '../components/Transactions'
// import functions for API calls
import { fetchUser } from '../features/fetchUpdateUser'
import { UpdateUser } from '../features/fetchUpdateUser'
// import helper functions
import { capitalize } from '../utils/functions/capitalize'
import { Notify } from '../utils/functions/Notify'

/**
 * CSS for component using styled.components
 */
 const MAIN = styled.main`
 background-color: #12002b;
 min-height: 100vh;
 display: flex;
 flex-direction: column;

 @media (min-width: 720px) {
  min-height: 85vh;
}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
`;

const UserInfo = styled.section`
  color: ${colors.tertiary};
  width: 100%;
  margin-bottom: 1.5rem;
  h1 {
    font-size: 2rem;
  }
`;

const EditButton = styled.button`
  padding: 0.625rem;
  border-radius: 0.2rem;
  border: none;
  background-color: ${colors.primary};
  color: ${colors.tertiary};
  font-weight: bold;
  padding: 0.625rem;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    opacity: 0.85;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .8);
    transition: 0.4s;
  }
`;

/**
 * CSS for edit name form
 */
const EditContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin: 0 auto;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin: 0.625rem;
  margin-bottom: 1rem;

   @media screen and (min-width: 600px) {
    flex-direction: row;
    width: unset;
    }
  }

  input {
    padding: 0.5rem;
    font-size: 1.2rem;
    // margin: 0rem 0.5rem;
    border-radius: 0.2rem;
    border: 1px solid black;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  margin: 0.625rem;
  margin-bottom: 1rem;

   @media screen and (min-width: 425px) {
    flex-direction: row;
    width: unset;
    }
  }
`;

const EditButtons = styled.button`
  padding: 0.625rem;
  font-weight: bold;
  min-width: 100px;
  cursor: pointer;
  border-radius: 0.2rem;
  border: none;
  background-color: ${colors.primary};
  color: ${colors.tertiary};
  transition: 0.4s;
  &:hover {
    opacity: 0.85;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .8);
    transition: 0.4s;
  }

  @media screen and (min-width: 600px) {
    width: 100px;
    }
`;

const ErrorMsg = styled.h1`
  margin-top: 0.313rem;
  padding: 0.313rem;
  color: ${colors.tertiary};
`;

/**
 * Renders user page with possibility to edit user profile
 * @function User
 * @returns {JSX}
 */
const User = () => {
  // retrieve Redux state
  const { isLoggedIn, token } = useSelector((state) => state.token)
  const { isLoading, isUpdated, isError } = useSelector((state) => state.userStats)
  const { firstName, lastName  } = useSelector((state) => state.userStats.user)

  // local state
  const [newFirst, setNewFirst] = useState('')
  const [newLast, setnewLast] = useState('')
  const [canEdit, setCanEdit] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [inputOk, setInputOk] = useState(false)

 // ensure first letters of name capitalised
  const capitalizedFirst = capitalize(firstName)
  const capitalizedLast = capitalize(lastName)

  const store = useStore()
  
  useEffect(() => {
    document.title = 'Argent Bank | Welcome'
    // load/fetch user data
    fetchUser(store, token)
  }, [store, token])

  // submit form (if both name fields completed otherwise indicate error)
  const handleSubmit = (event) => {
    event.preventDefault()
    setInputOk(false)
    setSubmitted(true)
    if (newFirst && newLast) {
      if (newFirst.trim() !=='' && newLast.trim() !=='') {
        UpdateUser(store, token, newFirst, newLast)
        setInputOk(true)
        setCanEdit(false)
        }   
    }
  }

  // reset variables if edit cancelled
  const resetEdit = () => {
    setNewFirst('')
    setnewLast('')
    setSubmitted(false)
    setCanEdit(false)
  }
  
  // if user not authenticated redirect to home page
  if (!isLoggedIn) return <Navigate to="/" /> 

  return (
    <MAIN>
      {/* Show load spinner whilst waiting for data */}
      {isLoading ? <Wrapper>
                      <LoadingIcon />
                    </Wrapper> : 
        <React.Fragment>
          {/* Display error message if there is a problem fecthing the user data*/}
          {isError ? <Wrapper>
                        <ErrorMsg>Something went wrong, Please try again later... {isError}</ErrorMsg>
                      </Wrapper> :  
            <React.Fragment>
              {/* Otherwise display user's information & transactions */}
              <React.Fragment>
                <UserInfo>
                  <h1>Welcome back</h1>
                  {canEdit ? (
                    <EditContent>
                      <p className="sr-only">Please enter your new name</p>
                      <Form onSubmit={handleSubmit}> 
                      {/* Display error message if both names not entered*/}
                      {submitted && !inputOk && <Notify delay="2000">Please enter your full name.</Notify>}
                        <InputWrapper>
                          <label htmlFor="first" className="sr-only" >First Name</label>
                              <input type="text" id="first"
                                placeholder={firstName}
                                onChange={(e) => {setNewFirst(e.target.value)}} /> 

                              <label htmlFor="second" className="sr-only" >Surname</label>
                              <input type="text" id="second"
                                placeholder={lastName}
                                onChange={(e) => {setnewLast(e.target.value)}}  />
                        </InputWrapper>

                        <ButtonWrapper>
                          <EditButtons type="submit" disabled={isLoading ? true : false}>Save</EditButtons> 
                          <EditButtons type="button" onClick={resetEdit}>Cancel</EditButtons>
                        </ButtonWrapper>
                  
                      </Form>  
                    </EditContent>
                    ) : (
                      <React.Fragment>
                        <h2>{capitalizedFirst}  {capitalizedLast} !</h2>
                        {/* Display a generic error message if unable to update user details */}
                        {submitted && !isUpdated && <Notify delay="2000">Sorry, there was a problem, please try later...</Notify>}
                        <EditButton onClick={() => setCanEdit(true)}>Edit Name</EditButton>
                      </React.Fragment>
                    )}
                </UserInfo>
                      {/* Transactions component displays 'dummy' transactions */}     
                  <Transactions />   
              </React.Fragment>  
            </React.Fragment>
          }
        </React.Fragment>
      }         
    </MAIN>
    )
  }

export default User

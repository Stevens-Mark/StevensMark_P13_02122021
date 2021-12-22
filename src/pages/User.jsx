import React, { useEffect, useState } from 'react'
import { useSelector, useStore } from 'react-redux'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../utils/style/colors'
import LoadingIcon from '../utils/loader/loadingIcon'
import Transactions from '../components/Transactions'
import { fetchUser } from '../features/fetchUser'
import { UpdateUser } from '../features/fetchUser'
import { capitalize } from '../utils/functions/capitalize'
/**
 * CSS for component using styled.components
 */
 const MAIN = styled.main`
 background-color: #12002b;
 min-height: 100vh;
 display: flex;
//  align-items: center;
//  justify-content: center;
 flex-direction: column;

 @media (min-width: 720px) {
  min-height: 85vh;
}
`;
const LoadingWrapper = styled.div`
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
  // box-sizing: border-box;
  // background-color: white;
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
  // display: block;
  // margin: 0rem 0.5rem;
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

/**
 * Renders user page with possibilty to edit user profile
 * @function User
 * @returns {JSX}
 */
const User = () => {

  const isLoggedIn = useSelector((state) => state.tokenReducer.isLoggedIn)

  const token = useSelector((state) => state.tokenReducer.token)
  const isLoading = (useSelector((state) => state.userReducer.isLoading))
  const firstName = capitalize(useSelector((state) => state.userReducer.user.firstName))
  const lastName =  capitalize(useSelector((state) => state.userReducer.user.lastName))
  // const isError = useSelector((state) => state.userReducer.isError)
  const [newFirst, setNewFirst] = useState('')
  const [newLast, setnewLast] = useState('')
  const [canEdit, setCanEdit] = useState(false)

  const store = useStore()
  // load/fetch user data
  useEffect(() => {
    document.title = 'Argent Bank | Welcome'
    fetchUser(store, token)
  }, [store, token])

  // submit form
  const handleSubmit = (event) => {
    event.preventDefault()
    if (newFirst && newLast) {
      if (newFirst.trim() !=='' && newLast.trim() !=='') {
        UpdateUser(store, token, newFirst, newLast)
        setCanEdit(false)
        }   
    }
  }

  // reset variables if edit cancelled
  const resetEdit = () => {
    setNewFirst('')
    setnewLast('')
    setCanEdit(false)
  }
  
  //if user not authenticated redirect to home page
  if (!isLoggedIn) return <Navigate to="/" /> 

    return (
      <MAIN>
        {isLoading ? (
          <LoadingWrapper>
            <LoadingIcon />
          </LoadingWrapper> 
        ) : (
        <React.Fragment>
          <UserInfo>
            <h1>Welcome back</h1>
            {canEdit ? (
              <EditContent>
                <p className="sr-only">Please enter your new name</p>
                <Form onSubmit={handleSubmit}> 

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
                  <h2>{firstName}  {lastName} !</h2>
                  <EditButton onClick={() => setCanEdit(true)}>Edit Name</EditButton>
                </React.Fragment>
              )}
          </UserInfo>
                {/* Transactions component displays 'dummy' transactions */}
            <Transactions />
        </React.Fragment>
          )}
    </MAIN>
     )
  }

export default User

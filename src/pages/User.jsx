import React, { useEffect, useState } from 'react'
import { useSelector, useStore } from 'react-redux'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../utils/style/colors'
import LoadingIcon from '../utils/loader/loadingIcon'
import Transactions from '../components/Transactions'
import { fetchUser } from '../features/fetchUser'
import { UpdateUser } from '../features/fetchUser'

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

const HEADER = styled.header`
  color: ${colors.tertiary};
  width: 100%;
  margin-bottom: 1.5rem;
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
    margin: 0rem 0.5rem;
    border-radius: 0.2rem;
    border: 1px solid black;
  }
`;

const EditButtons = styled.button`
  // display: block;
  margin: 0rem 0.5rem;
  padding: 0.625rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 0.2rem;
  border: none;
  background-color: ${colors.primary};
  color: ${colors.tertiary};

  @media screen and (min-width: 600px) {
    width: 100px;
    }
`;

/**
 * @function Profile User Page
 * @returns {JSX}
 */
const User = () => {
  const isLoggedIn = useSelector((state) => state.tokenReducer.isLoggedIn)

  const token = useSelector((state) => state.tokenReducer.token)
  const isLoading = useSelector((state) => state.userReducer.isLoading)
  const firstName = useSelector((state) => state.userReducer.user.firstName)
  const lastName = useSelector((state) => state.userReducer.user.lastName)
  // const isError = useSelector((state) => state.userReducer.isError)

  const [newFirst, setNewFirst] = useState(firstName)
  const [newSecond, setnewSecond] = useState(lastName)
  const [canEdit, setCanEdit] = useState(false)
  const store = useStore()

  useEffect(() => {
    document.title = 'Argent Bank | Welcome'
    fetchUser(store, token)
  }, [store, token])

  const handleSubmit = (event) => {
    event.preventDefault()
    setCanEdit(!canEdit)
    UpdateUser(store, token, newFirst, newSecond)
  }
  
  if (!isLoggedIn) return <Navigate to="/" /> 

    return (
      <MAIN>
          <HEADER>
          <h1>Welcome back</h1>
          {canEdit ? (
            <EditContent>
              <p className="sr-only">Please enter your new name</p>
              <Form onSubmit={handleSubmit}> 

                <InputWrapper>

                  <label htmlFor="first" className="sr-only" >First Name</label>
                      <input type="text" id="first"
                        placeholder={firstName}
                        onChange={(e) => {setNewFirst(e.target.value)}} 
                        disabled={isLoading ? true : false}/> 

                      <label htmlFor="second" className="sr-only" >Surname</label>
                      <input type="text" id="second"
                        placeholder={lastName}
                        autoComplete="off"
                        onChange={(e) => {setnewSecond(e.target.value)}}
                        disabled={isLoading ? true : false} />

                </InputWrapper>

                <InputWrapper>

                  <EditButtons type="submit" disabled={isLoading ? true : false}>Save</EditButtons> 
                  <EditButtons type="button" 
                  disabled={isLoading ? true : false}
                  onClick={() => setCanEdit(!canEdit)}>Cancel</EditButtons>

                </InputWrapper>
           
              </Form>  
            </EditContent>
          ) : (
            <React.Fragment>
              <h1>{firstName} {lastName} !</h1>
              <EditButton onClick={() => setCanEdit(!canEdit)}>Edit Name</EditButton>
            </React.Fragment>
          )}

          </HEADER>

          {isLoading && <LoadingIcon />}
          {/* The transactions component shows dummy transaction data */}
          <Transactions />
    </MAIN>
     )
  }

export default User

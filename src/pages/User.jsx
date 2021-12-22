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
 align-items: center;
 justify-content: center;
 flex-direction: column;

 @media (min-width: 720px) {
  min-height: 85vh;
}
`;

const HEADER = styled.header`
color: ${colors.tertiary};
position: relative;
top: 1.313rem;
margin-bottom: 3.313rem;
 h1 {
   margin-top: unset;
 }
`;

const EditButton = styled.button`
  border-color: ${colors.primary};
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
  box-sizing: border-box;
  // background-color: white;
  // width: 550px;
  margin: 0 auto;
  padding: 1rem;
  // position: relative;
  // top: 3rem;

  i {
    font-size: 1rem;
  }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;

  }
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;

  @media screen and (min-width: 600px) {
    flex-direction: row;
    }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.625rem;
  // margin-bottom: 1rem;

  @media screen and (min-width: 600px) {
    &:nth-child(1) {
      align-items: flex-end;
    }
  }

  label {
    font-weight: bold;
  }

  input {
    padding: 5px;
    font-size: 1.2rem;
  }
`;

const EditButtons = styled.button`
  display: block;
  padding: 0.625rem;
  // font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  cursor: pointer;
  border-color: ${colors.primary};
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

          {canEdit ? (
            <EditContent>
              <h1>Please enter your new name</h1>
              <Form onSubmit={handleSubmit}>
              <ItemWrapper>
                <InputWrapper>
                  <label htmlFor="first">First Name</label>
                      <input type="text" id="first"
                        placeholder={firstName}
                      
                        onChange={(e) => {setNewFirst(e.target.value)}} 
                        disabled={isLoading ? true : false}/>    
                  <EditButtons type="submit" disabled={isLoading ? true : false}>Save</EditButtons>     
                </InputWrapper>

                <InputWrapper>
                  <label htmlFor="second">Surname</label>
                      <input type="text" id="second"
                        placeholder={lastName}
                        autoComplete="off"
                        onChange={(e) => {setnewSecond(e.target.value)}}
                        disabled={isLoading ? true : false} />

                  <EditButtons type="button" 
                  disabled={isLoading ? true : false}
                  onClick={() => setCanEdit(!canEdit)}>Cancel</EditButtons>

                </InputWrapper>
              </ItemWrapper>
              </Form>  
            </EditContent>
          ) : (
            <React.Fragment>
              <h1>Welcome back<br />{firstName} {lastName} !</h1>
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

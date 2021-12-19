import { useEffect } from 'react'
import { useSelector, useStore } from 'react-redux'
import { Navigate } from 'react-router-dom'
import styled from 'styled-components'
import colors from '../utils/style/colors'
import LoadingIcon from '../utils/loader/loadingIcon'
import { AccountData } from '../data/accountData.js'
import { fetchUser } from '../features/fetchUser'


/**
 * CSS for component using styled.components
 */
 const MAIN = styled.main`
 background-color: #12002b;
 min-height: 100vh;

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

const Account = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  background-color:  ${colors.tertiary};;
  width: 80%;
  margin: 0 auto;
  flex-direction: column;
  padding: 1.5rem;
  box-sizing: border-box;
  text-align: left;
  margin-bottom: 2rem;

  @media (min-width: 720px) {
      flex-direction: row;
  }
`;

const AccountWrapper = styled.div`
  width: 100%;
  flex: 1;
`;

const AccountTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-weight: normal;
`;

const AccountAmount = styled.div`
  margin: 0;
  font-size: 2.5rem;
  font-weight: bold;
`;

const AccountAmountDescription = styled.div`
  margin: 0;
`;

const AccountWrapperCta = styled.div`
  @media (min-width: 720px) {
    flex: 0;
    }
`;

const TransactionButton = styled.button`
  display: block;
  width: 100%;
  padding: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  margin-top: 1rem;
  border-color: ${colors.primary};
  background-color: ${colors.primary};
  color: ${colors.tertiary};
  cursor: pointer;

  @media (min-width: 720px) {
    width: 200px;
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
  const isError = useSelector((state) => state.userReducer.isError)

  const store = useStore()

  useEffect(() => {
    document.title = 'Argent Bank | Welcome'
    fetchUser(store, token)
  }, [store, token])
  
  if (!isLoggedIn) return <Navigate to="/" /> 

    return (
      <MAIN>
        
      {isError !=='' ? (
        <HEADER>
          <h1>Sorry, Something went wrong !</h1>
          <h1>Please try again later....</h1>
          <h1>{isError}</h1>
        </HEADER>
        ) : (
        <HEADER>
          <h1>Welcome back<br />{firstName} {lastName} !</h1>
          <EditButton>Edit Name</EditButton>
        </HEADER>
      )}
      {isLoading && <LoadingIcon />}
      <h2 className ="sr-only">Accounts</h2>
      {AccountData.map((data) => (
        <Account key={data.id}>
          <AccountWrapper>
            <AccountTitle>{data.title}</AccountTitle>
            <AccountAmount>$ {data.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2})}</AccountAmount>
            <AccountAmountDescription>{data.description}</AccountAmountDescription>
          </AccountWrapper>
          <AccountWrapperCta>
            <TransactionButton>View transactions</TransactionButton>
          </AccountWrapperCta>
        </Account>
       ))}
    </MAIN>
     )
  }

export default User

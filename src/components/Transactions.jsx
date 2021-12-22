import styled from 'styled-components'
import colors from '../utils/style/colors'
import { AccountData } from '../data/accountData.js'

 /**
 * CSS for the component using styled.components
 */
 const Account = styled.article`
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
 border-radius: 0.2rem;
 border: none;
 background-color: ${colors.primary};
 color: ${colors.tertiary};
 cursor: pointer;
 transition: 0.4s;
 &:hover {
   opacity: 0.85;
   box-shadow: 0 2px 4px rgba(0, 0, 0, .8);
   transition: 0.4s;
 }

 @media (min-width: 720px) {
   width: 200px;
   }
`;

/**
 * Renders 'dummy' account transactions (to be replaced later...?)
 * @function Transactions
 * @returns {JSX}
 */
const Transactions = () => {
  return (
    <section>
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
    </section>
  )
}

export default Transactions

import { useEffect, useState } from 'react'
import { useSelector} from 'react-redux'
import styled from 'styled-components'
import colors from '../utils/style/colors'
// import { fetchToken } from '../features/fetchToken'

/**
 * CSS for the component using styled.components
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
  padding: 8px;
  font-size: 1.1rem;
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
 * Renders the 'Sign In page & form' 
 * @function SignIn
 * @returns {JSX}
 */
const EditName = () => {

  const [newFirst, setNewFirst] = useState('')
  const [newSecond, setnewSecond] = useState('')

  // const store = useStore()

  const isLoading = useSelector((state) => state.userReducer.isLoading)

    useEffect(() => {
    document.title = 'Argent Bank | Edit name'
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log(newFirst, newSecond)

    // fetchToken(store, newFirst, newSecond)
  }

  return (
        <EditContent>
          <h2>Please enter your new name</h2>
           <Form onSubmit={handleSubmit}>
          <ItemWrapper>
            <InputWrapper>
              <label htmlFor="first">First Name</label>
                  <input type="text" id="first" 
                    onChange={(e) => {setNewFirst(e.target.value)}} 
                    disabled={isLoading ? true : false}/>    
              <EditButtons type="submit" disabled={isLoading ? true : false}>Save</EditButtons>     
            </InputWrapper>
            <InputWrapper>
              <label htmlFor="second">Surname</label>
                  <input type="text" id="second" 
                    autoComplete="off"
                    onChange={(e) => {setnewSecond(e.target.value)}}
                    disabled={isLoading ? true : false} />
              <EditButtons type="button" disabled={isLoading ? true : false}>Cancel</EditButtons>
            </InputWrapper>
          </ItemWrapper>
          </Form>  
        </EditContent>
  )
}

export default EditName

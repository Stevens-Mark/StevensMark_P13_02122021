import colors from '../style/colors'
import styled, { keyframes } from 'styled-components'

/**
 * Keyframe for Loader component
 */
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

/**
 * CSS for the Loader component
 */
 const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.25rem;
`;

const Loader = styled.div`
  animation: ${rotate} 1s infinite linear;
  border: 0.5rem solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 2rem;   
  padding: 1px;
  width: 1.25rem;
  height: 1.25rem;
`;

/**
 * Renders a loading spinner icon
 * @function LoadingIcon
 * @returns {JSX}
 */
const LoadingIcon = () => {
    return (
      <LoaderWrapper>
          <Loader /> 
      </LoaderWrapper>
    )
}

export default LoadingIcon



import { useSelector } from 'react-redux'
// styling
import styled from 'styled-components'
import colors from '../utils/style/colors'
// import 'dummy' transaction data
import { featureData } from '../data/data'
// import selector
import { selectTheme } from '../utils/selectors'

/**
 * CSS for the component using styled.components
 */
 const Features = styled.section`
  display: flex;
  flex-direction: column;

  @media (min-width: 920px) {
    flex-direction: row;
  }
`;

const FeaturesItem = styled.article`
  flex: 1;
  padding: 2.5rem;
`;

const FeaturesIcon = styled.img`
  width: 100px;
  border: 10px solid ${colors.primary};
  border-radius: 50%;
  padding: 1rem;
`;

 const FeatureItemTitle = styled.h3`
  color: ${({ theme }) => (theme === 'light' ? `${colors.itemTitle}` : `${colors.tertiary}`)};
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
 `;

/**
 * Renders the three "features/slogans" of the bank on the home page
 * @function Feature
 * @returns {JSX}
 */
const Feature = () => {

  // retrieve Redux state
  const theme = useSelector(selectTheme)

  return (
    <Features>
      <h2 className="sr-only">Features</h2>
      {featureData.map((data) => (
        <FeaturesItem key={data.id}>
          <FeaturesIcon src={data.icon} alt={data.altText} />
          <FeatureItemTitle theme={theme}>{data.title}</FeatureItemTitle>
          <p>{data.content}</p>
        </FeaturesItem>
        ))}
    </Features>
  )
}

export default Feature


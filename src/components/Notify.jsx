import React, { useEffect, useState } from "react"
import styled from 'styled-components'
import colors from '../utils/style/colors'
/**
 * CSS for component using styled.components
 */
 const Wrapper = styled.div`
 padding-bottom: 1.25rem;
 color: ${colors.primary};
`;

/**
 * Renders a message for a limited time
 * @function Notify
 * @param {number} props: delay & message
 * @returns {JSX} visible 'message' passed as prop for 'delay' time
 */
export const Notify = props => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setVisible(false)
    }, props.delay)
  }, [props.delay])

  return visible ? <Wrapper>{props.children}</Wrapper> : <Wrapper />
}


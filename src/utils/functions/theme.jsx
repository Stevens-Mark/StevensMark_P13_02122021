import {  useContext } from 'react'
import { ThemeContext } from '../functions/context'

/**
 * @function (custom hook) useTheme
 * Retrieves the Theme Context and allows us to retrieve the current theme (dark or light). 
 * Used for day to night mode.
 */
export function useTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  return { theme, toggleTheme }
}

import React, { useState, createContext } from 'react'
//initialize our Context for the theme
export const ThemeContext = createContext()

/**
 * Allows us to wrap our parent component with our theme provider. The state of theme and its function to modify it, setTheme , are passed in the values . Thus, all child components that are wrapped by the Provider will be able to access theme and setTheme. Used for day to night mode.
 * @function ThemeProvider
 * @param {components} all children
  */
 export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}


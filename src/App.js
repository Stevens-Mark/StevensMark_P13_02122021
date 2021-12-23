import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
// component imports
import Header  from './components/HeaderNav'
import Footer from './components/Footer'
import WelcomePage from './pages/WelcomePage'
import SignIn from './pages/SignIn'
import User from './pages/User'
import Error from './pages/Error'

/**
 * Manages routes & renders pages
 * @function App
 * @returns {JSX}
 */
export default function App() {
  return (   
    <Router>
      <Header />  
        <Routes>
          <Route exact path="/" element={<WelcomePage />}/>
          <Route path="/signin" element={<SignIn />}/>
          <Route path="/user" element={<User />}/>
          <Route path="*" element={<Error />} />
        </Routes> 
      <Footer />
    </Router>  
  )
}


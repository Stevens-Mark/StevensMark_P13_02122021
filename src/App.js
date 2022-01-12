import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// component imports
import Header  from './components/Header'
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
        <Switch>
          <Route exact path="/" component={WelcomePage}/>
          <Route path="/signin" component={SignIn}/>
          <Route path="/user" component={User}/>
          <Route path="*" component={Error} />
        </Switch> 
      <Footer />
    </Router>  
  )
}


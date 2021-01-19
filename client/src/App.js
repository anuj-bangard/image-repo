import {React, Fragment, /*useContext*/} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Login from './components/pages/Login/Login.jsx'
import Register from './components/pages/Register/Register'
import Home from './components/pages/Home'
import Navbar from './components/layouts/Navbar';
import UserAuth from './components/auth/AuthState'
import ProtectedRoute from './components/ProtectedRoute'
//import AuthContext from './components/auth/AuthContext'

const App = () => {

  // const authcontext = useContext(AuthContext)
  // const {loadUser} = authcontext

  return (
    <UserAuth>
      <Router>
        <Fragment>
          <Navbar />
          <Switch>
          <ProtectedRoute exact path="/" component={Home} redir='login'/>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route> 
          </Switch>
        </Fragment>
      </Router>
    </UserAuth>
  )
}

export default App


import React, { Fragment, useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../auth/AuthContext'

const Navbar = () => {

    const authcontext = useContext(AuthContext);
    const {isAuthenticated, logout} = authcontext

    function refreshPage() {
        logout();
        window.location.reload();
      }

    const authLink = (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
                
            </li>
            <button className="btn btn-danger my-2 my-sm-0 mx-3" onClick={refreshPage}>Logout</button>
        </Fragment>
    )

    const unauthLink = (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </Fragment>
    )

return (
<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    
    <Link className="navbar-brand mx-5" to="/">
    <img src="https://i.imgur.com/zZsDCJi.png" width="30" height="30" className="d-inline-block align-top mx-2" alt="" />
    Image Repository
  </Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse flex-row-reverse mx-4" id="navbarNav">
        <ul className="navbar-nav">
            
            {isAuthenticated? authLink :unauthLink}
            
        </ul>
    </div>
    
</nav>
)
}

export default Navbar
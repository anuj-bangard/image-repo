import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import AuthContext from '../auth/AuthContext'

const Home = (props) => {

    const authcontext = useContext(AuthContext)
    const {user} = authcontext 
    
    console.log(user);

    return (
        <div>
            <h1>This is Home Page {user&&<p>{user.email}</p>}</h1>
        </div>
    )
}

export default withRouter(Home)

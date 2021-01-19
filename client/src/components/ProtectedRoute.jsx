import React, {useContext} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AuthContext from './auth/AuthContext';

const ProtectedRoute = ({component:Component,redir:Redir,...rest}) => {
    
    const authcontext = useContext(AuthContext);
    const {isAuthenticated,loadUser} = authcontext
    if(localStorage.token){
        if(!isAuthenticated){
            loadUser();
        }
    }
  
    return (
        <Route 
            {...rest} 
            render={(props)=>{
                if(isAuthenticated||localStorage.token){
                    return <Component/>
                }else{
                    return <Redirect to={{pathname:'/'+Redir, state:{from:props.location}}} />
                }
            }}
        />
    )
}

export default ProtectedRoute

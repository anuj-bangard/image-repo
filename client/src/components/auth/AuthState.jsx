import React, { useReducer } from 'react'
import AuthContext from './AuthContext'
import AuthReducer from './AuthReducer'
import {
    REGISTER_USER,
    REGISTER_FAILED,
    LOGIN_USER,
    LOGIN_FAILED,
    LOGOUT,
    LOAD_USER,
    LOAD_FAILED
} from './Actions'
import axios from 'axios'
import setAuthToken from './AuthToken'

const AuthState = props => {
    const initialState = {
        token:localStorage.getItem("token"),
        isAuthenticated: null,
        user:null,
        error:null,
        loading:true
    }
    const [state, dispatch] = useReducer(AuthReducer, initialState)

    

    const registerUser = async formData =>{
        const config = {
            header:{
                "Content-type":"application/json"
            }
        }
        try {
            const res = await axios.post("http://localhost:5000/register",formData,config);
            dispatch({
                type:REGISTER_USER,
                payload:res.data
            })
           loadUser()
            
        } catch (error) {
            dispatch({
                type:REGISTER_FAILED,
                payload:error.response
            })
            
        }
    }

    const loginUser = async formData =>{
        const config = {
            header:{
                "Content-type":"application/json"
            }
        }
        try {
            const res = await axios.post("http://localhost:5000/login",formData,config);
            dispatch({
                type:LOGIN_USER,
                payload:res.data
            })
            loadUser()
            
        } catch (error) {
            dispatch({
                type:LOGIN_FAILED,
                payload:error.response
            })
            
        }
    }

    const loadUser = async () => {
        if(localStorage.token){
            setAuthToken(localStorage.token)
        }
        const res = await axios.get("http://localhost:5000/");
        try {
            dispatch({
                type:LOAD_USER,
                payload:res.data
            })
            
        } catch (error) {
            dispatch({
                type:LOAD_FAILED
            })
            
        }
    }

    const logout = () => {
       dispatch({
            type: LOGOUT
        })
        
    }
    

    return (
        <AuthContext.Provider value={{
            token:state.token,
            isAuthenticated:state.isAuthenticated,
            user:state.user,
            error:state.error,
            loading:state.loading,
            registerUser,
            loginUser,
            loadUser,
            logout
        }}>{props.children}
        </AuthContext.Provider>    
    )
}

export default AuthState

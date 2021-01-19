import {
    REGISTER_USER,
    REGISTER_FAILED,
    LOGIN_USER,
    LOGIN_FAILED,
    LOGOUT,
    LOAD_USER,
    LOAD_FAILED
} from './Actions'

const AuthReducer = (state,action) => {
    switch(action.type){
        case REGISTER_USER:
        case LOGIN_USER:
            localStorage.setItem('token',action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated:true,
                loading:false,
                user:null,
                error:null
            }
        case REGISTER_FAILED:
        case LOGIN_FAILED:
        case LOGOUT:
        case LOAD_FAILED:
            localStorage.removeItem('token')
            return{
                ...state,
                isAuthenticated:false,
                loading:true,
                token:null,
                user:null,
                error:action.payload
            }
        case LOAD_USER:
            return{
                ...state,
                isAuthenticated:true,
                user:action.payload
            }
            default:
                return{
                    ...state
                }
    }
}

export default AuthReducer
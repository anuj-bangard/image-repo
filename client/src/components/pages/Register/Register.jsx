import React, {useState,useContext,useEffect} from 'react'
import '../Login/Login.css'
import AuthContext from '../../auth/AuthContext'
//import  { Redirect } from 'react-router-dom'

const Register = (props) => {

    const [user,setUser] = useState({
        email:"",
        password:"",
        cpassword:""
    })
    const authcontext = useContext(AuthContext);
    const {registerUser, error, isAuthenticated,loadUser} = authcontext
    

    // const myfunction = () =>{
    //     loadUser()
    // }

    useEffect(() => {
        if(localStorage.token){
            loadUser();
        }if(isAuthenticated){
            props.history.push("/");
        }
    }, [loadUser,isAuthenticated,props.history])

    const {email,password, cpassword} = user
    
    



    const onChange = e => setUser({
        ...user,[e.target.name] : e.target.value
    })

    const onSubmit = e =>{
        e.preventDefault()
        if(cpassword===password){
            
        registerUser({
                email:email,
                password:password
            })
        loadUser();
            if (isAuthenticated){
                console.log("user Registered");
                setUser({
                    email:"",
                    password:"",
                    cpassword:""
                })
            }
                else{
                    console.log(error)
                }
        }else{
            console.log("error")
        }
    }
    return (
            <div className="container">
            <div className="card card-container">
                <img className="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" />
                
                <form className="form-signin" onSubmit={onSubmit}>
                    <span id="reauth-email" className="reauth-email"></span>
                    <input 
                    type="email" 
                    id="inputEmail" 
                    name="email"
                    value={email}
                    onChange={onChange}
                    className="form-control" 
                    placeholder="Email address"
                    required />
                    <input 
                    type="password" 
                    id="inputPassword" 
                    className="form-control" 
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    required />
                    <input 
                    type="password" 
                    id="cPassword" 
                    className="form-control" 
                    placeholder="Confirm Password"
                    name="cpassword"
                    value={cpassword}
                    onChange={onChange}
                    required />
                    <button 
                    className="btn btn-lg btn-primary btn-block btn-signin" 
                    type="submit">Sign Up</button>
                </form>
            </div>
        </div>
        
    )
}

export default Register

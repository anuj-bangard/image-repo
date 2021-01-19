import React, {useState, useContext,/*useEffect*/} from 'react'
import './Login.css'
import AuthContext from '../../auth/AuthContext'
import  { Redirect } from 'react-router-dom'

const Login = (props) => {

    const [user,setUser] = useState({
        email:"",
        password:""
    })

    const [formValid,setValidation] = useState({
        emailError:"",
        emailErrorClass:"",
        passwordError:"",
        passwordErrorClass:""
    })

    const authcontext = useContext(AuthContext);
    const {loginUser, error, isAuthenticated, loadUser} = authcontext
    
    const {email,password} = user
    const {emailError,passwordError} = formValid

    if (localStorage.token){
        if(!isAuthenticated){
            loadUser();
        }
        return <Redirect to='/'  />
    };
    
    
    // useEffect(() => {
    //     if(isAuthenticated){
    //         props.history.push("/");
    //     }
    // }, [isAuthenticated,props.history])

    const onChange = e => setUser({
        ...user,[e.target.name] : e.target.value
    })

    const onSubmit = e =>{
        e.preventDefault()
        loginUser({
            email:email,
            password:password
        })
        
        if(error){
            if(error.status===400){
                setValidation({
                    ...formValid,
                    passwordError:true,
                    passwordErrorClass:'is-invalid'
                })
            }
            if(error.status===404){
                setValidation({
                    ...formValid,
                    emailError:true,
                    emailErrorClass:'is-invalid'
                })
            }
        }else{
            <Redirect to='/'/>
        }
    }

    return (
        <div className="container">
            <div className="card card-container">
                <img className="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" />
                
                <p id="profile-name" className="profile-name-card"></p>
                <form className="form-signin needs-validation" onSubmit={onSubmit}>
                    <span id="reauth-email" className="reauth-email"></span>
                    
                    { emailError && <div className="invalid-feedback">
                        Email does not exist
                         </div>
                        }

                    <input 
                    type="email" 
                    id="inputEmail" 
                    className={`form-control ${formValid.emailErrorClass}`} 
                    placeholder="Email address"
                    name="email"
                    value={email}
                    onChange={onChange} 
                    required />

                    { passwordError && <div className="invalid-feedback">
                        Enter Vaild Password
                         </div>
                        }

                    <input 
                    type="password" 
                    id="inputPassword" 
                    className={`form-control ${formValid.passwordErrorClass}`} 
                    placeholder="Password" 
                    name="password"
                    value={password}
                    onChange={onChange}
                    required />
                    <div id="remember" className="checkbox">
                        <label>
                            <input type="checkbox" value="remember-me"/> Remember me 
                        </label>
                    </div>
                    <button 
                    className="btn btn-lg btn-primary btn-block btn-signin" 
                    type="submit">Sign in</button>
                </form>
                <a href="/" className="forgot-password">
                    Forgot the password?
                </a>
            </div>
        </div>
    )
}

export default Login

import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { BACKEND_SERVER } from '../constants/constants'
import logo from '../assets/logo.png'
import Cookies  from "js-cookie"

import { CustomToastContainer, toast } from '../utils/toastUtil'

import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../store/UserSlice'
 
export default function Login() {
  
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { isAunthenticated, userDetails} = useSelector( (state)=>state.user )

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [passwordVisible, setPasswordVisible] = useState(false) 

    function handleChange(event){
        const { name, value } = event.target

        setLoginData(
            prevLogin => ({...prevLogin, [name]:value})  //The [name] is dynamically generated and thats why we have it in square brackets  
        )
    }

    function handlePasswordToggle(){       
        setPasswordVisible(!passwordVisible)  
    }

    async function handleSubmit(event){
        event.preventDefault(); 

        setIsLoggingIn(true)
    
        try {
            // Axios post request
            const response = await axios.post(`${BACKEND_SERVER}/auth/login.php`, loginData);
                    
            if (response.data?.status === 1){ // If the login is successful
                // Call the dispatch action that stores the user information in the store 
                dispatch( loginSuccess( response.data.user ) )
    
                // Set the jwt token inside a cookie 
                Cookies.set('authJWTToken', response.data.jwt, { expires: 1, secure: false, sameSite: 'strict' }) // Expires in one day 
    
            } else {
                toast(response.data.msg) 
            }
        } catch(error) {
            toast(`Caught Error: ${error.message}`)
            // Reset the form Data
            setLoginData({email:"", password:""})     
        } finally {
            // Enable the submit button and hide the spinner 
            setIsLoggingIn(false)
        }
    }

    useEffect(()=>{
        // If the user is authenticated and they have details, navigate to the projects page
        if (isAunthenticated && Object.keys(userDetails).length > 0) {
            navigate("/projects")
        }
    }, [userDetails])
    
  return ( 
    <div className="container-fluid">
        <div className='p-3 col-md-4 col-12 mx-auto border-start border-warning' style={{ backgroundColor : 'rgba(0,0,0,0.3)' }}>
            <img src={logo} className='d-block rounded mx-auto mb-2' alt="logo" style={{height: '100px'}}/>
            <h4 className="text-white text-center"> <i className="bi bi-box-arrow-in-right"></i> SIGN IN</h4> <hr className="border border-secondary" />
            <form action="#" method="POST" onSubmit={ handleSubmit }>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label text-white">EMAIL ADDRESS</label>
                    <input type="email" name="email" className="form-control bg-dark text-white text-lowercase border border-secondary" value={ loginData.email }  onChange={ handleChange } id="exampleInputEmail1" required="required" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label text-white">PASSWORD</label>
                    <input type={passwordVisible ? "text" : "password"} name='password' className="form-control bg-dark text-white border border-secondary" required="required" value={ loginData.password } onChange={ handleChange } id="passwordInput" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" onChange={ handlePasswordToggle } className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label text-white" htmlFor="exampleCheck1">Show password.</label>
                    <small className="float-end" title="Click to reset your password."><Link to='/resetpassword' className='link-info'>Reset password.</Link></small>
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary" title="Click to sign in." disabled = {isLoggingIn} >  
                        { isLoggingIn ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                         : "Sign In"}
                    </button>
                </div>
            </form>
            <div className="bg-dark mt-2">
                <small className='text-white'>Don't have an account? <Link to='/signup' className='link-info link-underline-opacity-75-hover'>Sign up.</Link></small>
            </div>
        </div>
        <CustomToastContainer />
    </div>
  )
}

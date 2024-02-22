import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'

export default function Login() {

    const navigate = useNavigate();

    const { setLoggedInUserData } = useContext(UserContext);

    let loginButton = document.querySelector("#loginButton"); 
    let passwordInputField = document.getElementById("passwordInput");

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })

    function handleChange(event){
        const { name, value } = event.target;

        setLoginData(
            prevLogin => ({...prevLogin, [name]:value})  //The [name] is dynamically generated and thats why we have it iin square brackets  
        )
    }

    function handlePasswordToggle(){       
        passwordInputField.type === "password" ? passwordInputField.type = "text" :  passwordInputField.type = "password";        
    }

    function handleSubmit(event){
        event.preventDefault();

        //Disbale the submit button and activate the spinner
        loginButton.disabled = true;
        loginButton.querySelector("span").classList.remove("d-none");

        //Axios post request
        axios.post("https://localhost:80/photographyapi/auth/login.php", loginData)
            .then((response)=>{
                console.log(response);
                
                if (response.data?.status && response.data.status === 1){

                    //Check if the jwt has been created
                    const jwtToken = Cookies.get('jwtToken');

                    if(jwtToken){
                        const decodedToken = jwtDecode(jwtToken);
                        console.log(decodedToken); // Logs the payload of the JWT token

                        setLoggedInUserData(decodedToken.data); //Sets the logged In user payload to the user context
                        navigate("/pages/dashboard");
                    } else {
                        notify('There was a problem creating an access token. Please try again')
                    }


                } else {
                    notify(response.data.Msg);
                }
            }).catch((error) => {
                    notify(error);

                    //Reset the form Data
                    setLoginData({email:"", password:""});       
            });

            //Enable the submit button and hide the spinner 
            loginButton.disabled = false;
            loginButton.querySelector("span").classList.add("d-none");
    }

    function notify(message){
        toast(message)
    }

  return (
    <div className="container-fluid">
        <div className='px-3 py-5 col-md-4 col-12 mx-auto border-start border-warning' style={{ backgroundColor : 'rgba(0,0,0,0.3)' }}>
            <h4 className="text-white text-center"> <i className="bi bi-box-arrow-in-right"></i> SIGN IN</h4> <hr className="border border-secondary" />
            <form action="#" method="POST" onSubmit={ handleSubmit }>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label text-white">EMAIL ADDRESS</label>
                    <input type="email" name="email" className="form-control bg-dark text-white text-lowercase border border-secondary" value={ loginData.email }  onChange={ handleChange } id="exampleInputEmail1" required="required" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label text-white">PASSWORD</label>
                    <input type="password" name='password' className="form-control bg-dark text-white border border-secondary" required="required" value={ loginData.password } onChange={ handleChange } id="passwordInput" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" onChange={ handlePasswordToggle } className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label text-white" htmlFor="exampleCheck1">Show password.</label>
                    <small className="float-end" title="Click to reset your password."><Link to='/resetpassword' className='link-info'>Reset password.</Link></small>
                </div>
                <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary" id="loginButton" title="Click to sign in.">  <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span> Sign In</button>
                </div>
            </form>
            <div className="bg-dark mt-2">
                <small className='text-white'>Don't have an account? <Link to='/signup' className='link-info link-underline-opacity-75-hover'>Sign up.</Link></small>
            </div>
        </div>

        <ToastContainer
            position="bottom-left"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition: Bounce
        />
    </div>
  )
}

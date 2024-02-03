import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

export default function Login() {

    const navigate = useNavigate();

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
                
                if (response.data === "Logged in successfully!"){
                    localStorage.setItem('token', response.config.headers['x-auth-token']);
                    alert("You are now logged in!");

                    const { setLoggedInUserData } = useContext(UserContext);

                    navigate('/pages/dashboard')
                } else {
                    alert("Invalid credentials");
                }
            }).catch((error) => {
                    console.log(error);
                    //Reset the form Data
                    setLoginData({email:"",password:""});  
                }              
            );

            //Enable the submit button and hide the spinner 
            loginButton.disabled = false;
            loginButton.querySelector("span").classList.add("d-none");
    }

  return (
    <>
        <form onSubmit={ handleSubmit } className='p-3 col-12 col-md-4 mx-auto'>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label text-white">EMAIL ADDRESS</label>
                <input type="email" name="email" class="form-control bg-black text-white border border-secondary" value={ loginData.email }  onChange={ handleChange } id="exampleInputEmail1" aria-describedby="emailHelp" />
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label text-white">PASSWORD</label>
                <input type="password" name='password' class="form-control bg-black text-white border border-secondary" value={ loginData.password } onChange={ handleChange } id="passwordInput" />
            </div>
            <div class="mb-3 form-check">
                <input type="checkbox border border-white" onChange={ handlePasswordToggle } class="form-check-input" id="exampleCheck1" />
                <label class="form-check-label text-white-50" for="exampleCheck1">Show password.</label>
            </div>
            <button type="submit" class="btn btn-primary" id="loginButton">  <span class="spinner-border spinner-border-sm d-none" aria-hidden="true"></span> Submit</button>
        </form>
    </>
  )
}

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from  'axios'

import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'

export default function SignUp() {

    const [signUpData, setSignUpData] = useState({
        name : "",
        email : "",
        password : "",
        password2 : ""
    })

    const navigate = useNavigate(); 

    function handleChange(e){
        const {name, value} = e.target;
        setSignUpData((prevData)=>({...prevData, [name]:value}))
    }

    function notify(message){
        toast(message);
    }

    function handleSubmit(e){
        e.preventDefault(); 

        axios.post("http://localhost:80/photography_api/auth/signup.php", signUpData)
            .then((response)=>{
                console.log(response);
                
                if (response.data?.status && response.data.status === 1){
                    notify(response.data.Msg);
                    setTimeout(()=>{navigate("/login")}, 2000);
                } else {
                    notify(response.data.Msg);
                }
            }).catch((error) => {
                notify(error);   //If axios failed to make the post request  
            });
    }

  return (
    <div className="container-fluid">
        <div className='px-3 py-5 col-md-4 col-12 mx-auto' style={{ backgroundColor : 'rgba(0,0,0,0.3)' }}>        
            <h4 className="text-white">Create your account.</h4> <hr className="border border-secondary" />
            <form action="#" method="post" onSubmit={ handleSubmit }>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label text-white">NAME</label>
                        <input type="text" name="name" className="form-control bg-dark text-white text-uppercase border border-secondary" value={ signUpData.name }  onChange={ handleChange } id="nameInput" required="required" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label text-white">EMAIL ADDRESS</label>
                        <input type="email" name="email" className="form-control bg-dark text-white text-lowercase border border-secondary" value={ signUpData.email }  onChange={ handleChange } id="emailInput" required="required" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label text-white">PASSWORD</label>
                        <input type="password" name='password' className="form-control bg-dark text-white border border-secondary" required="required" value={ signUpData.password } onChange={ handleChange } id="passwordInput" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label text-white">RE-ENTER PASSWORD</label>
                        <input type="password" name='password2' className="form-control bg-dark text-white border border-secondary" required="required" value={ signUpData.password2 } onChange={ handleChange } id="passwordInput2" />
                    </div>
                    <div className="d-grid gap-2">
                        <button type="submit" className="btn btn-primary text-white" id="signUpBtn"> <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span> Sign up </button>
                    </div>
            </form>
            <div className="bg-dark mt-2">
                <small className='text-white'>Already have an account? <Link to='/login' className='link-info link-underline-opacity-75-hover'>Sign in.</Link></small>
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

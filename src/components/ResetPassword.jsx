import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'

export default function ResetPassword() {

    const [resetFormData, setResetFormData] = useState({
        email : '',
        resetCode : ''
    });

    const navigate = useNavigate();

    const resetPasswordInputDiv = document.querySelector('#resetPasswordInputDiv');
    const submitButton = document.querySelector("#resetCodeSubmitButton");

    //When both the email and the code have been submitted
    function handleSubmit(event){
        event.preventDefault();

        submitButton.setAttribute("disabled", true)
        submitButton.querySelector("span").classList.remove("d-none")

        axios.post("http://localhost:80/photography_api/passwordReset/sendNewPassword.php", resetFormData)
            .then(response => {
                console.log(response.data)            
               
                if(response.data?.status && response.data.status == 1){
                    setTimeout(() => { //Create a delay for the notification display 
                        navigate("login");
                    }, 2000);                   
                } 
                //Display success message
                notify(response.data.msg)
            })
            .catch(error =>{
                notify(error)
            })
        
        submitButton.removeAttribute("disabled")
        submitButton.querySelector("span").classList.add("d-none")
        
    }

    function sendEmailForReset(){
        //toggle the spinner and deactivate the submit button
        submitButton.setAttribute("disabled", true)
        submitButton.querySelector("span").classList.remove("d-none")

        axios.post("http://localhost:80/photography_api/passwordReset/sendPasswordResetCode.php", resetFormData)
            .then(response => {
                console.log(response.data)            
               
                if(response.data?.status && response.data.status == 1){
                    //Make visible the code input div
                    resetPasswordInputDiv.classList.remove("d-none")  
                } 

                //Display success message
                notify(response.data.msg)
            })
            .catch(error =>{
                notify(error)
            })

            submitButton.removeAttribute("disabled")
            submitButton.querySelector("span").classList.add("d-none")
    }

    function handleChange(event){
        const {name, value} = event.target;
        setResetFormData((prevData) => ({...prevData, [name]:value}))
    }

    function notify(message)
    {
        toast(message)
    }

  return (
    <div className="container-fluid">
        <div className='px-3 py-5 col-md-4 col-12 mx-auto border-start border-warning' style={{ backgroundColor : 'rgba(0,0,0,0.3)' }}>
            <h4 className="text-white">  Reset Password</h4> <hr className="border border-secondary" />
            <form action="#" method="POST" id="resetPasswordForm">
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label text-white">EMAIL ADDRESS</label>
                    <input type="email" name="email" className="form-control bg-dark text-white text-lowercase border border-secondary" value={ resetFormData.email }  onChange={ handleChange } id="exampleInputEmail1" required="required" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3 d-none" id="resetPasswordInputDiv">
                    <label htmlFor="exampleInputPassword1" className="form-label text-white">VERIFICATION CODE</label>
                    <input type="number" name='resetCode' className="form-control bg-dark text-white border border-secondary" value={ resetFormData.resetCode } onChange={ handleChange } id="resetCodeInput" required={ resetFormData.resetCode !== "" } />
                </div>                
                <div className="d-grid gap-2">
                    <button type={ resetFormData.resetCode !== "" ? "submit" : "button" } onClick={ (e)=>(resetFormData.resetCode === "" ? sendEmailForReset() : handleSubmit(e)) } className="btn btn-primary" id="resetCodeSubmitButton" title="Click to send password reset code.">  <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span> Send Code</button>
                </div>
            </form>
            <div className="bg-dark mt-2">
                <small className='text-white'>Try signing in <Link to='/login' className='link-info link-underline-opacity-75-hover'>Sign in.</Link></small>
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

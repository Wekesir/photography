import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_SERVER } from '../constants/constants'

import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'

export default function ResetPassword() {

    const [resetFormData, setResetFormData] = useState({
        email : '',
        resetCode : ''
    });
    const [submitBtnLoading, setSubmitBtnLoading] = useState(false);

    const navigate = useNavigate();

    const resetPasswordInputDiv = document.querySelector('#resetPasswordInputDiv');

    //When both the email and the code have been submitted
    async function handleSubmit(event){
        event.preventDefault();
        try {
            
            setSubmitBtnLoading( !submitBtnLoading )
    
            const response = await axios.post(BACKEND_SERVER + "/passwordReset/sendNewPassword.php", resetFormData)                     
                   
            if(response.data?.status && response.data.status == 1){
                setTimeout(() => { //Create a delay for the notification display 
                    navigate("/login");
                }, 2000);                   
            } else {
                throw new Error(response.data.msg)
            }              
        
        } catch (error) {

            notify(error)

        } finally {

            setSubmitBtnLoading( !submitBtnLoading )

        }              
        
    }

    async function sendEmailForReset(){
        try {
            
            setSubmitBtnLoading( !submitBtnLoading )
    
            const response = await axios.post(BACKEND_SERVER + "/passwordReset/sendPasswordResetCode.php", resetFormData)                 
                   
            if(response.data?.status && response.data.status == 1){
                //Make visible the code input div
                resetPasswordInputDiv.classList.remove("d-none")  
            } else {
                throw new Error(response.data.msg)
            }

        } catch (error) {

            notify(error)
            
        } finally {

           setSubmitBtnLoading( !submitBtnLoading )

        }          

    }

    function handleChange(event){
        const {name, value} = event.target;
        setResetFormData((prevData) => ({...prevData, [name]:value}))
    }

    function notify(message){
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
                    <button type={ resetFormData.resetCode !== "" ? "submit" : "button" } onClick={ (e)=>(resetFormData.resetCode === "" ? sendEmailForReset() : handleSubmit(e)) } className="btn btn-primary" id="resetCodeSubmitButton" disabled={ submitBtnLoading } title="Click to send password reset code.">  
                        { submitBtnLoading && (
                              <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span> 
                        ) }                      
                        Send Code
                    </button>
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

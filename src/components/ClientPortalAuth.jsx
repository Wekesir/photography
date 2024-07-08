import React, { useContext, useState } from 'react'
import MainNavbar from './MainNavbar'
import logo from '../assets/logo.png'
import { BACKEND_SERVER } from '../constants/constants'
import axios from 'axios'
import ClientContext from '../contexts/ClientsContext'

import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

export default function ClientPortalAuth() { 

    document.title = "Client Auth | Lyrics Photography"

    const [showCodeInput, setShowCodeInput] = useState(false)
    const [formInput, setFormInput] = useState([]) //Will hold the email and the verification code of the user 
    const [submitLoading, setSubmitLoading] = useState(false);
    const  navigate = useNavigate()
    const { setLoggedInClientData } = useContext(ClientContext)

    function handleinputChange(event) {

        const {name, value} = event.target

        //update the formInput state
        setFormInput(prevFormInput => ({
            ...formInput, [name] : value
        }))
    }

    async function handleEmailSubmit(event) { //Sends the email to the backend server
        event.preventDefault();

        setSubmitLoading( !submitLoading )

        try {
            //Check if the email field is empty
            if (!formInput.email) {
                throw new Error("An email address must be provided to continue")
            }

            const response = await axios.post(BACKEND_SERVER + "/clients/send-auth-code.php", {CLIENT_EMAIL : formInput.email})            
    
            if(response.data?.status && response.data.status == 1) { //Success

                setShowCodeInput(true) //make the code input visible
                notify(response.data.msg)

            } else { //Error Message 
                throw new Error(response.data.msg) //Display the error message 
            }   

        } catch (error) {
            notify( error )
        } finally {
            setSubmitLoading( !submitLoading )
        }

    }

    async function handleCodeSubmit(event) {
        event.preventDefault();

        setSubmitLoading( !submitLoading )

        try {

            if(!formInput.email || !formInput.code){
                throw new Error("Please provide both an email and a verification code.")
            }

            const response = await axios.post(BACKEND_SERVER + "/clients/verify-auth-code.php", formInput)            
    
            if(response.data?.status && response.data.status == 1) { //Success

                navigate("/clienthomepage")
                setLoggedInClientData(response.data.data) 
                notify(response.data.msg)

            } else if(response.data?.status && response.data.status == 0) { //Error Message 

                throw new Error(response.data.msg) //Display the error message 

            }
    
        } catch (error) {
            notify( error )
        } finally {
            
           setSubmitLoading( !submitLoading )

        }
    }

    function notify(message){
        toast(message)
    }

  return (
    <>
        <div className="container-fluid p-0 bg-dark text-white overflow-x-hidden" style={{height: '100vh'}}>
            <MainNavbar />
            <div className='border-start border-warning col-md-4 col-12 mx-auto p-4' style={{ backgroundColor : 'rgba(0,0,0,0.3)' }}>

                <img src={logo} className='d-block rounded mx-auto' alt="logo" style={{height: '100px'}}/>

                <h4 className='text-center mt-2'>Lyrics Photography</h4> <hr className='border border-secondary' />

                <form action="#" method="post">
                    <div className="mb-3">
                        <label htmlFor="email" className='text-white fw-bold mb-2'>EMAIL ADDRESS</label>
                        <input type="email" name="email" id="email" onChange={handleinputChange} value={formInput.email || ""} className='form-control border border-secondary text-white bg-dark' required />
                    </div>                    
                    <div className={`mb-3 ${showCodeInput ? 'd-block' : 'd-none'} `} >
                        <label htmlFor="code" className='text-white fw-bold mb-2'>AUTHORIZATION CODE</label>
                        <input type="text" name="code" id="code" onChange={handleinputChange} value={formInput.code || ""} className='form-control border border-secondary text-white bg-dark'  />
                    </div>
                    <div className="mb-3 d-grid gap-2">
                        <button className="btn btn-secondary fw-bold" onClick={ (event)=>{ showCodeInput ? handleCodeSubmit(event) : handleEmailSubmit(event)  } } disabled= { submitLoading }>
                            {submitLoading && (
                                <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span> &nbsp
                            )}                            
                            Submit 
                        </button>
                    </div>
                </form>

                <div className="alert" style={{ backgroundColor : 'rgba(0,0,0,0.6)' }} role="alert">
                    <h6 className="alert-heading"><i className="bi bi-info-circle"></i> How this works!</h6>
                    <small>You'll be required to provide your active email that was use to register you in the system. <br />
                            An OTP will be send to you to enable you access your files.
                     </small>
                </div>

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

    </>
  )
}

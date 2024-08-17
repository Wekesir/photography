import React, { useEffect, useState } from 'react'
import MainNavbar from './MainNavbar'
import logo from '../assets/logo.png'
import { BACKEND_SERVER } from '../constants/constants'
import axios from 'axios'
import { CustomToastContainer, toast } from '../utils/toastUtil'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setFolderID, setClientEmail } from '../store/clientSlice';

export default function ClientPortalAuth() { 

    document.title = "Client Auth | Lyrics Photography"

    const [formInput, setFormInput] = useState([]) //Will hold the email and the verification code of the user 
    const [submitLoading, setSubmitLoading] = useState(false);

    const {folder} = useSelector(state=>state.client)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleinputChange(event) {
        const {name, value} = event.target

        //update the formInput state
        setFormInput(prevFormInput => ({
            ...prevFormInput, [name] : value
        }))
    }

    async function handleSubmit(event) {       
        try {
            event.preventDefault();
            setSubmitLoading( !submitLoading )

            if(!formInput.email || !formInput.code){
                throw new Error("Please provide both an email and a verification code.")
            }

            const {data} = await axios.post(`${BACKEND_SERVER}/clients/fetchProjectId.php`, formInput); 
    
            if(data?.status == 1) { //Success
                dispatch( setFolderID(data.project) )  
                dispatch( setClientEmail(formInput.email) )                            
            } else if(data?.status == 0) { //Error Message 
                throw new Error(data.msg) //Display the error message 
            }     
        } catch (error) {
            toast( `Caught error: ${error.message}` ) 
        } finally {          
            setFormInput({})           
            setSubmitLoading( !submitLoading )
        }
    }

    useEffect(()=>{
        if(folder) {
            navigate("/clienthomepage") 
        }            
    },[folder])

  return (
    <React.Fragment>
        <div className="container-fluid p-0 bg-dark text-white overflow-x-hidden" style={{height: '100vh'}}>
            <MainNavbar />
            <div className='border-start border-warning col-md-4 col-12 mx-auto p-4' style={{ backgroundColor : 'rgba(0,0,0,0.3)' }}>

                <img src={logo} className='d-block rounded mx-auto' alt="logo" style={{height: '100px'}}/>

                <h4 className='text-center mt-2'>Lyrics Photography</h4> <hr className='border border-secondary' />

                <form action="#" method="post" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className='text-white fw-bold mb-2'>EMAIL</label>
                        <input type="email" name="email" id="email" onChange={handleinputChange} value={formInput.email || ""} className='form-control border border-secondary text-white bg-dark' required />
                    </div>                    
                    <div className={`mb-3 `} >
                        <label htmlFor="code" className='text-white fw-bold mb-2'>AUTHORIZATION CODE</label>
                        <input type="text" name="code" id="code" onChange={handleinputChange} value={formInput.code || ""} className='form-control border border-secondary text-white bg-dark'  required/>
                    </div>
                    <div className="mb-3 d-grid gap-2">
                        <button className="btn btn-secondary fw-bold"  disabled= { submitLoading }>
                            {submitLoading && (
                                <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span> 
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
        <CustomToastContainer />
    </React.Fragment>
  )
}

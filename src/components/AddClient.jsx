import React, { useState } from 'react'
import { CustomToastContainer, toast } from '../utils/toastUtil';
import axios from 'axios';
import { BACKEND_SERVER } from '../constants/constants'
import { useNavigate } from 'react-router-dom';

export default function AddClient( { widthClass } ) {

    const [formData, setFormData] = useState({
        username: '',
        phoneNumber: '',
        email: ''
      });

    const navigate = useNavigate()

    function handleChange(event){
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSubmit(e){
        e.preventDefault();
        try {            
            const spinner = e.target.querySelector("span.spinner-border")    
            spinner.classList.remove("d-none")
    
            const response = await axios.post(BACKEND_SERVER + "/clients/addNewClient.php", formData)          
                
            if (response.data?.status === 0){ //Error
                throw new Error(response.data.msg)        
            }          
            navigate("/clients")                
        } catch (error){
            toast(`Caught Error: ${error.message}` || "Unknown error.")
        } finally {
            setFormData({username: '',
                phoneNumber: '',
                email: ''}); 

            spinner.classList.add("d-none");
        }

    }

  return (
    <React.Fragment>        
        <div className="container-fluid overflow-y-auto d-flex align-items-center" style={{height:'78vh'}}>          
            <form className={`border border-secondary ${widthClass} p-4 mx-auto`} method='post' onSubmit={handleSubmit}>
                <h6>Client Information:</h6><hr className='border border-secondary'/>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label text-white">CLIENT NAME</label>
                    <input type="text" name='username' className="form-control  bg-dark text-white text-uppercase border border-secondary" onChange={ handleChange } value={formData.username} id="exampleInputPassword1" required='required'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label text-white">CLIENT EMAIL ADDRESS</label>
                    <input type="email" name='email' className="form-control  bg-dark text-white text-lowercase border border-secondary" onChange={ handleChange } value={formData.email}  id="exampleInputEmail1" aria-describedby="emailHelp"  required='required'/>
                </div>           
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label text-white">CLIENT PHONE NUMBER  </label>
                    <input type="phone" name='phoneNumber' className="form-control  bg-dark text-white border border-secondary" onChange={ handleChange } value={formData.phoneNumber}  id="phone"  required='required'/>
                </div>
                <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary"> <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span> Add Client</button>
                </div>           
            </form>
        </div>
        <CustomToastContainer />
    </React.Fragment>
  )
}

import React, { useState } from 'react'
import AddClients from '../components/Clients'
import SideNav from '../components/Sidenav'
import Navbar from '../components/Navbar'
import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import axios from 'axios'

export default function AddClientsPage() {

    const [formData, setFormData] = useState({
        username: '',
        phoneNumber: '',
        email: ''
      });

    function handleChange(event){
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function notify(message){
        toast(message)
    }

    function handleSubmit(e){
        e.preventDefault();

        const spinner = e.target.querySelector(".spinner-border")

        spinner.classList.remove("d-none");

        axios.post("http://localhost:80/photography_api/clients/addNewClient.php", formData)
        .then((response)=>{
            console.log(response.data); //Data from the console
            
            if (response.data?.status && response.data.status === 1){
                notify(response.data.msg);

                setFormData({username: '',
                phoneNumber: '',
                email: ''});     
            } else {
                notify(response.data.msg);
            }
        }).catch((error) => {
                notify(error);

                //Reset the form Data
                setFormData({username: '',
                phoneNumber: '',
                email: ''});       
        });

        spinner.classList.add("d-none");

    }

  return (
    <div className="container-fluid bg-dark text-white" style={{minHeight:'100vh'}}>
      <Navbar/>      
      <div className="row">
        <div className="col-md-3 p-0">
          <SideNav />
        </div>
        <div className="col-md-9">
          <h4 className=""><i className="bi bi-house"></i> Add Client(s)</h4>
          <div className="container-fluid overflow-y-auto d-flex align-items-center" style={{height:'78vh'}}>          
          <form className='border border-secondary col-md-6 p-4 mx-auto' method='post' onSubmit={handleSubmit}>
          <h5>Client Information:</h5><hr className='border border-secondary'/>
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

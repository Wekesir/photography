import React, { useState } from 'react'
import { BACKEND_SERVER } from '../constants/constants';
import Cookies from 'js-cookie';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux';

export default function UpdateProfile() {
  const dispatch = useDispatch();

  const name = useSelector((state) => state.user.userDetails.name)
  const phone = useSelector((state) => state.user.userDetails.phone)
  const email = useSelector((state) => state.user.userDetails.email)

  const [profileUpdating, setProfileUpdating] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    name : name,
    phone : phone,
    email : email
  });

  const jwt = Cookies.get("authJWTToken"); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    setProfileUpdating(!profileUpdating); 

    try {      
      const response =  await axios.post(BACKEND_SERVER + "/users/updateProfile.php", {
        headers : {
          'Authorization' : `Bearer ${jwt}`,
          'Content-Type' : "Application-json"
        }
      })

      if(response.data?.status && response.data.status == 1) { //Success

        //Update the Redux state for the user slice 
        dispatch( loginSuccess( response.data.user ) )
        notify( response.data.msg );

      } else {
        notify(response.data.msg) //Error message from the server 
      }

      setProfileUpdating(!profileUpdating) 

    } catch (error) {
      notify("Error " + error)
    } 

  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setProfileInfo(
      (prevInfo) => ({...prevInfo, [name] : value}) //Set the object keys dynamically based on the name of the input
    )
  }

function notify(message){
  toast(message)
}

  return (
    <>
    
      <div className='container-fluid'>
          <div className='p-3 col-md-6 col-12 mx-auto border-start border-warning' style={{ backgroundColor : 'rgba(0,0,0,0.3)' }}>
            <form action="#" method="post" onSubmit={ handleSubmit }>
                  <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label text-white">NAME</label>
                      <input type="text" name="name" className="form-control bg-dark text-white text-uppercase border border-secondary" value={ profileInfo.name} id="exampleInputname" disabled aria-describedby="nameHelp" />
                      <small className='text-white-50'>Name can not be changed!</small>
                  </div>
                  <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label text-white">PHONE NUMBER</label>
                      <input type="tel" name="phone" className="form-control bg-dark text-white border border-secondary" value={ profileInfo.phone}  onChange={ handleChange } id="exampleInputphone" required="required" aria-describedby="phoneHelp" />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label text-white">EMAIL ADDRESS</label>
                      <input type="email" name="email" className="form-control bg-dark text-white text-lowercase border border-secondary" value={ profileInfo.email }  onChange={ handleChange } id="exampleInputEmail1" required="required" aria-describedby="emailHelp" />
                  </div>
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary" title="Click to update your profile" disabled={ profileUpdating }>
                      { profileUpdating ?  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> 
                      : "Update Profle" }                   
                    </button>
                  </div>
            </form>
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

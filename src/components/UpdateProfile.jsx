import React, { useState, useRef } from 'react'
import { BACKEND_SERVER } from '../constants/constants';
import Cookies from 'js-cookie';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfilePicture, removeProfilePicture, loginSuccess } from '../store/UserSlice'
import logo from '../assets/logo.png'

export default function UpdateProfile() {

  const dispatch = useDispatch();

  const imageInput = useRef(null)

  const { name, phone, email, image } = useSelector( (state) => state.user.userDetails)

  const [profileUpdating, setProfileUpdating] = useState(false);
  const [profilePhotoUpdating, setProfilePhotoUpdating] = useState(false)
  const [removingProflePic, setRemovingProflePic] = useState(false)
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
      const response =  await axios.post(BACKEND_SERVER + "/users/updateProfile.php", profileInfo, {
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
      
    } catch (error) {
      notify("Error " + error)
    } finally {
      setProfileUpdating(!profileUpdating) 
    }

  }

  const handleChangeProfilePicture = async ()=> { 
    try{
      setProfilePhotoUpdating(!profilePhotoUpdating)

      const profileImage = imageInput.current.files[0]
      const formData = new FormData()

      formData.append("profileImage", profileImage)

      const response = await axios.post( BACKEND_SERVER + "/users/update_profile_pic.php", formData, {
        headers : {
          Authorization : `Bearer ${jwt}`,
          "Content-Type" : "multipart/form-data" 
        }
      })

      if( response.data?.status && response.data.status == 1 ) { //Successfully updated 
        const profileImage = response.data.img; // This is thee new profile image 

        dispatch( updateProfilePicture(profileImage) )
      } else { //Error message 
        throw new Error( response.data.msg )
      }

    } catch ( error ) {
      notify( error )
    } finally {
      setProfilePhotoUpdating(!profilePhotoUpdating)
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setProfileInfo(
      (prevInfo) => ({...prevInfo, [name] : value}) //Set the object keys dynamically based on the name of the input
    )
  }

  const handleClickFileInput = ()=> { //When clicked, this function trigegrs a click() on the input for the profile image 
    imageInput.current.click()
  }

  const handleRemoveProfileImage = async ()=> {
    try{
      setRemovingProflePic(!removingProflePic)

      const response = await axios.post(BACKEND_SERVER + "/users/deleteProfilePic.php", {
        headers : {
          "Authorization" : `Bearer ${jwt}`,
          'Content-Type'  : "Application-json"
        }
      })

      if( response.data?.status && response.data.status == 1 ){
        dispatch( removeProfilePicture() )
      } else {
        throw new Error( response.data.msg )
      }

    }catch( error ) {
      notify( error )
    } finally {
      setRemovingProflePic(!removingProflePic)
    }
  }

function notify(message){
  toast(message)
}

  return (
    <>    
      <div className='container-fluid overflow-y-auto' style={{ maxHeight: '78.5vh' }}>
          <div className='p-3 col-md-6 col-12 mx-auto border-start border-warning' style={{ backgroundColor : 'rgba(0,0,0,0.3)' }}>
          
          <h4 className="text-white">Update Profile</h4> <hr className="border border-secondary" />

          <img src={ BACKEND_SERVER + "/assets/profile/" + image ?? logo } className='d-block rounded mx-auto mb-2' alt="logo" style={{height: '120px'}}/>

          <div className="row mb-2">
            <div className="col-md-6">
              <button className="btn btn-primary btn-md w-100" onClick={ handleClickFileInput } disabled={ profilePhotoUpdating } title="Click to change your profile picture.">
                { profilePhotoUpdating && (
                  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                )}                
                <span role="status"> Change profile picture</span>               
              </button>
            </div>
            <div className="col-md-6">
              <button className="btn btn-secondary btn-md w-100" onClick={ handleRemoveProfileImage } title="Click to remove your profile picture." >Remove profile Picture</button>
            </div>
            <input type="file" className='d-none' ref={ imageInput } accept='image/*' onChange={ handleChangeProfilePicture } name="profileImageinput" id="profileImageinput" />
          </div>

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

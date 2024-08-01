import React, { useState } from 'react'
import axios from 'axios'
import { BACKEND_SERVER } from '../constants/constants'
import { clientTimeZone, formatDate } from '../utils/helpers'
import Cookies from 'js-cookie'
import { CustomToastContainer, toast } from '../utils/toastUtil'

export default function newBooking() {

    const [formData, setFormData] = useState({});
    const [newBookingLoading, setNewBookingLoading] = useState(false);

    const jwt = Cookies.get('authJWTToken'); //Auth Cookie 

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        setNewBookingLoading(!newBookingLoading); //Sets to true

        //Append the client localTimeZone to the formData 
        formData.timeZone = clientTimeZone();
        
        try {            
            const response = await axios.post(`${BACKEND_SERVER}/bookings/new-booking.php`, formData, {
                headers: {
                    'Authorization' : `Bearer ${jwt}`,
                    'Content-Type': 'Application/json'                   
                }
            }); 
            
            if(response.data?.status == 1) { //Success 
                toast(response.data.msg) //Success message

                //Reset the form data
                setFormData({});
            } else {
                throw new Error(`Caught Error: ${response.data.msg}`); //Error message from server
            }

        } catch (error) {
            toast(`Error caught: ${error.message}` || "Unknown error");
        }  finally{
            setNewBookingLoading(!newBookingLoading);
        }        
    }

    function handleChange(e) {
        const {name, value} = e.target
        setFormData( (prevData => ({...prevData, [name]:value})))
    }

  return (
    <>
        <div className="container-fluid h-100"> 
            <form action="#" method="post" onSubmit={ handleSubmit } className='border border-secondary col-md-9 mx-auto col-12 p-4'>
                <h5 className='text-white'>New Booking Details</h5> <hr className='border border-secondary' />

                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label htmlFor="name" className='text-white mb-3'>NAME</label>
                            <input type="text" onChange={ handleChange } value={formData.name || ""} className='form-control text-white bg-dark border border-secondary text-uppercase' name="name" id="name" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className='text-white mb-3'>PHONE NUMBER</label>
                            <input type="tel" onChange={ handleChange } value={ formData.phone || "" } className='form-control text-white bg-dark border border-secondary' name="phone" id="phone" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="location" className='text-white mb-3'>LOCATION</label>
                            <input type="text" onChange={ handleChange } value={ formData.location || "" } className='form-control text-white bg-dark border border-secondary' name="location" id="location" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="date" className='text-white mb-3'>DATE</label>
                            <input type="date" min={ formatDate(new Date()) } onChange={ handleChange } value={ formData.date || "" } className='form-control text-white bg-dark border border-secondary' name="date" id="date" required/>
                        </div>
                    </div>
                    <div className="col-6">                        
                        <div className="mb-3">
                            <label htmlFor="location" className='text-white mb-3'>AMOUNT</label>
                            <input type="number" min="0" onChange={ handleChange } value={ formData.amount || "" } className='form-control text-white bg-dark border border-secondary' name="amount" id="amount"/>                    
                        </div>
                        <div className="mb-3">
                            <label htmlFor="photographer" className='text-white mb-3'>PHOTOGRAPHER NAME</label>
                            <input type="text" onChange={ handleChange } value={ formData.photographer || "" } className='form-control text-white bg-dark border border-secondary' name="photographer" id="photographer" />
                        </div>
                        <div className="mb-3">
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" role="switch" id="reminderSwitch"required />
                                <label className="form-check-label text-white" htmlFor="reminderSwitch">Set Reminder</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="d-grid gap-2">
                    <button type='submit' className='btn btn-primary' disabled={ newBookingLoading }>
                        { newBookingLoading ?  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> 
                        : "Add new Booking" }    
                    </button>
                </div>
            </form>
        </div>

        <CustomToastContainer />
    </>
  )
}

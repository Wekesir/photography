import React, { useState } from 'react'
import axios from 'axios'
import { BACKEND_SERVER } from '../constants/constants'
import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'

export default function newBooking() {

    const [formData, setFormData] = useState({})
    const [newBookingLoading, setNewBookingLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault()
        setNewBookingLoading(!newBookingLoading)
        
        try {            
            const response = await axios.post(BACKEND_SERVER + "/bookings/new-booking.php", formData)

            if(response.data?.status && response.data.status == 1) { //Success 
                notify(response.data.msg) //Success message
            } else {
                notify(response.data.msg); //Error message from server
            }
            setNewBookingLoading(!newBookingLoading)
        } catch (error) {
            notify('Error: '+ error);
        }  finally{
            setNewBookingLoading(!newBookingLoading)
        }        
    }

    function handleChange(e) {
        const {name, value} = e.target
        setFormData( (prevData => ({...prevData, [name]:value})))
    }

    function notify(message){
        toast(message)
    }

  return (
    <>
        <div className="container-fluid">
            <form action="#" method="post" onSubmit={ handleSubmit } className='border border-secondary col-md-6 mx-auto col-12 p-4'>
                <h5 className='text-white'>New Booking Details</h5> <hr className='border border-secondary' />

                <div className="mb-3">
                    <label htmlFor="name" className='text-white mb-3'>NAME</label>
                    <input type="text" onChange={ handleChange } value={formData.name || ""} className='form-control text-white bg-dark border border-secondary text-uppercase' name="name" id="name" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className='text-white mb-3'>PHONE NUMBER</label>
                    <input type="tel" onChange={ handleChange } value={ formData.phone || "" } className='form-control text-white bg-dark border border-secondary' name="phone" id="phone" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="date" className='text-white mb-3'>DATE</label>
                    <input type="date" onChange={ handleChange } value={ formData.date || "" } className='form-control text-white bg-dark border border-secondary' name="date" id="date" required/>
                </div>
                <div className="d-grid gap-2">
                    <button type='submit' className='btn btn-primary' disabled={ newBookingLoading }>
                        { newBookingLoading ?  <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> 
                        : "Add new Booking" }    
                    </button>
                </div>
            </form>
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

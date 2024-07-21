import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import Loading from '../components/Loading'
import { formatDate } from '../utils/helpers'
import { BACKEND_SERVER } from '../constants/constants'
import { CustomToastContainer, toast } from '../utils/toastUtil'
import axios from 'axios'

export default function Bookings() {

    const [isLoading, setIsLoading] = useState(true);
    const [bookings, setBookings] = useState({}) //Holds all the booking objects from the database 
    const [currentPage, setCurrentPage] = useState(1);
    const [rescheduleLoading, setRescheduleLoading] = useState(false)
    const [rescheduleData, setRescheduleData] = useState({})

    const jwt = Cookies.get("authJWTToken")

    useEffect( ()=>{       
        fetchBookings()
    }, [])

    const handleRescheduleBookingInput = (event) => {
        //Add the input data dynamically 
        setRescheduleData({...rescheduleData, [event.target.name] : event.target.value })
    }

    const handleRescheduleSubmit = async (e)=>{
        e.preventDefault()

        try {
            
            const { data } = await axios.post(`${BACKEND_SERVER}/bookings/rescheduleBooking.php`, rescheduleData, {
                headers : {
                    'Authorization' : `Bearer ${jwt}`,
                    'Content-Type' : 'Application/json'                   
                }
            })

            if(data?.status === 1) { //Success  

                //Update the date in the array         
                setBookings( prevBookings => prevBookings.map( 
                    booking => booking.id === rescheduleData.bookingID ? {...booking, booking_date : rescheduleDateInput} : booking 
                )) 
                /**
                 * NOTE: The rescheduleDateInput used to update the date in the rescheduleData is the same as the ddate input name
                 *  When the input:date name changes then this will throw an error
                 * */         

                //Close the modal
                setRescheduleLoading(false)
                setRescheduleData({})

            } else {
                throw new Error(data.msg || "Unknown error occured")
            }
            
        } catch (error) {
            toast(`Error Caught: ${error.message}`)
        } 
    }

    const fetchNextPage = async ()=>{ //Fetches the next page 
        try {
            const { data } = await axios.get(`${BACKEND_SERVER}/bookings/fetch-bookings.php?page=${currentPage + 1}`, 
                {
                    headers : {
                        'Authorization' : `Bearer ${jwt}`,
                        'Content-Type' : 'Application-json',
                    }
                }            
            )

            if(data?.status === 1) {
                setBookings([...bookings, data.bookings]) //Update the already fetched bookings 
                setCurrentPage(currentPage + 1) //Update the current page number
            }

        } catch (error) {
            toast( `Caught Error: ${error.message}` )
        }
    }

    const fetchBookings =  async ()=> { //Runs when the component first mounts 
        try {                
            const { data } = await axios.get(`${BACKEND_SERVER}/bookings/bookings.php?page=${currentPage}`, {
                headers : {
                    'Authorization' : `Bearer ${jwt}`,
                    'Content-Type' : 'Application-json'
                }
            });

            if(data?.status === 1) { //Success 
                setBookings( data.bookings ); 
            } else { //error
                toast(data.msg)
            }
        } catch (error) {
            toast( `Caught Error: ${error}` )
        } finally {
            setIsLoading( false )
        }
    }


    async function handleDeleteBooking(event, bookingID) {
        event.preventDefault()

        try{
            //make Visible the spinner 
            event.target.querySelector("span.spinner-border").classList.remove("d-none")

            const tdElement =  event.target.closest("td")

            const { data } = await axios.post(`${BACKEND_SERVER}/bookings/deleteBooking.php`, {bookingID : bookingID}, {
                headers : {
                    'Authorization' : `Bearer ${jwt}`,
                    'Content-Type' : 'Application/json'
                }
            })
    
            if(data.status === 1) { //Success

                //Displey the success message
                toast(data.msg)

                //Hide the td element in whih the delete button has been clicked
               tdElement.classList.add("d-none")

                //Sort through the array of booking objects and remove the object whose id value matches bookingID
                setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingID))
            
    
            } else {
                throw new Error(data.msg || "Unknown error occured")
            }

        }catch( error ){
            toast(`Error Caught: ${error.message}`)
        }finally{
            //Hide the spinner 
            event.target.querySelector("span.spinner-border").classList.add("d-none")
        }

    }
      
    async function handleRescheduleBooking(event, bookingID) {
        event.preventDefault()

        //Show the spinner
        event.target.querySelector("span.spinner-border").classList.remove("d-none")

        //Add the booking id to the reschedule data
        setRescheduleData({...rescheduleData, bookingID : bookingID })

        //Select and display the modal from DOM
        const modal = new bootstrap.Modal(document.getElementById('rescheduleModal'))
        modal.show()       

    }


  return (
    <>
        <div className="container-fluid table-responsive">
            { isLoading ? (
                <Loading /> 
            ) : 
                !bookings || bookings.length === 0  ? (
                    <h5 className="text-white-50">No Bookings have been found!</h5>
                ) : (
                    <table className="table table-striped table-sm table-dark table-hover">
                    <thead>
                        <tr>
                        <th scope="col"></th>
                        <th scope="col">NAME</th>
                        <th scope="col">PHONE </th>
                        <th scope="col">LOCATION</th>
                        <th scope="col">AMOUNT</th>
                        <th scope="col">DATE</th>
                        <th scope="col">STATUS</th>
                        <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map( (booking, index) => (
                              <tr key={ index }> 
                                <th scope="row">{ index + 1 }</th>
                                <td> {booking.booking_name} </td>
                                <td> {booking.booking_phone} </td>
                                <td> {booking.booking_location} </td>
                                <td> {booking.booking_amount} </td>
                                <td> {booking.booking_date} </td>
                                <td> {booking.booking_status} </td>
                                <td>
                                    <div className="dropstart">
                                    <button className="btn btn-sm btn-outline-secondary text-white dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Actions 
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-dark">
                                        <li>
                                            <Link className="dropdown-item" to="#" onClick={ (event)=>{handleRescheduleBooking(event, booking.id)} } title="Reschedule this booking."> 
                                            <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span>
                                            <i className="bi bi-journal-arrow-up"></i> Reschedule 
                                            </Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" to="#" onClick={ (event)=>{handleDeleteBooking(event, booking.id)} } title='="Delete this booking'> 
                                            <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span>
                                                <i className="bi bi-trash"></i> Delete
                                            </Link>
                                            </li>
                                    </ul>
                                    </div>
                                </td>
                              </tr>
                            )
                        ) }
                    </tbody>
                    </table>                    
                )
            }

            {/* <Modal  */}
            <div className="modal fade" id="rescheduleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content bg-dark text-white">
                <div className="modal-header border border-secondary">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Reschedule Booking</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body border border-secondary">
                    <form action="#" onSubmit={handleRescheduleSubmit} method="post" id="rescheduleForm">
                        <div className="mb-3">
                            <label for="rescheduleData" className="form-label">New Booking Date</label>
                            <input type="date" onChange={handleRescheduleBookingInput} value={rescheduleData.rescheduleDateInput || ""} min={ formatDate(new Date()) } className="form-control text-white bg-dark border border-secondary" id="rescheduleDateInput" name="rescheduleDateInput" required />
                        </div>
                        <button type="submit"  className="btn btn-primary btn-md" disabled={ rescheduleLoading }>
                            {rescheduleLoading && (<span className="spinner-border spinner-border-sm" aria-hidden="true"></span>)} Reschedule Booking
                        </button>
                    </form>
                </div>
                <div className="modal-footer border border-secondary">
                    <button type="button" className="btn btn-secondary btn-md px-3" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        </div>
        
        <CustomToastContainer />
    </>
  )
}

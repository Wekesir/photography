import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading';
import { BACKEND_SERVER, JWT_TOKEN } from '../constants/constants'
import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import axios from 'axios';

export default function Bookings() {

    const [isLoading, setIsLoading] = useState(true);
    const [bookings, setBookings] = useState({});

    function notify(message){
        toast(message)
    }

    useEffect( ()=>{
        const fetchBookings =  async ()=> {
            try {                
                const response = await axios.get(BACKEND_SERVER + "/bookings/fetch-bookings.php", {
                    headers : {
                        'Authorization' : `Bearer ${JWT_TOKEN}`,
                        'Content-Type' : 'Application-json'
                    }
                });
    
                if(response.data?.status && response.data.status == 1) { //Success 
                    setBookings( response.data.bookings )
                } else { //error
                    notify(response.data.msg)
                }
            } catch (error) {
                notify(error)
            } finally {
                setIsLoading( false )
            }
        }

        fetchBookings();
    })

  return (
    <>
        <div className="container-fluid">
            { isLoading ? (
                <Loading /> 
            ) : 
                !bookings || bookings.length === 0  ? (
                    <h5 className="text-white-50">No Bookings have been found!</h5>
                ) : (
                    <table className="table table-striped table-sm table-dark table-hover">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">CLIENT NAME</th>
                        <th scope="col">PHONE NUMBER</th>
                        <th scope="col">DATE</th>
                        <th scope="col">BOOKING STATUS</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                    </table>
                )
            }
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

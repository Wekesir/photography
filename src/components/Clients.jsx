import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'

export default function Clients() {
    
const [clients, setClients] = useState([]);

useEffect(()=>{
    axios.get("http://localhost:80/photography_api/clients/getClientsList.php")
        .then((response)=>{
            console.log(response.data); //Data from the console
            setClients(response.data)
            
        }).catch((error) => {
                notify(error);     
        });
}, [])

function notify(message){
    toast(message)
}

  return (
    <>
        <table className="table table-striped table-sm table-dark table-hover">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">IMAGE</th>
            <th scope="col">CLIENT NAME</th>
            <th scope="col">PHONE NUMBER</th>
            <th scope="col">EMAIL ADDRESS</th>
            <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
            {clients.map((client, index)=>(
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className='text-center'><i class="bi bi-person-circle"></i></td>
                    <td>{ client.client_name }</td>
                    <td>{ client.client_phone }</td>
                    <td>{ client.client_email }</td>
                    <td>
                        <button className="btn btn-sm btn-secondary me-2" title="Click to edit client information"><i class="bi bi-pencil-fill"></i> edit</button>
                        <button className="btn btn-sm btn-secondary" title="Click to delete client."><i class="bi bi-trash3-fill"></i> delete</button>
                    </td>
                </tr>
            ))}               
           
        </tbody>
        </table>

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

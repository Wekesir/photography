import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Loading from './Loading'
import { BACKEND_SERVER } from '../constants/constants'
import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'

export default function Clients() {
    
const [clients, setClients] = useState([])
const [isLoading, setIsLoading] = useState(true)

const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    email: '',
    id : ''
  });

useEffect(()=>{
    axios.get(BACKEND_SERVER + "/clients/getClientsList.php")
        .then((response)=>{
            setIsLoading(false)
            setClients(response.data)
            
        }).catch((error) => {
            notify(error);      
        });
}, [])

function notify(message){
    toast(message)
}

function handleEdit(event, client){
    event.target.querySelector(".spinner-border").classList.remove("d-none") 
    event.target.setAttribute("disabled", "")

    //Display Modal
    setFormData((previousData)=>({
       ...previousData,
       
        username: client.client_name,
        phoneNumber: client.client_phone,
        email: client.client_email,
        id : client.client_id
       
    })); 

    //Bootstrap Instance 
    const editModal = new bootstrap.Modal(document.getElementById('editUsermodal'))
    editModal.show()

    event.target.querySelector(".spinner-border").classList.add("d-none")
    event.target.removeAttribute("disabled")
}

function handleDelete(event, client){
    //Display the spinner
    event.target.querySelector(".spinner-border").classList.remove("d-none")
    event.target.setAttribute("disabled", "")

    //send the data to the deleting php file 
    axios.post(BACKEND_SERVER + '/clients/deleteClient.php', client)
        .then((res) => {

            if (res.data.status == 1){
                let newArr = clients.filter((item) => item !== client);
                setClients(newArr);
                notify(res.data.msg)
            }else{
                notify(res.data.msg)
            }  

            event.target.querySelector(".spinner-border").classList.add("d-none")
            event.target.removeAttribute("disabled")

        }).catch(error => {
            notify(error)
        })
        
}

function handleChange(event){
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
}

function handleSubmit(e){
    e.preventDefault();

    const spinner = e.target.querySelector(".spinner-border")

    spinner.classList.remove("d-none");

    axios.post(BACKEND_SERVER + "/clients/editClient.php", formData)
    .then((response)=>{
        
        if (response.data?.status && response.data.status === 1){

             //After the update has happened, we find the  element in our array and replace it with the data
             const clientToUpdate = clients.find((client)=> client.client_id === formData.id)

             if(clientToUpdate){
                clientToUpdate.client_name = formData.username,
                clientToUpdate.client_phone = formData.phoneNumber,
                clientToUpdate.client_email = formData.email

                //Update the clients in object 
                setClients([...clients]) //Triggers re-render                
             } else {
                notify("The client to be updated could not be found.")
             }

            notify(response.data.msg);
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
    <>
        { isLoading ? (
            <Loading />
        ) : (

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
                    <td className='text-center'><i className="bi bi-person-circle"></i></td>
                    <td>{ client.client_name }</td>
                    <td>{ client.client_phone }</td>
                    <td>{ client.client_email }</td>
                    <td>
                        <button className="btn btn-sm btn-secondary me-2" title="Click to edit client information" onClick={ (event)=>handleEdit(event, client) }><i className="bi bi-pencil-fill"></i> edit  <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span></button>
                        <button className="btn btn-sm btn-secondary" title="Click to delete client." onClick={ (event)=>handleDelete(event, client) }><i className="bi bi-trash3-fill"></i> delete  <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span></button>
                    </td>
                </tr>
            ))}               
           
        </tbody>
        </table>
        )}

        
        <div className="modal fade" id="editUsermodal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark">
            <div className="modal-header text-white border-bottom border-secondary">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Edit Client Information</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body border-bottom border-secondary">
                <form className='p-4' method='post' onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-primary"> <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span> Edit Client Info</button>
                    </div>           
                </form>
            </div>
            <div className="modal-footer border-top border-secondary">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
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
    </>
  )
}

import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading'
import AddClient from './AddClient';

import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'
import { BACKEND_SERVER } from '../constants/constants'
import { handleDownloadFolder } from '../utils/helpers'

export default function Projects() {

    const [folders, setFolders] = useState([])
    const [selectedRenameFolder, setSelectedRenameFolder] = useState([]) //Holds the folder we want to rename 
    const [isLoading, setIsLoading] = useState(true)
    const [selectedShareFolder, setSelectedShareFolder] = useState([]) //Holds the fodler that access is to be shared 
    const [clients, setClients] = useState([]) //Clients registered in the database 
    const [selectedClients, setSelectedClients] = useState([]) //Cients who will have access to the project

    const navigate = useNavigate();

    //Fetch all the folders in the database 
    useEffect(()=>{
        axios.get(BACKEND_SERVER + "/projects/fetch-projects.php")
          .then(response=>{ 
    
            if(response.data?.status && response.data.status == 0){
              notify(response.data.msg)
            } else { 
                setIsLoading(false)
                setFolders( response.data.folders )  
            }
    
          })
          .catch(error=>{
            notify("Error: " + error)
          }) 
    }, [])

    useEffect(()=>{
        axios.get(BACKEND_SERVER + "/clients/getClientsList.php")
            .then((response)=>{
                setClients(response.data)                
            }).catch((error) => {
                notify(error);      
            });
    }, [])

    function notify(message){
        toast(message)
    }

    function handleDelete(event, deleteId){
        event.preventDefault();
        //Check if the folder id has been provided
        if(!deleteId){
            notify("The Folder Id is missing, delete action can not be executed ")
        } else {
            const spinner = event.target.querySelector("span")
            spinner.classList.toggle("d-none")

            axios.post(BACKEND_SERVER + '/projects/delete-project.php', {PROJECT_ID : deleteId})
                .then(response => { 
                    notify(response.data.msg)
                    spinner.classList.toggle("d-none")

                    //if it was a success
                    if(response.data?.status && response.data.status == 1){
                        //Hide the project just to prevent reloading the component 
                        const folderContainer = event.target.closest('div.folderContainer')

                        if (folderContainer){
                            folderContainer.classList.add("d-none")
                        }
                    }
                })
                .catch(error =>  { 
                    notify('Error: ' + error)
                })
        }
    }

    function handleEdit(event, folderDetails){ 
        event.preventDefault()

        const modal = new bootstrap.Modal(document.getElementById("editProjectNameModal")) //an instance of the modal
        modal.show()

        //Set the selected folder in the state
        setSelectedRenameFolder( folderDetails )
        console.log(folderDetails)
    }

    function handleRenameInput(event){
        setSelectedRenameFolder({...selectedRenameFolder, project_name : event.target.value}) //Updates the project name 
    }

    function handleRenameSubmit(e) {
        //activate the spinner
        e.target.querySelector("span.spinner-border").classList.remove("d-none")

        axios.post("http://localhost:80/photography_api/projects/rename-project.php", selectedRenameFolder)
            .then(response => {
                if (response.data.status === 1 && response.data?.status){
                    //Loop through all the available folder in the folders state
                    const newFolders = folders.map(folder => {
                        return folder.project_id == selectedRenameFolder.project_id ? { ...folder, project_name: selectedRenameFolder.project_name } : folder
                    })  

                    setFolders(newFolders)                  
                }

                notify(response.data.msg) //Display the reponse mesage 
            })
            .catch(error => {
                notify("Error: " + error)
            })

        //Hide the spinner
        e.target.querySelector("span.spinner-border").classList.add("d-none")
    }

    function handleOpen(e, folderDetails){
        navigate(`/proj/${folderDetails.project_id}/${folderDetails.project_name}`)
    }

    function handleShareProject(folderDetails) {
        //create an instance of the modal and show the modal
        const projectModal = new bootstrap.Modal(document.getElementById('shareProjectModal'))

        setSelectedShareFolder(folderDetails)

        projectModal.show()       
    }

    function handleSelectClient(clientDetails) {
        const newEmail = clientDetails.client_email;
      
        // Check if the email already exists in selectedClients
        if (!selectedClients.includes(newEmail)) {
          setSelectedClients([...selectedClients, newEmail]);
        } else {
          notify(`Email ${newEmail} already selected.`)         
        }
    }

    function handleRemoveSelectedClient(clientEmail) {
        const newArr = selectedClients.filter((email)=>{ return email !== clientEmail})
        setSelectedClients(newArr)
    }
      
    function handleSubmitSelectedClients() {
        if(!selectedClients.length) {
            notify("No clients have been selected. Add a client and try again")
        }   else {
            axios.post(BACKEND_SERVER + "/projects/share-folder.php", {FOLDER : selectedShareFolder, CLIENTS : selectedClients})
                .then(response => {

                })
                .catch(error => {
                    notify(error)
                })
        }
    }

  return (
    <>
        <div className="container-fluid py-2">
            { isLoading ? (
                <Loading />
            ) : (
                <div className="row">
                    {folders.map((folder, index) => {
                        return(
                            <div className="col-md-4 border border-secondary p-2 folderContainer" key={ index }>
                                <div className="row text-white">
                                    <div className="col-md-2 text-center"> <i className="bi bi-folder-fill"></i> </div>
                                    <div className="col-md-7 text-truncate"> {folder.project_name} </div>
                                    <div className="col-md-3 text-center">
                                        <div className="dropdown">
                                            <button className="btn btn-sm btn-default text-white btn-outline-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical fw-bold"></i>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-dark">
                                                <li onClick={ (event)=>{ handleOpen(event, folder) } }><Link className="dropdown-item" to="#"><i className="bi bi-folder2-open"></i> &nbsp; Open</Link></li>
                                                <li onClick={ ()=>{handleDownloadFolder(folder)} }><Link className="dropdown-item" to="#"><i className="bi bi-download"></i> &nbsp; Download</Link></li>
                                                <li onClick={ (event)=>{handleEdit(event, folder)}}><Link className="dropdown-item" to="#"><i className="bi bi-pencil"></i> &nbsp; Rename</Link></li>
                                                <li onClick={ ()=>{handleShareProject(folder)} }><Link className="dropdown-item" to="#"><i className="bi bi-share"></i> &nbsp; Share</Link></li>
                                                <li onClick= { (event)=>{handleDelete(event, folder.project_id)}}><Link className="dropdown-item" to="#"><i className="bi bi-trash"></i> &nbsp; Delete &nbsp; <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"> </span> </Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>

        <div className="modal fade" id="shareProjectModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xl modal-dialog-scrollable">
            <div className="modal-content bg-dark text-white" style={{ minHeight: '90vh' }}>
            <div className="modal-header border-bottom border-secondary">
                <h1 className="modal-title fs-5" id="staticBackdropLabel"><i className="bi bi-share-fill"></i> &nbsp; { selectedShareFolder.project_name } </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="row">
                    <div className="col-6">
                        <ul className="nav nav-tabs border-bottom border-secondary" style={{ whiteSpace : 'nowrap', width:'100%' }} id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active btn btn-sm btn-secondary text-white" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">New Clients</button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link btn btn-sm btn-secondary text-white" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Existing Client</button>
                            </li>                       
                        </ul>
                        <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                            <AddClient widthClass="col-12"/>
                        </div>
                        <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                            { !clients.length ? (
                                <h5 className="text-center">No Clients found in the database.</h5>
                            ) : (

                            <table className="table table-sm table-dark table-striped">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">NAME</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>                       
                                {clients.map((client, index) => (
                                    <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{client.client_name}</td>
                                    <td>{client.client_email}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary" onClick={ ()=>{handleSelectClient(client)} }>select</button>
                                    </td>
                                    </tr>
                                ))}                    
                            </tbody>
                            </table>

                            ) }
                            
                        </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <h6>Selected Clients</h6> <hr className='border border-secondary' />

                        { !selectedClients.length ? (
                            <h5 className="text-secondary text-center"> No clients have been selected yet. </h5>
                        ) : (

                        <table className="table table-sm table-dark table-striped">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">EMAIL</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>                       
                            {selectedClients.map((selectedClient, index) => (
                                <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{selectedClient}</td>
                                <td>
                                    <button className="btn btn-sm btn-danger text-white" onClick={ ()=>{handleRemoveSelectedClient(selectedClient)} }>Remove</button>
                                </td>
                                </tr>
                            ))}                    
                        </tbody>
                        </table>

                        )}
                    </div>
                </div>
            </div>
            <div className="modal-footer border-top border-secondary">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={ handleSubmitSelectedClients }>Understood</button>
            </div>
            </div>
        </div>
        </div>

        <div className="modal fade" id="editProjectNameModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
            <div className="modal-header  border-bottom border-secondary">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">Rename </h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <div className="my-3">
                    <label htmlFor="" className="text-white fw-bold mb-2">FOLDER NAME</label>
                    <input type="text" onChange={ handleRenameInput } className="form-control border border-secondary bg-dark text-white text-uppercase" name="foldername" id="foldername" value={ selectedRenameFolder.project_name || "" }/>
                </div>
            </div>
            <div className="modal-footer border-top border-secondary">
                <button className="btn btn-secondary" onClick={ handleRenameSubmit } type="button">
                    <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span>
                    <span role="status"> Rename folder</span>
                </button>
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

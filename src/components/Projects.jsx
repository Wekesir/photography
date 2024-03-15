import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'

export default function Projects() {

    const [folders, setFolders] = useState([])
    const [selectedRenameFolder, setSelectedRenameFolder] = useState([]) //Holds the folder we want to rename 

    const navigate = useNavigate();


    //Fetch all the folders in the database 
    useEffect(()=>{
        axios.get("http://localhost:80/photography_api/projects/fetch-projects.php")
          .then(response=>{ 
    
            if(response.data?.status && response.data.status == 0){
              notify(response.data.msg)
            } else { 
                setFolders( response.data.folders )  
            }
    
          })
          .catch(error=>{
            notify("Error: " + error)
          }) 
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

            axios.post('http://localhost:80/photography_api/projects/delete-project.php', {PROJECT_ID : deleteId})
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
            .catch(error =>  { console.log(error)
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

  return (
    <>
        <div className="container-fluid py-2">
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
                                            <li><Link className="dropdown-item" to="#"><i className="bi bi-download"></i> &nbsp; Download</Link></li>
                                            <li onClick={ (event)=>{handleEdit(event, folder)}}><Link className="dropdown-item" to="#"><i className="bi bi-pencil"></i> &nbsp; Rename</Link></li>
                                            <li><Link className="dropdown-item" to="#"><i className="bi bi-share"></i> &nbsp; Share</Link></li>
                                            <li onClick= { (event)=>{handleDelete(event, folder.project_id)}}><Link className="dropdown-item" to="#"><i className="bi bi-trash"></i> &nbsp; Delete &nbsp; <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"> </span> </Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
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

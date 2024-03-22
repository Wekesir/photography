import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/sidenav.css'
import axios from 'axios'
import { BACKEND_SERVER } from '../constants/constants'

import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'


export default function Sidenav() {
  const [activeDropdown, setActiveDropdown] = useState(null) //Sets the active dropdoown 
  const [selectedFiles, setSelectedFiles ] = useState([]) //Holds the image files selected for upload
  const [uploadFolder, setUploadFolder] = useState("") //Holds the folder to which we'll upload the files
  const [existingFolders, setExistingFolder] = useState([]) //Holds the folders already in the db

  const fileinput = document.getElementById("selectFileInput")
  const foldersToggleDiv = document.getElementById('foldersDropdown')
  const uploadingSpinner = document.querySelector("#uploadingSpinner") 
 
  const toggleDropdown = (index) => {
    setActiveDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  const isDropdownActive = (index) => activeDropdown === index

  function handleFileInput(){  
   
    if(fileinput){
      // Check if the input has the webkitdirectory and directory attributes 

      if(fileinput.hasAttribute("webkitdirectory") && fileinput.hasAttribute("directory")){
        fileinput.removeAttribute("webkitdirectory")
        fileinput.removeAttribute("directory")
      }

      fileinput.click();
    }
  }

  function handleFolderInput(){
    /**
     * For the fodler input we have to add two attrubites to the file input 
     * webkitdirectory to enable folder/directory selection
     * directory for older browsers that do not support webkitdirectory
     * */

    if(fileinput){
      fileinput.setAttribute('webkitdirectory', true)
      fileinput.setAttribute("directory",true)
      
      fileinput.click();
    }
  }

  function handleSelectedFiles(event){
    const files = event.target.files
    setSelectedFiles([...selectedFiles, ...files])

    //Toggle the modal visibility to show thr selected files
    const filesmodal = new bootstrap.Modal(document.querySelector("#selectedFilesModal"))
    filesmodal.show()
  }

  function handleUploadFolderInput(event){
    setUploadFolder(event.target.value)

    //Hide the folders toggle
    foldersToggleDiv.classList.add("d-none") 
  }

  function handleSelectToggleFolder(event){
    setUploadFolder(event.target.value);

     //Hide the folders toggle
     foldersToggleDiv.classList.add("d-none")
  }

  function getFileNameExtension(filename){
    const parts = filename.split(".")
    return (parts.length > 1) ? parts[1].toLowerCase() : ""
  }

  function notify(message){
      toast(message);
  }

  function handleToggleFoldersList(){
    foldersToggleDiv.classList.contains("d-none") ? foldersToggleDiv.classList.remove("d-none") : foldersToggleDiv.classList.add("d-none") 
  }

  function handleFilesSubmit(event){ //When the upload files has been clicked 
    /**
     * Before this executes, check to make sure
     * Files have been provided
     * Selected folder is not empty
     */
    event.target.setAttribute("disabled", true)
    uploadingSpinner.classList.toggle("d-none") //Display the spinner

    if(!selectedFiles.length || !uploadFolder){
      notify("A fodler and at least one file MUST be provided to proceed")
    } else { 
      //Create a formData object and append all the image files 
      const formData = new FormData()

      for(let x=0; x<selectedFiles.length; x++){
        formData.append("selectFiles[]", selectedFiles[x])
      }

      //Append the folder name too
      formData.append('folder', uploadFolder)
      
      //Make an axios post request
      axios.post(BACKEND_SERVER + "/files/upload_files.php", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res)=>{        
        
        notify(res.data.msg)
  
      }).catch((error) => {
        notify(error) 
      })
    }

    event.target.removeAttribute("disabled")
    uploadingSpinner.classList.toggle("d-none") //Hide the spinner 
  }

  //Fetch the folders that are already in the database 
  useEffect(()=>{
    axios.get(BACKEND_SERVER + "/projects/fetch-projects.php")
      .then(response=>{ 

        if(response.data?.status && response.data.status == 0){
          notify(response.data.msg)
        } else { 
          setExistingFolder(response.data.folders) 
        }

      })
      .catch(error=>{
        notify("Error: " + error)
      }) 
  }, [])

  //Clear selected lists when the modal has been clicked
  useEffect(()=>{
    const modalElement = document.querySelector("#selectedFilesModal")
    if(modalElement){
      modalElement.addEventListener('hidden.bs.modal', (event) => { 
        setSelectedFiles([])
      }) 
    }
  }, [])
  


  return (
    <div className='conteiner-fluid overflow-y-auto' style={{backgroundColor: 'rgba(0,0,0,.5)', height: '84vh'}}>
        <div className="dropdown text-white m-2 d-grid gap-2"> 
          <button className="btn btn-secondary dropdown-toggle" type="button" title="Upload new file(s) or folder." data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-folder-plus"></i> &nbsp; New Project
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li className="my-0" onClick={ handleFileInput }><Link className="dropdown-item" to="#"><i className="bi bi-file-earmark-arrow-up-fill"></i> &nbsp;  Upload new File(s)</Link></li>
            <li className="my-0" onClick={ handleFolderInput }><Link className="dropdown-item" to="#"><i className="bi bi-folder-fill"></i> &nbsp; Upload new folder</Link></li>
          </ul>
          <input type="file" className="d-none" id="selectFileInput" onChange={ handleSelectedFiles } accept='image/*, video/*' multiple/>
      </div>
      <ul className="my-4 ps-1">
        <li className={`mainmenu ${isDropdownActive(0) ? 'active' : ''}`} onClick={ ()=>toggleDropdown(0) }><i className="bi bi-folder-fill"></i> &nbsp;  <Link to="/projects" className="text-decoration-none text-white">Projects</Link> </li>
        <li className={`mainmenu ${isDropdownActive(1) ? 'active' : ''}`} onClick={ ()=>toggleDropdown(1) }><i className="bi bi-journals"></i> &nbsp; Bookings <i className="bi bi-caret-down-fill float-end"></i>
          <ul className={`mainmenu-dropdown ${isDropdownActive(1) ? '' : 'd-none'}`}>
            <li> <Link to="/newbooking" className='text-decoration-none  text-white'> <i className="bi bi-journal-plus"></i> New Booking </Link> </li>
            <li> <Link to="/bookings" className='text-decoration-none  text-white'> <i className="bi bi-journals"></i> Booking </Link> </li>
          </ul>
        </li>
        <li className={`mainmenu ${isDropdownActive(2) ? 'active' : ''}`} onClick={ ()=>toggleDropdown(2) }> <i className="bi bi-person-lines-fill"></i> &nbsp; Clients  <i className="bi bi-caret-down-fill float-end"></i>
            <ul className={`mainmenu-dropdown ${isDropdownActive(2) ? '' : 'd-none'}`}>
              <li> <Link to="/newClient" className='text-decoration-none  text-white'> <i className="bi bi-person-plus-fill"></i> Add new Clients </Link> </li>
              <li> <Link to="/clients" className='text-decoration-none text-white'> <i className="bi bi-person-lines-fill"></i> Clients List </Link> </li>
            </ul>
        </li>
        <li className={`mainmenu ${isDropdownActive(3) ? 'active' : ''}`} onClick={ ()=>toggleDropdown(3) }><i className="bi bi-tools"></i> &nbsp; Resource Management <i className="bi bi-caret-down-fill float-end"></i>
            <ul className={`mainmenu-dropdown ${isDropdownActive(3) ? '' : 'd-none'}`} >
              <li> <i className="bi bi-camera-fill"></i> Add new Items</li>
              <li><i className="bi bi-tools"></i> Items</li>
            </ul>
        </li> 
      </ul> 

      <div className="modal fade" id="selectedFilesModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header border-bottom border-secondary">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Selected files(s)</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body"> 
            
            <h6 className="mb-2 text-light">Add a folder to upload files to.</h6>
            <div className="input-group mt-2 mb-4">            
                <input type="text" name="foldername" id="foldername" onChange={ handleUploadFolderInput } value={ uploadFolder } className="form-control me-2 bg-dark text-white text-uppercase border border-secondary" />
                <button className="btn btn-secondary" type="button" id="button-addon2" onClick={ handleToggleFoldersList }><i className="bi bi-folder-plus"></i> &nbsp; Choose existing folder</button>
            </div>
            <div className="mb-4 mt-2 d-none" id="foldersDropdown">    
                <label className="text-info mb-2">Select from folder list</label>        
                <select className="form-select me-2 bg-dark text-white border border-secondary" onChange={ handleSelectToggleFolder } aria-label="Default select example">
                  <option value=""></option>
                  {existingFolders.map((folder, index) => {
                    return (
                      <option value={ folder.project_name } key={ index }> { folder.project_name } </option>
                    )
                  })}
                </select>
            </div>

            <table className="table table-sm table-dark table-striped table-borderless">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">IMAGE</th>
                  <th scope="col">.ext</th>
                </tr>
              </thead>
              <tbody>
                {selectedFiles.map((file, index) => {                
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{file.name}</td> 
                      <td>{getFileNameExtension(file.name)}</td>                   
                    </tr>
                  );
                })}        
              </tbody>
            </table>
            </div>
            <div className="modal-footer border-top border-secondary">
              <button className="btn btn-default text-white me-aut d-none" type="button" id="uploadingSpinner">
                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> &nbsp;
                <span className="" role="status">Uploading Files...</span>
              </button>
              <button type="button" className="btn btn-primary px-3" onClick={ handleFilesSubmit }><i className="bi bi-cloud-arrow-up-fill"></i> Upload </button>
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

    </div> 
  )
}

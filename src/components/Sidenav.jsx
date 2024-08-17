import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/sidenav.css'
import axios from 'axios'
import { BACKEND_SERVER } from '../constants/constants'
import { CustomToastContainer, toast } from '../utils/toastUtil'
import { getFileNameExtension } from '../utils/helpers'
import Cookies from 'js-cookie'

export default function Sidenav() {
  const [activeDropdown, setActiveDropdown] = useState(null) //Sets the active dropdoown 
  const [selectedFiles, setSelectedFiles ] = useState([]) //Holds the image files selected for upload
  const [uploadFolder, setUploadFolder] = useState("") //Holds the folder to which we'll upload the files
  const [existingFolders, setExistingFolder] = useState([]) //Holds the folders already in the db
  const [isUploadingFiles, setIsUploadingFiles] = useState(false)

  const fileinputRef  = useRef();
  const foldersToggleDivRef = useRef()
 
  const toggleDropdown = (index) => {
    setActiveDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  const isDropdownActive = (index) => activeDropdown === index

  function handleFileInput(){ 
   
    if(fileinputRef.current){ 
      // Check if the input has the webkitdirectory and directory attributes 

      if(fileinputRef.current.hasAttribute("webkitdirectory") && fileinputRef.current.hasAttribute("directory")){
        fileinputRef.current.removeAttribute("webkitdirectory")
        fileinputRef.current.removeAttribute("directory")
      }

      fileinputRef.current.click();
    }
  }

  function handleFolderInput(){
    /**
     * For the fodler input we have to add two attrubites to the file input 
     * webkitdirectory to enable folder/directory selection
     * directory for older browsers that do not support webkitdirectory
     * */

    if(fileinputRef.current){
      fileinputRef.current.setAttribute('webkitdirectory', true)
      fileinputRef.current.setAttribute("directory",true)
      
      fileinputRef.current.click();
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
    foldersToggleDivRef.current.classList.add("d-none") 
  }

  function handleSelectToggleFolder(event){
    setUploadFolder(event.target.value);

     //Hide the folders toggle
     foldersToggleDivRef.current.classList.add("d-none")
  }



  function handleToggleFoldersList(){
    foldersToggleDivRef.current.classList.contains("d-none") ? foldersToggleDivRef.current.classList.remove("d-none") : foldersToggleDivRef.current.classList.add("d-none") 
  }

  async function handleFilesSubmit(){ //When the upload files has been clicked 
    try {
      setIsUploadingFiles(!isUploadingFiles)
  
      if(!selectedFiles.length || !uploadFolder){
        throw new Error("A folder and at least one file MUST be provided to proceed")
      } 

      //Create a formData object and append all the image files 
      const formData = new FormData()

      for(let x=0; x<selectedFiles.length; x++){
        formData.append("selectFiles[]", selectedFiles[x])
      }

      //Append the folder name too
      formData.append('folder', uploadFolder)
      
      //Make an axios post request
      const response = await axios.post(`${BACKEND_SERVER}/files/upload_files.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })     
      if(response.data?.status === 0) {
        throw new Error(response.data.msg)
      }     
      toast("File(s) uploaded successfully!") //Show success message
    } catch (error) {
      toast(`Caught Error: ${error.message}`);
    } finally {
      setIsUploadingFiles(!isUploadingFiles)
    }
  }

  //Fetch the folders that are already in the database 
  useEffect(()=>{
    const fetchFolders = async () => {
      try {        
        const jwtToken = Cookies.get("authJWTToken")
        if(!jwtToken) {
          throw new Error("JWT Token could not be found")
        }

        const response = await axios.get(`${BACKEND_SERVER}/projects/fetch-projects.php`, {
          headers : {
            Authorization : `Bearer ${jwtToken}`,
            'Content-Type' : 'application/json'
          }
        }); 
    
        if(response.data?.status == 0){ //When there is an error trying to fetch existing folders
          throw new Error(response.data.msg)
        } 
        setExistingFolder(response.data.folders);          
      } catch (error) {
        toast(`caught Error: ${error.message}`)
      } 
    }

    fetchFolders();
  }, [])

  //Clear selected lists when the modal has been clicked
  useEffect(()=>{
    const modalElement = document.querySelector("#selectedFilesModal")
    if(modalElement){
      modalElement.addEventListener('hidden.bs.modal', () => { 
        setSelectedFiles([])
      }) 
    }
  }, [])

  return (
    <div className='container-fluid overflow-y-auto sidenav' style={{backgroundColor: 'rgba(0,0,0,.5)', minHeight: '84vh'}}>
        <div className="dropdown text-white m-2 d-grid gap-2"> 
          <button className="btn btn-secondary dropdown-toggle" type="button" title="Upload new file(s) or folder." data-bs-toggle="dropdown" aria-expanded="false">
          <i className="bi bi-folder-plus"></i> &nbsp; New Project
          </button>
          <ul className="dropdown-menu dropdown-menu-dark">
            <li className="my-0" onClick={ handleFileInput }><Link className="dropdown-item" to="#"><i className="bi bi-file-earmark-arrow-up-fill"></i> &nbsp;  Upload new File(s)</Link></li>
            <li className="my-0" onClick={ handleFolderInput }><Link className="dropdown-item" to="#"><i className="bi bi-folder-fill"></i> &nbsp; Upload new folder</Link></li>
          </ul>
          <input type="file" className="d-none" ref ={fileinputRef} onChange={ handleSelectedFiles } accept='image/*, video/*' multiple/>
      </div>
      <ul className="my-4 ps-1">
        <li className={`mainmenu ${isDropdownActive(0) ? 'active' : ''}`} onClick={ ()=>toggleDropdown(0) }><i className="bi bi-folder-fill"></i> &nbsp;  <Link to="/projects" className="text-decoration-none text-white">Projects</Link> </li>
        <li className={`mainmenu ${isDropdownActive(1) ? 'active' : ''}`} onClick={ ()=>toggleDropdown(1) }><i className="bi bi-journals"></i> &nbsp; Bookings <i className="bi bi-caret-down-fill float-end"></i>
          <ul className={`mainmenu-dropdown ${isDropdownActive(1) ? '' : 'd-none'}`}>
            <li> <Link to="/newbooking" className='text-decoration-none  text-white'> <i className="bi bi-journal-plus"></i> New Booking </Link> </li>
            <li> <Link to="/bookings" className='text-decoration-none  text-white'> <i className="bi bi-journals"></i> Bookings </Link> </li>
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
            <div className="mb-4 mt-2 d-none" ref={foldersToggleDivRef}>    
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
              <button type="button" className="btn btn-primary px-3" onClick={ handleFilesSubmit } disabled={ isUploadingFiles }>
                <i className="bi bi-cloud-arrow-up-fill"></i>  
                  Upload File(s). &nbsp;
                  {isUploadingFiles && (
                     <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> 
                  )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <CustomToastContainer />
    </div> 
  )
}

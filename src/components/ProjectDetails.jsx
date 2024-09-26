import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_SERVER } from '../constants/constants'
import { getRealFileName, handleDownloadFile , getFileNameExtension} from '../utils/helpers'
import { CustomToastContainer, toast} from '../utils/toastUtil'
import Loading from './Loading'

export default function ProjectDetails() {

    const { id, folder } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [files, setFiles] = useState([])


    //Check to make sure the parameters have been provided
   // Define the function outside of the condition
    async function getFolderFiles(id) {
        try {
            const response = await axios.post(`${BACKEND_SERVER}/files/get-folder-files.php`, { FOLDER_ID : id });

            if(response.data?.status === 1){ 
                setFiles(response.data.files);
                setIsLoading(false);
                return true;
            } else {
                throw new Error(response.data.msg);
            }
        } catch (error) {
            toast(error || "Unknown error trying to fetch files in folder.");
            return false;
        }
    }
    
    // Use the function inside the condition
    if(id && id > 0 && folder){
        useEffect(() => {
            const success = getFolderFiles(id);
            if (!success) {
                toast('Failed to get folder files');
            }
        }, []);
    } else {
        navigate("/projects");
    }

    async function handleDelete(event, file) { 
        //Find the span.spinner-border and remove the d-none
        event.target.querySelector("span.spinner-border").classList.remove("d-none")

        try {            
            //make an axios post too delete-file.php
            const response = await axios.post(`${BACKEND_SERVER}/files/delete-file.php`, file)           
    
            if(response.data?.status == 1) {
                //Loop through all the files and remove the deleted file 
                let newFiles = files.filter(f => f.filename != file.filename)
                setFiles(newFiles)
                toast(response.data.msg)
    
            } else {
                throw new Error(response.data.msg)
            }          
        } catch (error) {
            toast( error || "Unknown error has been caught.")
        } finally {
            //Hide the spinner
            event.target.querySelector("span.spinner-border").classList.add("d-none")
        }
    }

  return (
    <React.Fragment>
        <div className="container-fluid overflow-y-auto" style={{maxHeight:'84.5vh'}}>
            <h5 className="text-white mb-3"><i className="bi bi-folder-fill"></i> &nbsp; { folder } </h5>

            {isLoading ? (
                <Loading />
            ) : (
                files.length == 0 ? (
                    <h4 className="text-secondary text-center"><i className="bi bi-file-earmark-excel"></i> No images found </h4>
                ) : (
                    <div className="row">
                        { files.map((file, index)=>(
                            <div className="col-12 col-md-3 mb-4" key={ index }>
                            <div className="card text-bg-dark border border-secondary" >
                                { getFileNameExtension(file.filename)  == "mp4" ? (
                                     <video width="100%" controls>
                                       <source src={ `${BACKEND_SERVER}/assets/img/${file.filename}`} type="video/mp4" />
                                       Your browser does not support the video tag.
                                     </video>
                                    ) : (
                                      <img src={ `${BACKEND_SERVER}/assets/img/${file.filename}` } style={{height:'180px'}} className="card-img-top mx-auto d-block rounded object-fit-contain" alt="Image" />
                                    )
                                } 
                                <div className="card-body">
                                    <div className="row">                                       
                                        <div className="col-9">
                                        <p className="card-text text-truncate fw-bold" style={{fontSize:'14px'}}> { getRealFileName(file.filename) } </p>
                                        </div>
                                        <div className="col-3 text-center">
                                            <div className="dropdown">
                                                <button className="btn btn-default btn-sm text-white" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <i className="bi bi-three-dots-vertical"></i>
                                                </button>
                                                <ul className="dropdown-menu dropdown-menu-dark">
                                                    <li onClick={ (event)=>{handleDownloadFile(event, file)} } title="Click to download file"><Link className="dropdown-item" to="#"><i className="bi bi-cloud-arrow-down"></i> &nbsp; Download &nbsp; <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span> </Link></li>
                                                    <li onClick={ (event)=>{handleDelete(event, file)} } title="Click to delete file."><Link className="dropdown-item" to="#"><i className="bi bi-trash3"></i> &nbsp; Delete &nbsp;  <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span>  </Link></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>                                
                                </div>
                            </div>
                            </div>
                        )) }
                    </div>
                )
            )}
        </div>
        <CustomToastContainer />
    </React.Fragment>
  )
}

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_SERVER } from '../constants/constants'
import { getRealFileName } from '../utils/helpers'

import { ToastContainer, toast } from 'react-toastify'
import '../../node_modules/react-toastify/dist/ReactToastify.css'

export default function ProjectDetails() {

    const { id, folder } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [files, setFiles] = useState([])

    useEffect(()=>{
        axios.post(BACKEND_SERVER + "/files/get-folder-files.php", { FOLDER_ID : id })
            .then(response => {
                if(response.data.status == 1){ console.log(response.data.files)
                    setFiles(response.data.files)
                    setIsLoading(false)
                } else {
                    notify(response.data.msg)
                }
            })
            .catch(error=>{ console.log(error)
                notify("Error: " + error)
            })
    }, [])

    function notify(message){
        toast(message)
    }

  return (
    <>
        <div className="container-fluid overflow-y-auto" style={{maxHeight:'84.5vh'}}>
            <h5 className="text-white mb-3"><i className="bi bi-folder-fill"></i> &nbsp; {folder} </h5>

            {isLoading ? (
                <div className="text-center align-middle">
                    <div className="spinner-border text-secondary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <span role="status" className="ms-3 fw-bold text-secondary">Loading files...</span>
                </div>
            ) : (
                files.length == 0 ? (
                    <h4 className="text-secondary text-center"><i className="bi bi-file-earmark-excel"></i> No images found </h4>
                ) : (
                    <div className="row">
                        { files.map((file, index)=>(
                            <div className="col-md-3 mb-4" key={ index }>
                            <div className="card text-bg-dark border border-secondary" >
                                <img src={ BACKEND_SERVER + `/assets/img/${file.filename}` } style={{height:'180px'}} className="card-img-top mx-auto d-block rounded object-fit-contai" alt="Image" />
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
                                                    <li><Link className="dropdown-item" to="#"><i class="bi bi-download"></i> &nbsp; Download</Link></li>
                                                    <li><Link className="dropdown-item" to="#"><i class="bi bi-trash3"></i> &nbsp; Delete</Link></li>
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

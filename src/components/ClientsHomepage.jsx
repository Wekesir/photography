import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_SERVER } from '../constants/constants'
import { useSelector } from 'react-redux'
import { CustomToastContainer, toast } from '../utils/toastUtil'
import Loading from './Loading'

export default function ClientsHomepage() {
  const [isFetchingProject, setIsFetchingProject] = useState(true)
  const [folderFiles, setFolderFiles] = useState([])

  const {folder} = useSelector(state => state.client)

  useEffect(()=>{
    const fetchProject = async ()=>{
      try {
        if(!folder){
          throw new Error(`Folder ID error`)
        }

        const response = await axios.get(`${BACKEND_SERVER}/api/projects`);

        if(response?.data.status === 0){ //Error returned 
          throw new Error(`Caught Error: ${data.msg}`)
        }

        setFolderFiles(folderFiles)
      } catch (error) {
        toast(`Caught Error: ${error.message}`);
      } finally {
        setIsFetchingProject(!isFetchingProject)
      }
    }
    fetchProject(); // This will run the fetchProject function when the component mounts or when the component re-renders (after receiving new props or state)
  }, [])

  return (
    <React.Fragment>
        <div className="container-fluid">
          {isFetchingProject ? (
            <Loading />
          ) : (
            folderFiles.length == 0 ? (
              <h3 className="text-secondary text-center"><i className="bi bi-file-earmark-excel"></i> No images found </h3>
            ) : (
              <div className="row">
                  {folderFiles.map((file, index)=>(
                    <div className="col-md-3 col-sm-6" key={index}>
                    <div className="card borer border-secondary">
                      <img src="..." style={{height:'180px'}} className="card-img-top object-fit-contain" alt="..." />
                      <div className="card-body">
                        <h5 class="card-title placeholder text-truncate">Card title</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                      </div>
                    </div>
                    </div>
                  ))}
              </div>
            )
          )}
        </div>
        <CustomToastContainer />
    </React.Fragment>
  )
}

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_SERVER } from '../constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { CustomToastContainer, toast } from '../utils/toastUtil'
import { getRealFileName } from '../utils/helpers'
import Loading from './Loading'

export default function ClientsHomepage() {
  const [isFetchingProject, setIsFetchingProject] = useState(true)
  const [folderFiles, setFolderFiles] = useState([])

  const {folder} = useSelector(state => state.client)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   let isLeavingPage = false;

  //   const handleBeforeUnload = (e) => {
  //     if (!isLeavingPage) {
  //       e.preventDefault();
  //       e.returnValue = ''; //Chrome Browser
  //       isLeavingPage = true;
  //     }
  //   };

  //   const handleUnload = () => {
  //     if (isLeavingPage) {
  //       dispatch(unsetFolderID());
  //     }
  //   };

  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   window.addEventListener('unload', handleUnload);

  //   // Cleanup function to remove event listeners when component unmounts
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //     window.removeEventListener('unload', handleUnload);
  //   };
  // }, [dispatch]); 

  useEffect(()=>{
    const fetchProject = async ()=>{
      try {
        if(!folder){
          throw new Error(`Folder ID error`)
        }

        const {data} = await axios.post(`${BACKEND_SERVER}/clients/fetchFolderFiles.php`, {folder: folder});

        if(data?.status === 0){ //Error returned 
          throw new Error(`Caught Error: ${data.msg}`)
        }

        setFolderFiles(data.files)
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
                    <div className="col-md-3 col-sm-6 mb-4 bg-dark" key={index}>
                    <div className="card borer border-secondary bg-dark">
                      <img src={ `${BACKEND_SERVER}/assets/img/${file.filename}` } style={{height:'180px'}} className="card-img-top object-fit-contain" alt="..." />
                      <div className="card-body">
                        <p className="card-text text-truncate fw-bold text-white" style={{fontSize:'14px'}}> { getRealFileName(file.filename) } </p>
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

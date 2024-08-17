import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_SERVER } from '../constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { CustomToastContainer, toast } from '../utils/toastUtil'
import { handleDownloadFile } from '../utils/helpers'
import { getRealFileName } from '../utils/helpers'
import Loading from './Loading'

export default function ClientsHomepage({ onValueChange, onFileChange }) {
  const [isFetchingProject, setIsFetchingProject] = useState(true)
  const [folderFiles, setFolderFiles] = useState([])
  const [fileInView, setFileInView] = useState({})
  const [lastTap, setLastTap] = useState(0)
  const [singleTapTimer, setSingleTapTimer] = useState(null);

  const {folder} = useSelector(state => state.client) //The ID of the shared folder

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
        onValueChange(data.folderDetails.project_name)
      } catch (error) {
        toast(`Caught Error: ${error.message}`)
      } finally {
        setIsFetchingProject(!isFetchingProject)
      }
    }
    fetchProject(); // This will run the fetchProject function when the component mounts or when the component re-renders (after receiving new props or state)
  }, [])

  const handleViewImage = (file)=>{
    const viewImageModal = new bootstrap.Modal(document.getElementById('viewImgModal'))

    if(viewImageModal) {
      setFileInView(file);
      viewImageModal.show()
      document.getElementById('viewImgModalImg').src = `${BACKEND_SERVER}/assets/img/${file.filename}`
      document.getElementById('viewImgModalTitle').textContent = getRealFileName(file.filename)

      document.getElementById('viewImgModal').addEventListener('hidden.bs.modal', ()=>{
        document.getElementById('viewImgModalImg').src = ''
        setFileInView({})
      })
    }
  }

  const handleTouchStart = useCallback((file) => {
    const currentTime = new Date().getTime();
    const tapTimeDifference = (lastTap > 0) ? (currentTime - lastTap) : 0

    clearTimeout(singleTapTimer);

    if (lastTap > 0 && (tapTimeDifference > 50 && tapTimeDifference < 300)) {
      handleViewImage(file); 
    } else {
        const timer = setTimeout(() => {
          onFileChange(file)
        }, 300);
        setSingleTapTimer(timer);
    }

    setLastTap(currentTime);
  }, [lastTap, singleTapTimer, handleViewImage, onFileChange]);

  return (
    <React.Fragment>
        <div className="container-fluid">
          {isFetchingProject ? (
            <Loading />
          ) : (
            folderFiles.length == 0 ? (
              <h3 className="text-secondary text-center"><i className="bi bi-file-earmark-excel"></i> No images found </h3>
            ) : (
              <div className="row g-2">
                  {folderFiles.map((file, index)=>(
                    <div className="col-6 col-md-3 mb-4 bg-dark" key={index}>
                    <div className="card borer border-secondary bg-dark" onTouchStart={ ()=>{handleTouchStart(file) }} onClick={()=>{onFileChange(file)}} onDoubleClick={()=>{handleViewImage(file)}}>
                      <img src={ `${BACKEND_SERVER}/assets/img/${file.filename}` } style={{height:'180px'}} className="card-img-top object-fit-contain" alt="..." />
                      <div className="card-body">
                        <p className="card-text text-truncate fw-md-bold text-white" style={{fontSize:'clamp(12px, 2.5vw, 14px)'}}> { getRealFileName(file.filename) } </p>
                      </div>
                    </div>
                    </div>
                  ))}
              </div>
            )
          )}

          <div className="modal fade" id="viewImgModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content bg-dark text-white">
                <div className="modal-header border border-dark">
                  <h1 className="modal-title fs-5" id="viewImgModalTitle"></h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body border border-dark">
                  <img src="" alt="" className="img-thumbnail mx-auto d-block object-fit-contain" id='viewImgModalImg' />
                </div>
                <div className="modal-footer border border-dark">
                  <button type="button" className="btn btn-md btn-dark" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-md btn-secondary" onClick={ ()=>{handleDownloadFile(fileInView)} }> <i className="bi bi-cloud-arrow-down-fill"></i> Download file</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <CustomToastContainer />
    </React.Fragment>
  )
}

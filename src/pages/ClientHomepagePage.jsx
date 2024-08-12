import React, { useState, useEffect } from 'react'
import ClientsPage from '../components/ClientsHomepage'
import FileDetails from '../components/FileDetails'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import { handleDownloadFolder } from '../utils/helpers'
import { useSelector } from 'react-redux'

export default function ClientHomepagePage() {
  const [folderName, setFolderName] = useState('')
  const [fileInfo, setFileInfo] = useState({})  

  const { folder } = useSelector(state=>state.client) //Encrypted folder ID

  const passFolderName = (value) => {
    setFolderName(value)
  }

  const passFileInfo = (value)=>{
    setFileInfo(value)
  }

  const triggerDownloadFolder = async (e) => {
    try {
      e.target.disabled = true;
      e.target.querySelector("span.spinner-border").classList.remove("d-none");
  
      await handleDownloadFolder({'project_id': folder, 'project_name': folderName});
    } catch (error) {
      toast(`Download failed:${error}`);
    } finally {
      e.target.querySelector("span.spinner-border").classList.add("d-none");
      e.target.disabled = false;
    }
  };

  useEffect(()=>{
    document.title = `${folderName || "Homepage"} | Lyrics Photography`
  }, [folderName])

  return (
    <React.Fragment>
        <nav className="navbar" style={{ backgroundColor: 'rgba(0,0,0,.9)' }}>
          <div className="container-fluid">
            <Link className="navbar-brand text-white" to="/clienthomepage">
                <img src={ logo } alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-2" />
                LYRICS STUDIOS
            </Link>
          </div>
        </nav>
        <div className="container-fluid bg-dark overflow-x-hidden" style={{minHeight: '90.7vh'}}>
            <div className="row">
               <div className="d-sm-none d-md-block col-md-3" style={{ backgroundColor: 'rgba(0,0,0,.5)', minHeight:'90vh' }}>
                    { Object.keys(fileInfo).length > 0 && (
                      <FileDetails file={fileInfo} project={folderName} /> 
                    )}                    
               </div>
               <div className="col-12 col-md-9">
                    <div className='d-flex justify-content-between align-items-center py-2'>
                      <h5 className='text-white fw-bold'> <i className="bi bi-folder"></i> { folderName || "PROJECT NAME" }</h5>
                      <button className='btn btn-md btn-secondary'onClick={ (event)=>{triggerDownloadFolder(event)} } title='Click to download this folder.'> 
                        <i className="bi bi-cloud-arrow-down-fill"></i> Download Folder <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span>
                      </button>
                    </div>
                     <br className='border border-secondary' />
                    <ClientsPage onValueChange={passFolderName} onFileChange={passFileInfo} />
               </div>
            </div>            
        </div>
    </React.Fragment>
  )
}

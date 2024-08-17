import React, { useState, useEffect } from 'react'
import ClientsPage from '../components/ClientsHomepage'
import FileDetails from '../components/FileDetails'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { handleDownloadFolder } from '../utils/helpers'
import { useSelector, useDispatch } from 'react-redux'
import { unsetFolderID, unsetClientEmail } from '../store/clientSlice'
import '../assets/css/clientSidenav.css'

export default function ClientHomepagePage() {
  const [folderName, setFolderName] = useState('')
  const [fileInfo, setFileInfo] = useState({})  
  const [mobileSidenavActive, setMobileSidenavActive] = useState(false) //Toggles the sidenav for smaller devices e.g phones  

  const { folder, clientEmail } = useSelector(state=>state.client) //Encrypted folder ID
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const passFolderName = (value) => {
    setFolderName(value)
  }

  const passFileInfo = (value)=>{
    setFileInfo(value)
  }

  const handleClientLogout = (e)=>{
    e.preventDefault()
   dispatch(unsetFolderID())
   dispatch(unsetClientEmail())

   navigate('/clientAuth')
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
  }

  const handleToggleSidenav = (e)=>{
    e.preventDefault()
    setMobileSidenavActive(!mobileSidenavActive)
  }

  useEffect(()=>{
    document.title = `${folderName || "Homepage"} | Lyrics Photography`
  }, [folderName])

  return (
    <React.Fragment>
        <nav className="navbar navbar-expand-lg py-2" style={{ backgroundColor: 'rgba(0,0,0,.9)' }}>
          <div className="container-fluid">
            <Link className="navbar-brand text-white" to="#">
              <img src={ logo } alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
              LYRICS PHOTOGRAPHY
            </Link>
            <button className="navbar-toggler" onClick={handleToggleSidenav} type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <i className="bi bi-list text-secondary"></i>
            </button>
            <div className="collapse navbar-collapse justify-content-end d-none d-md-block" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle text-white" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    { clientEmail }
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-dark text-secondary">
                    <li><Link className="dropdown-item" href="#" onClick={handleClientLogout}> <i className="bi bi-box-arrow-right"></i>  Logout</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid bg-dark overflow-x-hidden" style={{minHeight: '90.7vh'}}>
            <div className="row">
               <div className={`${mobileSidenavActive ? 'float-sidenav d-block bg-dark' : 'd-none d-md-block col-md-3'} `} style={{ backgroundColor: 'rgba(0,0,0,.5)', minHeight:'90vh' }}>
                    <div className="text-center">
                      { mobileSidenavActive && (
                        <button className='float-end text-white btn btn-md btn-dark fw-bold' onClick={handleToggleSidenav}> 
                          <i className="bi bi-x-lg"></i> 
                        </button>
                      ) }
                      <div className="text-white border border-warning rounded-circle mx-auto py-2 bg-dark" style={{width:'80px', fontSize:'clamp(40px, 2.5vw, 50px'}}> 
                        { clientEmail && clientEmail[0].toUpperCase() } 
                      </div>
                      <div className="dropdown-center pt-3">
                        <button className="btn btn-dark dropdown-toggle shadow-lg rounded" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          { clientEmail }
                        </button>
                        <ul className="dropdown-menu dropdown-menu-dark">
                          <li><Link className="dropdown-item" href="#" onClick={handleClientLogout}> <i className="bi bi-box-arrow-left"></i> Logout</Link></li>
                        </ul>
                      </div>
                    </div>
                    <hr className='border border-secondary' />
                    { Object.keys(fileInfo).length > 0 ? (
                      <FileDetails file={fileInfo} project={folderName} /> 
                    ) : (
                      <div className='text-center text-white-50'>No file selected.</div>
                    )}                    
               </div>
               <div className="col-12 col-md-9">
                    <div className='d-flex justify-content-between align-items-center py-2'>
                      <h5 className='text-white fw-bold'> <i className="bi bi-folder"></i> { folderName || "PROJECT NAME" }</h5>
                      <button className='btn btn-sm btn-md btn-secondary'onClick={ (event)=>{triggerDownloadFolder(event)} } title='Click to download this folder.'> 
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

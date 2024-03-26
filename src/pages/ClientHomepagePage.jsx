import React from 'react'
import ClientsPage from '../components/ClientsHomepage'

export default function ClientHomepagePage() {

    document.title = "Client Homepage | Lyrics Photography"

  return (
    <>
        <div className="container-fluid bg-dark overflow-x-hidden" style={{minHeight: '100vh'}}>
            <div className="row">
               <div className="col-md-3">
                    
               </div>
               <div className="col-md-9">
                    <h5 className='text-white'>My Files</h5> <br className='border border-secondary' />
                    <ClientsPage />
               </div>
            </div>
            
        </div>
    </>
  )
}

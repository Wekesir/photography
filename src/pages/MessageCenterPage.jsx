import React, { useEffect, useState } from 'react'
import Sidenav from '../components/Sidenav'
import MessageCenter from '../components/MessageCenter'
import Navbar from '../components/Navbar'

export default function MessageCenterPage() {
    const [unreadMessages, setUnreadMessages] = useState(0)

    const passUnreadMsgCount = (value) => {
        setUnreadMessages(value)
    }

    useEffect(()=>{
        document.title = "Message Center | Lyrics Studios"
    })
  return (
    <React.Fragment>        
        <div className="container-fluid ps-0 bg-dark" style={{height: '100vh'}}>
            <Navbar />
            <div className="row">
                <div className="col-md-3">
                    <Sidenav />
                </div>
                <div className="col-md-9">
                    <h5 className="text-white py-2">
                        <i className="bi bi-chat-dots-fill"></i>  Message Center
                        <span className="badge text-bg-info">{ (unreadMessages > 0) && unreadMessages }</span>
                    </h5>
                    <MessageCenter unreadMsgsCount= { passUnreadMsgCount } />
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

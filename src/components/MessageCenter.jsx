import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from './Loading'
import { BACKEND_SERVER } from '../constants/constants'
import Cookies from 'js-cookie'
import { CustomToastContainer, toast } from '../utils/toastUtil'
import axios from 'axios'

export default function MessageCenter() {
    const [messages, setMessages] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    const jwt = Cookies.get('authJWTToken')

    const handleDeleteMessage = async (event, messageID)=>{
        event.preventDefault()

        try {           
            event.target.querySelector('span.spinner-border').classList.remove('d-none') 
            const response = await axios.post(`${BACKEND_SERVER}/msg/delete.php`, { id : messageID  })
            
            if(response.data?.status === 1){
                toast(response.data.msg)
                setMessages(prevMessages => prevMessages.filter(msg => msg.messageID!== message.messageID))
            } else {
                throw new Error(response.data.msg)
            }
        } catch (error) {
            toast(error)
        } finally {
            event.target.querySelector('span.spinner-border').classList.add('d-none') 
        }
    }

    const handleMarkAsRead = async (event, messageID)=>{
        event.preventDefault()
        try {
            event.target.querySelector('span.spinner-border').classList.remove('d-none') 
            const response = await axios.post(`${BACKEND_SERVER}/msg/markread.php`, {
                id : messageID
            }, {
                headers : {
                    'Authorization' : `Bearer ${jwt}`,
                    'Content-Type' : 'application/json'
                }
            })
            
            if(response.data?.status === 1){
                toast(response.data.msg)
            } else {
                throw new Error(response.data.msg)
            }
        } catch (error) {
            toast(error)
        } finally {
            event.target.querySelector('span.spinner-border').classList.add('d-none') 
        }    
    }

    useEffect(()=>{
        async function fetchMessages(){
            const response = await axios.get(`${BACKEND_SERVER}/msg/fetchmsg.php`, {
                headers : {
                    'Authorization' : `Bearer ${jwt}`,
                    'Content-Type' : 'application/json'
                }
            })
            
            if(response.data?.status === 1){
                setMessages(response.data.messages)
                setIsLoading(false)
            } else {
                toast(response.data.msg)
            }
        }
        fetchMessages();
    })

  return (
    <React.Fragment>
        <div className='border border-dark overflow-y-auto col-12 col-md-8 mx-auto' style={{maxHeight: '82vh'}}>
            { isLoading ? (
                <Loading />
            ) : (
                Object.keys(messages).length == 0 ? (
                    <h4 className="text-secondary text-center"><i className="bi bi-file-earmark-excel"></i> No messages found </h4>
                ) : (
                    <div className="list-group bg-dark border border-dark" style={{backgroundColor:'rgba(0,0,0,.5)'}}>
                    { messages.map((message, index)=>(
                        <Link to="#" key={index} className="list-group-item list-group-item-action mb-2 bg-dark text-white border-bottom border-secondary">
                            <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1"> {message.name} </h5> <hr className='border border-secondary border-2' />
                            <small className="text-white-50">{ message.timestamp }</small>
                            </div>
                            <p className="mb-1">{message.message}</p>
                            <small className="text-white-50">{message.email}</small>
                            <span className="dropdown">
                            <button className="btn btn-default btn-sm text-white dropdown-toggle float-end" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i className="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-dark">
                                <li>
                                    <Link className="dropdown-item" to="#" onClick={(event)=>{handleMarkAsRead(event, message.messageID)}}>
                                    <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span> Mark as read
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="#" onClick={(event)=>{handleDeleteMessage(event, message.messageID)}}> 
                                        <span className="spinner-border spinner-border-sm d-none" aria-hidden="true"></span> Delete
                                    </Link>
                                </li>
                            </ul>
                            </span>                        
                        </Link>
                    )) }
                    </div>                   
                )
            ) }
        </div>
        <CustomToastContainer />
    </React.Fragment>
  )
}

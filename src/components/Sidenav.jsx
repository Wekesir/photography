import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../assets/css/sidenav.css'


export default function Sidenav() {
  const [activeDropdown, setActiveDropdown] = useState(null); //Sets the active dropdoown 

  const toggleDropdown = (index) => {
    setActiveDropdown((prevIndex) => (prevIndex === index ? null : index));
  };

  const isDropdownActive = (index) => activeDropdown === index



  return (
    <div className='conteiner-fluid overflow-y-auto' style={{backgroundColor: 'rgba(0,0,0,.5)', height: '84vh'}}>
      <div className="d-grid gap-2">
        <button className="btn btn-secondary text-white m-2" title="Upload a new project." type="button"> <i className="bi bi-folder-plus"></i> New Project</button>
      </div>
      <ul className="my-4 ps-1">
        <li className={`mainmenu ${isDropdownActive(0) ? 'active' : ''}`} onClick={ ()=>toggleDropdown(0) }><i className="bi bi-folder-fill"></i> &nbsp; Projects</li>
        <li className={`mainmenu ${isDropdownActive(1) ? 'active' : ''}`} onClick={ ()=>toggleDropdown(1) }><i className="bi bi-journals"></i> &nbsp; Bookings <i className="bi bi-caret-down-fill float-end"></i>
          <ul className={`mainmenu-dropdown ${isDropdownActive(1) ? '' : 'd-none'}`}>
            <li> <Link to="/newbooking" className='text-decoration-none  text-white'> <i className="bi bi-journal-plus"></i> New Booking </Link> </li>
            <li> <Link to="/bookings" className='text-decoration-none  text-white'> <i className="bi bi-journals"></i> Booking </Link> </li>
          </ul>
        </li>
        <li className={`mainmenu ${isDropdownActive(2) ? 'active' : ''}`} onClick={ ()=>toggleDropdown(2) }> <i className="bi bi-person-lines-fill"></i> &nbsp; Clients  <i className="bi bi-caret-down-fill float-end"></i>
            <ul className={`mainmenu-dropdown ${isDropdownActive(2) ? '' : 'd-none'}`}>
              <li> <Link to="/newClient" className='text-decoration-none  text-white'> <i className="bi bi-person-plus-fill"></i> Add new Clients </Link> </li>
              <li> <Link to="/clients" className='text-decoration-none text-white'> <i className="bi bi-person-lines-fill"></i> Clients List </Link> </li>
            </ul>
        </li>
        <li className={`mainmenu ${isDropdownActive(3) ? 'active' : ''}`} onClick={ ()=>toggleDropdown(3) }><i className="bi bi-tools"></i> &nbsp; Resource Management <i className="bi bi-caret-down-fill float-end"></i>
            <ul className={`mainmenu-dropdown ${isDropdownActive(3) ? '' : 'd-none'}`} >
              <li> <i className="bi bi-camera-fill"></i> Add new Items</li>
              <li><i className="bi bi-tools"></i> Items</li>
            </ul>
        </li> 
      </ul> 
    </div> 
  )
}

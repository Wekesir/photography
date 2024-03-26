import { useState } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, Outlet, RouterProvider } from "react-router-dom"

//Contexts
import UserContext from './contexts/UserContext'
import ClientContext from './contexts/ClientsContext'

//Components
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignupPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import Index from './pages/index'
import AddClients from './pages/AddClientsPage'
import ClientsList from './pages/ClientsPage'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import ClientPortalAuth from './components/ClientPortalAuth'
import ClientHomepagePage from './pages/ClientHomepagePage'
import NewBookingsPage from './pages/NewBookingsPage'

function App() {
  const [loggedInUserData, setLoggedInUserData] = useState({});
  const [loggedInClientData, setLoggedInClientData] = useState({})

  const router = createBrowserRouter( 
    createRoutesFromElements(
        <Route path='/' element={ <Root/> }>
            <Route index element={ <Index /> }></Route>
            <Route path="/login" element={ <LoginPage /> }></Route> 
            <Route path='/signup' element={ <SignUpPage /> }></Route>
            <Route path='/resetpassword' element={ <ResetPasswordPage/> }></Route>
            <Route path='/home' element={ <HomePage/> }></Route>
            <Route path="/newClient" element={ <AddClients /> }></Route>
            <Route path="/clients" element={ <ClientsList /> }></Route>
            <Route path="/projects" element={ <ProjectsPage /> }></Route>
            <Route path="/proj/:id/:folder" element={ <ProjectDetailsPage /> }></Route>
            <Route path="/clientAuth" element={ <ClientPortalAuth /> }></Route>
            <Route path="/clienthomepage" element={ <ClientHomepagePage /> }></Route>
            <Route path="newbooking" element={ <NewBookingsPage /> }></Route>
        </Route>  
    )
  );

  return (
    <UserContext.Provider value={{ loggedInUserData, setLoggedInUserData }}> 
      <ClientContext.Provider value={{ loggedInClientData, setLoggedInClientData }}>        
        <div> <RouterProvider router={ router }/> </div>
      </ClientContext.Provider>
    </UserContext.Provider> 
  )
}

const Root = () => {
  return (
    <>     
      <Outlet />    
    </>
  )
}

export default App

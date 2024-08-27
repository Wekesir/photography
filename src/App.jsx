import { Route, createBrowserRouter, createRoutesFromElements, Outlet, RouterProvider } from "react-router-dom"

//Protected Routes
import LoginProtectedRoute from './protectedRoutes/ProtectedLogin'
import ClientAccessRoute from './protectedRoutes/ProtectedClientAccess'

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
import ProfilePage from './pages/ProfilePage'
import BookingsPage from './pages/BookingsPage'
import MessageCenterPage from "./pages/MessageCenterPage"

function App() {

  const router = createBrowserRouter( 
    createRoutesFromElements(
        <Route path='/' element={ <Root/> }>
            <Route index element={ <Index /> }></Route>
            <Route path="/login" element={ <LoginPage /> }></Route> 
            <Route path='/signup' element={ <SignUpPage /> }></Route>
            <Route path='/resetpassword' element={ <ResetPasswordPage/> }></Route>       

            <Route element={<LoginProtectedRoute />}>
              <Route path='/home' element={  <HomePage/>  }></Route>
              <Route path="/newClient" element={  <AddClients /> }></Route>
              <Route path="/clients" element={  <ClientsList /> }></Route>
              <Route path="/projects" element={ <ProjectsPage /> }></Route>
              <Route path="/proj/:id/:folder" element={ <ProjectDetailsPage /> }></Route>
              <Route path="/clientAuth" element={ <ClientPortalAuth /> }></Route>
              
              <Route path="/newbooking" element={ <NewBookingsPage /> }></Route> 
              <Route path="/updateprofile" element={ <ProfilePage /> }></Route>      
              <Route path="/bookings" element={ <BookingsPage /> }></Route>   
              <Route path="/messagecenter" element={ <MessageCenterPage /> }></Route>
            </Route>

            <Route element={<ClientAccessRoute />}>
              <Route path="/clienthomepage" element={ <ClientHomepagePage /> }></Route>
            </Route>

              {/**Catch any other routes*/}
              <Route path="*" element={ <Index />}></Route>     
        </Route>  
    )
  );

  return (      
    <div> <RouterProvider router={ router }/> </div>
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

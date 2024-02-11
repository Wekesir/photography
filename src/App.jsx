import { useState } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, Outlet, RouterProvider } from "react-router-dom"


import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignupPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import UserContext from './contexts/UserContext'

function App() {
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={ <Root/> }>
          <Route index element={ <HomePage /> }></Route>
          <Route path="/login" element={ <LoginPage /> }></Route> 
          <Route path='/signup' element={ <SignUpPage /> }></Route>
          <Route path='/resetpassword' element={ <ResetPasswordPage/> }></Route>
      </Route> 
    )
  );

  return (
    <UserContext.Provider value={{loggedInUserData, setLoggedInUserData}}> 
      <div> <RouterProvider router={ router }/> </div>
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

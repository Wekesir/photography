import { useState } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'

import LoginPage from '../pages/LoginPage'

function App() {
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={ <Root/> }>
          <Route path="/login" element={ <LoginPage /> }></Route>
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

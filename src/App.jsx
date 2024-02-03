import { useState } from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Login from '../pages/Login'

function App() {
  const [loggedInUserData, setLoggedInUserData] = useState(null);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={ <Root/> }>
          <Route path="/login" element={ <Login /> }></Route>
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

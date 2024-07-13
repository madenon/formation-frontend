import React from 'react'
import Home from './pages/Home/Home'
import {BrowserRouter, Routes, Route}  from  "react-router-dom"
import Singup from './pages/Signup/Singup'
import Login from './pages/Login/Login'
import Navbar from './components/Navbar/Navbar'
const App = () => {
  return (
    <BrowserRouter>
  
      <Routes>
        <Route path='/dashboard'  element={<Home />} />
        <Route path='/login'  element={<Login />} />
        <Route path='/register'  element={<Singup />} />
      </Routes>
      
      
    </BrowserRouter>
  )
}

export default App

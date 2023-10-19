import React from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ListAlgos from './components/ListAlgos'
import Home from './components/Home'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
const App = () => {
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/list' element={<ListAlgos/>}/>
    </Routes>
    </>
  )
}

export default App
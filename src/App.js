import React from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import ListAlgos from './components/ListAlgos'
import Home from './components/Home'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import Graph from './components/Graph'
const App = () => {
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/list' element={<ListAlgos/>}/>
      <Route path='/graph' element={<Graph/>}/>
    </Routes>
    </>
  )
}

export default App
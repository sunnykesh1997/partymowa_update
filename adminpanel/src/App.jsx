import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Admin from './Admin/Admin'
import Dashboard from './Dashboard/Dashboard'
import ExtraAdd from './ExtraAdd/ExtraAdd'; // Import the ExtraAdd component
import AddCake from './AdminCakes/AddCake'
import AddDecoration from './AddDecoration/AddDecoration'
import AddRose from './AddRose/AddRose'
import Navbar from './Navbar/Navbar'
import Footer from './Footer/Footer'
import PhotoSelection from './PhotoSelection/PhotoSelection';



const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Admin/>}/>
      <Route path='/addcake' element={<AddCake/>}/>
      <Route path="/adddecor" element={<AddDecoration />} />
      <Route path='/addrose' element={<AddRose/>}/>
      <Route path="/extraadd" element={<ExtraAdd />} /> {/* Add route for ExtraAdd */}
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/photoselection' element={<PhotoSelection/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App

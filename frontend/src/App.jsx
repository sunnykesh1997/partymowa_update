import React from 'react'
import './App.css'
import Navbar from './Components/Navbar/Navbar'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Footer from './Components/Footer/Footer'
import Booking from './Pages/Booking'
import BookingForm from './Components/BookingForm/BookingForm'
import Cakes from './Components/Cakes/Cakes'
import Decoration from './Components/Decoration/Decoration'
import Rose from './Components/Rose/Rose'
import AddExtra from './Components/AddExtra/AddExtra'
import Summary from './Components/Summary/Summary'
import About from './Components/About/About'
import Themes from './Components/Themes/Themes'
import Gallery from './Components/Gallery/Gallery'
import KnowMore from './Components/KnowMore/KnowMore'
import PhotoSelection from './Components/PhotoSelection/PhotoSelection'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element= {<About/>}/>
        <Route path='/services' element= {<Themes/>}/>
        <Route path='/gallery' element= {<Gallery/>}/>
        <Route path='/contact' element= {<KnowMore/>}/>
        <Route path='/book' element={<Booking/>}/>
        <Route path="/book/:themeName" element={<BookingForm />} />
        <Route path='/cake' element={<Cakes/>}/>
        <Route path="/decoration" element={<Decoration />} />
        <Route path='/rose' element={<Rose/>}/>
        <Route path='/summary' element={<Summary/>}/>
        <Route path='/addextra' element={<AddExtra/>}/>
        <Route path='/photoselection' element={<PhotoSelection/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App

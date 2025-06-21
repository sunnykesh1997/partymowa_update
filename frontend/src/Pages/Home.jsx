import React from 'react'
import About from '../Components/About/About'
import Hero from '../Components/Hero/Hero'
import Events from '../Components/Events/Events'
import KnowMore from '../Components/KnowMore/KnowMore'
import Services from '../Components/Services/Services'
import Counter from '../Components/Counter/Counter'
import Testimonial from '../Components/Testimonial/Testimonial'
import Gallery from '../Components/Gallery/Gallery'
import Location from '../Components/Location/Location'
import Themes from '../Components/Themes/Themes'

const Home = () => {
  return (
    <div>
      <Hero/>
      <About/>
      <Events/>
      <Themes/>
      <KnowMore/>
      <Services/>
      <Counter/>
      <Testimonial/>
      <Gallery/>
      <Location/>
    </div>
  )
}

export default Home

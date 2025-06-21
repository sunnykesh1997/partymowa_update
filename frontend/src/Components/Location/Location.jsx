import React from 'react'
import './Location.css'
const Location = () => {
  return (
    <div className='location'>
      <div className="container">
        <div className="location-map">
          <h1>Location</h1>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.32050174676!2d78.38150097516618!3d17.444367483452538!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9375e0069309%3A0x24c9aa360076dfdf!2sParty%20Mowa%20Private%20Theatres%20-%20Madhapur!5e0!3m2!1sen!2sin!4v1735365622736!5m2!1sen!2sin" width="100%" height="450" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  )
}

export default Location

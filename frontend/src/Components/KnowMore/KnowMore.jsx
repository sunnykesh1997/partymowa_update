import React from 'react'
import './KnowMore.css'
import {Link} from 'react-router-dom'
import { FaPlay } from "react-icons/fa";
const KnowMore = () => {
  return (
    <div className='knowmore'>
      <div className="container">
        <div className="knowmore-content">
          <div className="knowmore-video">
            <Link to='#' className='play-icon'><FaPlay /></Link>
            <h3>See And Discover</h3>
            <h1>Know More About Party Mowa <br /> For Better Experience</h1>
          </div>
          <div className="register-form">
            <h1>Register Now</h1>
            <p>Booking Open</p>
            <form>
              <div className='form-fields'>
                <input type="text" placeholder='Enter Your Full Name' />
              </div>
              <div className='form-fields'>
                <input type="email" placeholder='Enter Your Email' />
              </div>
              <div className='form-fields'>
                <input type="text" placeholder='Enter Your Phone Number' />
              </div>
              <div className='form-fields'>
                <select>
                  <option value="">LUNA</option>
                  <option value="">Rosset</option>
                  <option value="">270Deg Celestial</option>
                </select>
              </div>
              <div className='form-fields'>
                <select>
                  <option value="">Time Slots</option>
                </select>
              </div>
              <div>
                <button className='form-btn' type='submit'>Submit Now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KnowMore

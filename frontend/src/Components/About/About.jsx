import React from 'react'
import theme from '../../assets/themes.png'
import { FaHandsHelping } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { BsHeadset } from "react-icons/bs";
import { Link } from 'react-router-dom';

import './About.css'
const About = () => {
  return (
    <div className='about'>
      <div className="container">
        <div className="about-bar">
          <div className="about-image">
            <img src={theme} alt="" />
          </div>
          <div className="about-content">
            <h3>About Us : Party Mowa</h3>
            <h1> Where Celebrations  Come <br /> Alive  Immerse in Themes, Fun, and Unforgettable Moments!</h1>
            <p>Welcome to Party Mowa, your ultimate mini-theater for unforgettable celebration parties! Choose from our three enchanting themes—Luna, Rosset, and 270deg Celestial—to set the perfect vibe for your special moments. We offer delightful cakes, mesmerizing smoke effects, and stunning decorations to make your event truly magical. Celebrate in style with Party Mowa!  
            </p>
            <ul>
              <li>LUNA -<del>1799₹</del>for 4 person Offer 1349₹(3hrs-slot) for 4 person<del>999</del> Offer 749₹(1.5hrs-slot)</li>
              <li>ROSSET -<del>1999₹</del>for 4 person  Offer 1499₹(3hrs-slot)<del>1199</del> for 4 person Offer 899₹(1.5hrs-slot)</li>
              <li>CELESTIAL - <del>₹ 3999</del> ₹ Offer 1999 (1.5 Hours)</li>
            </ul>
            <Link to='/book'><button className='more-btn'>Book Now</button></Link>
          </div>
        </div>
        <div className="About-ideas">
          <div className="about-list">
            <div className='icon-bg'>
              <FaHandsHelping />
            </div>
            <h1>Friendly Theam</h1>
            <p>"Our friendly team at Party Mowa is here to make your celebrations seamless and unforgettable!"</p>
          </div>
          <div className="about-list">
            <div className='icon-bg'>
            <HiOutlineLightBulb />
            </div>
            <h1>Brilliant Idea</h1>
            <p>"Transforming every celebration into a magical experience with themed elegance and endless joy!"</p>
          </div>
          <div className="about-list">
            <div className='icon-bg'>
              <IoSettingsOutline />
            </div>
            <h1>Perfect Work</h1>
            <p>"Party Mowa delivers perfection in every detail, making your celebrations truly extraordinary!"</p>
          </div>
          <div className="about-list">
            <div className='icon-bg'>
              <BsHeadset />
            </div>
            <h1>Support 24/7</h1>
            <p>"Party Mowa stands by you, providing unwavering support to bring your celebration dreams to life!"</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

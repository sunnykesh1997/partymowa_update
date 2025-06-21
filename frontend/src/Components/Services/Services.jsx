import React from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import person_1 from '../../assets/person_1.png'
import person_2 from '../../assets/person_2.png'
import person_3 from '../../assets/person_3.png'
import person_4 from '../../assets/person_4.png'
import person_1small from '../../assets/person_1small.png'
import person_2small from '../../assets/person_2small.png'
import person_3small from '../../assets/person_3small.png'
import person_4small from '../../assets/person_4small.png'
import './Services.css'
import {Link} from 'react-router-dom'
const Services = () => {
  const services = [
    {bgImage: person_1, image: person_1small, name:"Party Mowa", youtubelink:"https://youtube.com/shorts/P69eaflMCtY?si=9NyGUy4mNbbUWjy6"},
    {bgImage: person_2, image: person_2small, name:"Party Mowa", youtubelink:"https://youtube.com/shorts/XWwtIO0dw1s?si=TbWKn954Cxh_9IZ4" },
    {bgImage:person_3, image: person_3small, name:"Party Mowa", youtubelink:"https://youtube.com/shorts/xCsSsofKLQY?si=ztzNaWkg1HTcZhLB"},
    {bgImage:person_4, image: person_4small, name:"Party Mowa", youtubelink:"https://youtube.com/shorts/JHjEfF5xyNQ?si=5RmdaetA0dkxrtKq"},
    // Add more services as needed
  ];
  return (
    <div className='services'>
      <div className="container">
        <div className="service-header">
          <div className="service-content">
              <h3>Services</h3>
              <h1>Get A New Experience With <br /> Party Mowa Services</h1>
          </div>
          <div className="service-buttons">
            <button className='arrow-btn'><FaArrowLeft /><span>Prev</span></button>
            <button className='arrow-btn'><FaArrowRight/><span>Next</span></button>
          </div>
        </div>
        <div className="service-list">
        {services.map((service, index) => (
          <div key={index} className="service-list-box" style={{ backgroundImage: `url(${service.bgImage})`}}>
            <div className="overlay"></div>
            <div className="service-play">
                <Link to={service.youtubelink}><FaPlay /></Link>
            </div>
            <div className="service-bg-image">
            <img src={service.image} alt={service.name} />
              
            </div>
            <div className="service-list-content">
              <h3 className='service-name'><Link to='#'>{service.name}</Link></h3>
              {/* <span className='service-price'>Starts From <span>{service.price}</span></span> */}
            </div>
            {/* <Link to='#' className='service-btn'>Read More <FaArrowRight /> </Link> */}
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

export default Services

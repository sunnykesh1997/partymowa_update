import React from 'react'
import './Events.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slide1 from '../../assets/slide1.jpg'
import slide2 from '../../assets/slide2.jpg'
import slide3 from '../../assets/slide3.jpg'
import slide4 from '../../assets/slide4.jpg'
import slide5 from '../../assets/slide5.jpg'
import slide6 from '../../assets/slide6.jpg'
const Events = () => {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "150px",
    slidesToShow: 1,
    speed: 500,
    responsive: [
      {
        breakpoint: 768, // For tablets
        settings: {
          centerPadding: "50px", // Reduce padding for smaller screens
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 360, 
        settings: {
          centerPadding: "20px",
          slidesToShow: 1,
        },
      },
    ],
  
  };
  return (
    <div className='events'>
      <div className="container">
        <div className="events-header">
          <h3>Upcoming Events</h3>
          <h1> Explore Our Next  Upcoming <br /> Awesome Events</h1>
          <div className=" slider-container">
            <Slider {...settings} className='events-slider'>
                <div className='card'>
                  <img src={slide1} alt="" />
                  <div className="card-content">

                  </div>
                </div>
                <div className='card'>
                  <img src={slide2} alt="" />
                </div>
                <div className='card'>
                  <img src={slide3} alt="" />
                </div>
                <div className='card'>
                  <img src={slide4} alt="" />
                </div>
                <div className='card'>
                <img src={slide5} alt="" />
                </div>
                <div className='card'>
                <img src={slide6} alt="" />
                </div>
            </Slider> 
          </div>
        </div>
      </div>  
    </div>
  )
}

export default Events

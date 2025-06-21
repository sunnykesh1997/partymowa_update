import React from 'react'
import './Testimonial.css'
import Slider from 'react-slick';
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
const Testimonial = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768, // For tablets
        settings: {
          
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 360, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  const reviews = [
    {name:"siddamurthy Dinesh Reddy", date: 'November 2, 2024', text:"I celebrated my Friend birthday at Party Mowa's 270-degree screening (Celestial Theatre), and she absolutely loved it. It made our day truly memorable. We Loved it😍"},
    {name:"Kapil Potalgude", date: 'November  11, 2024', text:"Good Place With Good Vibes. Enjoyed a Lot With Mah Gang.!!🥳🥳🥳. Sound Quality Is Excellent in Luna. The Best Choice for birthday Celebrations."},
    {name:"chaitanya sai anil", date: 'November 15, 2024', text:"PartyMowa Private Theatres has the captivating ambiance and Dolby Atmos sound system create an unforgettable experience. The tasteful decoration adds charm, and the friendly staff ensures excellent hospitality. Highly recommend for a unique experience."},
    {name:"Anchor Santosh", date: 'october 25, 2024', text:"The team Party Mowa are so sweet and very supportive.I would like to thank specially Tanuja garu ( CEO of Party Mowa ) and Family for your great hospitality and we just loved your Party theatre with lovely ambience and I really recommend Party Mowa for everyone on all your special occasions to make it memorable 😊👍🏻 "},
    {name:"Bhavanireddy Chetla", date: 'December 20, 2024', text:"Enjoyed a lot, after along time we spend a great time.nice ambience perfect sound system big screen nice cooperative staff."},
  ]
  return (
    <div className='testimonial'>
      <h4>Testimonials</h4>
      <h1>Our Client's Feedback and <br /> Reviews</h1>
      <Slider {...settings} className='testimonial-slider'>
      {reviews.map((review, index) => (
        <div key={index}  className="testimonial-review-content">
            <div  className="testimonial-title">
              <h4>{review.name}</h4>
              <p>{review.date}</p>
            </div>
          <div className='review-stars'>
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </div>
          <div className='review-text'>
            <p>{review.text}</p>
          </div>
        </div>
      ))}
      </Slider>
    </div>
  )
}

export default Testimonial

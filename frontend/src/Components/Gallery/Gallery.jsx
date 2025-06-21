import React from 'react'
import './Gallery.css'
import img_1 from '../../assets/img-1.jpg'
import img_2 from '../../assets/img-2.jpg'
import img_3 from '../../assets/img-3.jpg'
import img_4 from '../../assets/img-4.jpg'
import img_5 from '../../assets/img-5.jpg'
import img_6 from '../../assets/img-6.jpg'
import img_7 from '../../assets/img-7.png'
import img_8 from '../../assets/img-8.png'
import img_9 from '../../assets/img-9.jpg'
const Gallery = () => {
  const Galleryimages=[
    {
      url:img_1
    },
    {
      url:img_2
    },
    {
      url:img_3
    },
    {
      url:img_4
    },
    {
      url:img_5
    },
    {
      url:img_6
    },
    {
      url:img_7
    },
    {
      url:img_8
    },
    {
      url:img_9
    }
  ]
  return (
    <div className='gallery'>
      <div className="container">
        <div className="galler-header">
          <h4>Gallery</h4>
          <h1>Our Amazing And <br /> unforgettable Times</h1>
       
          <div  className="gallery-images">
          {Galleryimages.map((Galleryimage,index)=>(
            <img key={index} src={Galleryimage.url} alt="" />
          ))}
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default Gallery

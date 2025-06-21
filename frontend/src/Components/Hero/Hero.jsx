import React from 'react'
import './Hero.css'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import luna3 from '../../assets/luna3.jpg';
import rosset2 from '../../assets/rosset2.jpg';
import celestial from '../../assets/Celestial.jpg';

const fadeImages = [
  { url: luna3, caption: 'Luna Theme', },
  { url: rosset2, caption: 'Rosset Theme', },
  { url: celestial, caption: 'Celestial Theme', },
];
const Hero = () => {
  
  return (
    <div>
      <Fade>
        {fadeImages.map((fadeImage, index) => (
          <div key={index}>
            <img style={{ width: '100%', position:'relative' }} src={fadeImage.url} />
            <div className='slide-bg'>
              <h5>Let's Celebrate In</h5>
              <h2>{fadeImage.caption}</h2>
              <h4>Party With Us</h4>
              <p>Welcome to Party Mowa, your premier destination for an extraodinary private theatre and event celebration experience.We specialize in providing exclusive private theatres equipped with Dolby Atmos Complete sound systems and enhanced 4k Video Projection  </p>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  )
}

export default Hero





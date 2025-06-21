import React from 'react'
import './Counter.css'
import CountUp from 'react-countup';
import { RiPoliceBadgeFill } from "react-icons/ri";
import { FaClipboardList } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { GiLaurelsTrophy } from "react-icons/gi";
const Counter = () => {
  return (
    <div className='counter'> 
      <div className="container">
        <div className="counter-bar">
          <div className="counter-header">
            <div className="counter-img">
              <RiPoliceBadgeFill />
            </div>
            <div className="counter-content">
            <CountUp start={0} end={100} delay={0}>
                   {({ countUpRef }) => (
                      <div className='counter-number'>
                        <span ref={countUpRef} />
                        <span>+</span>
                      </div>
                    )}
                  </CountUp>
              <p className='counter-title'>Successfull Projects</p>
            </div>
          </div>
          <div className="counter-header">
            <div className="counter-img">
            <FaClipboardList />
            </div>
            <div className="counter-content">
            <CountUp start={0} end={100} delay={0}>
                   {({ countUpRef }) => (
                      <div className='counter-number'>
                        <span ref={countUpRef} />
                        <span>+</span>
                      </div>
                    )}
                  </CountUp>
              <p className='counter-title'>Successfull Projects</p>
            </div>
          </div>
          <div className="counter-header">
            <div className="counter-img">
            <FaRankingStar />
            </div>
            <div className="counter-content">
            <CountUp start={0} end={100} delay={0}>
                   {({ countUpRef }) => (
                      <div className='counter-number'>
                        <span ref={countUpRef} />
                        <span>+</span>
                      </div>
                    )}
                  </CountUp>
              <p className='counter-title'>Successfull Projects</p>
            </div>
          </div>
          <div className="counter-header">
            <div className="counter-img">
            <GiLaurelsTrophy />
            </div>
            <div className="counter-content">
            <CountUp start={0} end={100} delay={0}>
                   {({ countUpRef }) => (
                      <div className='counter-number'>
                        <span ref={countUpRef} />
                        <span>+</span>
                      </div>
                    )}
                  </CountUp>
              <p className='counter-title'>Successfull Projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Counter

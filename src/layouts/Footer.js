import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer-container'>
        <div className='footer-content'>
            <div className='footer-1'>
                <Link to='#'>
                    <button className='footer-btn'>
                       <i className="fa-solid fa-address-book"></i> Contact 
                    </button>
                </Link>
            </div>
            <p className='footer-p'>
                &copy; <a href='https://y0phoenix.github.io'>
                    Aaron Graybill
                </a> 2022
            </p>
        </div>
    </div>
  )
}

export default Footer;
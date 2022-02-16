import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='footer-container'>
            <Link to='#'>
                <button className='btn'>
                    Contact
                </button>
            </Link>
        <p className='footer-container-p'>
            &copy;  
            <a href='https://y0phoenix.github.io'>
                Aaron Graybill
            </a> 2022
        </p>
    </div>
  )
}

export default Footer;
import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <div className='footer-container'>
        <div className='footer-content'>
            <div className='footer-1'>
                <Link to='#'>
                    <motion.button whileHover={{scale: 1.03}} className='footer-btn'>
                       <i className="fa-solid fa-address-book"></i> Contact 
                    </motion.button>
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
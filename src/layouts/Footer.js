import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Footer = () => {
    const location = useLocation();
    const bool = location.pathname.includes('recipe');
    // const [width, setWidth] = useState('100%');
    // if (bool) {
    //     if (window.innerWidth <= 425 && window.innerWidth > 375) {
    //         setWidth('55%');
    //     }
    //     if (window.innerWidth <= 375 && window.innerWidth > 320) {
    //         setWidth('50%');
    //     }
    //     if (window.innerWidth <= 320) {
    //         setWidth('45%');
    //     }
    // }
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
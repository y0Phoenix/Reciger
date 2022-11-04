import React from 'react'
import { link } from '../types/Style'

const Footer = () => {
  return (
    <>
        <div className='footer gap-md'>
            <div className='font-size-sm white'>
                <a style={link} href='mailto: aarongraybill3@gmail.com'>
                    <i className='fa-solid fa-address-book dark'></i> Contact
                </a>
            </div>
            <div>
                &copy; <a href='https://y0phoenix.github.io/' style={link}>
                    Aaron Graybill 2022
                </a>
            </div>
        </div>
    </>
  )
}

export default Footer
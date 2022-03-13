import React from 'react';
import { connect } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import cooking from '../images/cooking-at-home.gif'
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
const initial = {
  opacity: 0
};
const show = {
  opacity: 1
};

const Landing = ({isAuthenticated}) => {
  return (
    <>
      {isAuthenticated ? <Navigate to='/dashboard' /> : 
      <>
      <AnimatePresence exitBeforeEnter>
        <div className='landing'>
          <motion.p initial={initial} animate={show} transition={{delay: 1}}>Create and Edit Recipes and Ingredients From Anywhere<br></br>
          With Nutrient Data and More</motion.p>
          <Link to='/login'>
            <motion.button className='landing-btn' initial={initial} animate={show} transition={{delay: 1.2}}>
             <i className='fa fa-user'></i> Login 
            </motion.button>
          </Link>
          <Link to='/register'>
            <motion.button className='landing-btn' initial={initial} animate={show} transition={{delay: 1.2}}>
               <i className='fa fa-user-check'></i> Register 
            </motion.button>
          </Link>
          <div className='landing-img-container'>
            <motion.img src={cooking} initial={initial} animate={{opacity: 0.7}} transition={{duration: 1}} className='landing-img'>
            </motion.img>
          </div>
        </div>
      </AnimatePresence>
      </>
      }
    </>
  )
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
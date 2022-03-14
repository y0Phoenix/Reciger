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
const hover = {
  scale: 1.07
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
          <div className='landing-btns'>
            <motion.div initial={initial} animate={show} transition={{delay: 1.2}} >
              <Link to='/login'>
                <motion.button className='landing-btn' whileHover={hover}>
                <i className='fa fa-user'></i> Login 
                </motion.button>
              </Link>
            </motion.div>
            <motion.div initial={initial} animate={show} transition={{delay: 1.2}}>
              <Link to='/register'>
                <motion.button className='landing-btn' whileHover={hover}>
                  <i className='fa fa-user-check'></i> Register 
                </motion.button>
              </Link>
            </motion.div>
          </div>
          <div className='landing-img-container'>
            <motion.img src={cooking} initial={initial} animate={{opacity: 0.7}} transition={{duration: 1}} className='landing-img'>
            </motion.img>
          </div>
          <div className='landing-credit'>
            <a href='https://dribbble.com/shots/11362056-COOKING-AT-HOME'>
              <small>Credits: Tissa Tom at Dribble</small>
            </a>
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
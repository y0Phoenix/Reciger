import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import spinner from '../../images/spinner.gif';
import {motion, AnimatePresence} from 'framer-motion'

const Loading = ({loading}) => {
  console.log(loading);
  const background = {
    initial: {
      opacity: 0
    }, 
    enter: {
      opacity: 1
    }, 
    exit: {
      opacity: 0
    }, 
  };
  if (loading) {
    return (
      <> 
        <AnimatePresence exitBeforeEnter>
          <motion.div className='background'
              variants={background}
              initial="initial"
              animate="enter"
              exit="exit"
              key="background">
          </motion.div> 
          <motion.div
          className='loading-container'
          initial='initial'
          animate='animate'
          exit='exit'
          key='loading'
          >
            <img
            src={spinner}
            style={{ position: 'absolute' }}
            alt='Loading...'
            key="background">
            </img>
          </motion.div>
        </AnimatePresence>
      </>
    )
  }
  return null
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.loading
});

export default connect(mapStateToProps)(Loading);
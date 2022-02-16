import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';

const Alert = ({alert, showModal, setShowModal}) => {
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

  return (
    <Fragment>
      {showModal && alert !== null && alert.length > 0 && (
            <AnimatePresence exitBeforeEnter={true}>
                <motion.div className='background'
                    variants={background}
                    initial="initial"
                    animate="enter"
                    exit="exit">
                </motion.div> 
                <motion.div className='modal' key="alert">
                  <h1>Errors</h1>
                  {alert.map(alert => (
                    <div key={alert.id} className={`alert-${alert.type}`}>
                      {alert.msg}
                    </div>
                  ))}
                </motion.div>
            </AnimatePresence>
        )}
    </Fragment>
  )
}


Alert.propTypes = {
  alert: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alert)
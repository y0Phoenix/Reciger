import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { removeAlert } from '../../actions/alert';

const Alert = ({alert, showModal, setShowModal, removeAlert}) => {
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

  const modal = {
    initial: {
      y: "-100vh",
      opacity: 0
    },
    enter: {
      y: "200px",
      opacity: 1,
      transition: {
        delay: 0.5
      }
    }
  }

  return (
    <Fragment>
      {showModal && alert !== null && alert.length > 0 && (
            <AnimatePresence exitBeforeEnter={true}>
                <motion.div className='background'
                    variants={background}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    key='background'>
                </motion.div> 
                <motion.div className='modal' key="alert"
                variants={modal}
                initial="initial"
                animate="enter">
                  <p className='modal-p'>Errors</p>
                  {alert.map(alert => (
                    <div key={alert.id} className={`alert-${alert.type}`}>
                      <p className='modal-p'>
                        {alert.msg}
                      </p>
                    </div>
                  ))}
                  <button onClick={e => {
                      setShowModal(false);
                      removeAlert();
                    }} className="modal-btn">Okay</button>
                </motion.div>
            </AnimatePresence>
        )}
    </Fragment>
  )
}


Alert.propTypes = {
  alert: PropTypes.array.isRequired,
  removeAlert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps, {removeAlert})(Alert)
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { removeAlert } from '../../actions/alert';
import { background, modal } from './types';

const hover = {
  scale: 1.09
};

const Alert = ({alert, showModal, setShowModal, removeAlert}) => {
  const exit = () => {
    setShowModal({...showModal, Alert: false});
    removeAlert();
  }
  return (
    <Fragment>
      {showModal.Alert && alert !== null && alert.length > 0 && (
            <AnimatePresence exitBeforeEnter>
                <motion.div className='background' style={{zIndex: 5}}
                    variants={background}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    key='background'>
                  <motion.div className='alert-main' key="alert" onBlur={() => exit()}
                  variants={modal}
                  initial="initial"
                  animate="enter">
                    <p className='modal-p'>Notice</p>
                    {alert.map(alert => (
                      <div key={alert.id} className={`alert ${alert.type}`}>
                        <p>{alert.msg}</p>
                      </div>
                    ))}
                    <motion.button whileHover={hover} className='btn' style={{backgroundColor: 'black'}} onClick={() => exit()}>Okay</motion.button>
                    <div className='close-modal'>
                      <motion.button whileHover={hover} className='btn'>
                        <i className='fa-solid fa-x'></i>
                      </motion.button>
                    </div>
                  </motion.div>
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
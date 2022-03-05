import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { removeAlert } from '../../actions/alert';
import { background, modal } from './types';

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
                  <motion.div className='modal' key="alert" onBlur={() => exit()}
                  variants={modal}
                  initial="initial"
                  animate="enter">
                    <p className='modal-p'>Errors</p>
                    {alert.map(alert => (
                      <div key={alert.id} className={`alert-${alert.type}`}>
                        <p className='modal-p' key={alert.id}>
                          {alert.msg}
                        </p>
                      </div>
                    ))}
                    <button onClick={() => exit()} className="modal-btn" style={{cursor: "pointer"}}>Okay</button>
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
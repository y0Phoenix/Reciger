import React, { Fragment, SetStateAction } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { removeAlert } from '../../actions/alert';
import { background, modal } from './types';
import State from '../../types/State';
import ShowModal from '../../types/ShowModal';

const hover = {
  scale: 1.09
};

const mapStateToProps = (state: State) => ({
  alert: state.alert
});

const connector = connect(mapStateToProps, {removeAlert});

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps{
  showModal: ShowModal,
  setShowModal: React.Dispatch<SetStateAction<ShowModal>>,
};

const Alert: React.FC<Props> = ({alert, showModal, setShowModal, removeAlert}) => {
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


export default connector(Alert);
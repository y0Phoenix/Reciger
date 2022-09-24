import React, { SetStateAction } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { background, modal } from './types';
import ShowModal from '../../types/ShowModal';

const hover = {
    scale: 1.09
};

interface Props {
    showModal: ShowModal,
    setShowModal: React.Dispatch<SetStateAction<ShowModal>>
};

const YesorNo: React.FC<Props> = ({showModal, setShowModal}) => {
    return (
        <>
            {showModal.YesorNo.bool && 
                <AnimatePresence exitBeforeEnter>
                    <motion.div className='background'
                        variants={background}
                        initial="initial"
                        animate="enter"
                        exit="exit"  
                    >
                    <motion.div className='yesorno'
                            variants={modal}
                            initial='initial'
                            animate='enter'
                            exit='initial'
                    >
                            <div className='yesorno-title'>
                                <h1>
                                    Are You Sure?
                                </h1>
                            </div> 
                            <div className='yesorno-buttons'>
                                <div className='yesorno-yes'>
                                    <motion.button whileHover={hover} id='yes' className='btn no-radius' type='button' onClick={() => {
                                        showModal.YesorNo.direct(showModal.YesorNo.params);
                                        setShowModal({...showModal, YesorNo: {...showModal.YesorNo, bool: false, params: {}}})
                                    }}>Yes</motion.button>    
                                </div>
                                <div className='yesorno-no'>
                                    <motion.button id='no' whileHover={hover} className='btn no-radius' type='button' onClick={() => setShowModal({...showModal, YesorNo: {...showModal.YesorNo, bool: false, params: {}}})}>No</motion.button>    
                                </div>
                            </div>
                            <div className='close-modal'>
                                <motion.button whileHover={hover} className='btn' type='button' onClick={() => setShowModal({...showModal, YesorNo: {...showModal.YesorNo, bool: false, params: {}}})}>
                                    <i className='fa-solid fa-x'></i>    
                                </motion.button>    
                            </div>
                        </motion.div> 
                    </motion.div>
                </AnimatePresence>  
            }
        </>
    );
}

export default YesorNo
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { background, modal } from './types';

const YesorNo = ({showModal, setShowModal}) => {
    if (showModal.YesorNo.bool) {
        console.log('yes/no bool true');
    }
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
                                Are You Sure?
                            </div> 
                            <div className='yesorno-yes'>
                                <button type='button' onClick={() => showModal.YesorNo.direct(showModal.YesorNo.params)}>Yes</button>    
                            </div>
                            <div className='yesorno-no'>
                                <button type='button' onClick={() => setShowModal({...showModal, YesorNo: {bool: false, direct: null, params: null}})}>No</button>    
                            </div>
                            <div className='close-modal'>
                                <button type='button' onClick={() => setShowModal({...showModal, YesorNo: {bool: false, direct: null, params: null}})}>
                                    <i className='fa-solid fa-x'></i>    
                                </button>    
                            </div>
                        </motion.div> 
                    </motion.div>
                </AnimatePresence>  
            }
        </>
    )
}

export default YesorNo
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react';
import { background, modal } from './types';

const Filter = ({showModal, setShowModal}) => {
    return (
        <>
            {showModal.Filter.bool && 
                <AnimatePresence exitBeforeEnter>
                    <motion.div className='background'
                        variants={background}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        key='background'
                    >
                        <motion.div className='filter'
                            variants={modal}
                            initial='initial'
                            animate='enter'
                            exit='initial'
                        >
                            <div className='filter-'></div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            }
        </>
    )
}

export default Filter
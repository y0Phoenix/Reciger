import { AnimatePresence, motion } from 'framer-motion'
import React, { SetStateAction } from 'react';
import ShowModal from '../../types/ShowModal';
import { background, modal } from './types';

interface Props {
    showModal: ShowModal,
    setShowModal: React.Dispatch<SetStateAction<ShowModal>>
};

const Filter: React.FC<Props> = ({showModal, setShowModal}) => {
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
import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { verifyEmailFinish } from '../../actions/user';
import { setAlert } from '../../actions/alert';
import { motion } from 'framer-motion';
import { Navigate, useParams } from 'react-router-dom';
import ShowModal from '../../types/ShowModal';

const connector = connect(null, {verifyEmailFinish, setAlert});

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
    setShowModal: React.Dispatch<React.SetStateAction<ShowModal>>,
    showModal: ShowModal
};

const VerifyEmail: React.FC<Props> = ({verifyEmailFinish, setAlert, setShowModal, showModal}) => {
    const params = useParams();
    const token = params.token ? params.token : '';
    if (!token) setAlert('No Token Found Not Authorized', 'error', setShowModal, showModal);
    return (
        <>
            {
                !token && <Navigate to={'/dashboard'} />
            }
            <div className='verify-email-main'>
                <h1>Verify Email</h1>
                <motion.button className='btn no-radius' whileHover={{scale: 1.1}} type='button' onClick={() => verifyEmailFinish(token, setShowModal, showModal)}>
                    Click Here To Verify Your Email
                </motion.button>
            </div>
        </>   
    )
}

export default connector(VerifyEmail);
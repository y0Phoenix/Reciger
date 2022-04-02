import React from 'react'
import { connect } from 'react-redux';
import { verifyEmailFinish } from '../../actions/user';
import { setAlert } from '../../actions/alert';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const VerifyEmail = ({verifyEmailFinish, setAlert, setShowModal, showModal}) => {
    const params = useParams();
    const token = params.token;
    if (!token) return setAlert('No Token Found Not Authorized', 'error', setShowModal, showModal);
    return (
        <>
            <div className='verify-email-main'>
                <h1>Verify Email</h1>
                <motion.button className='btn no-radius' whileHover={{scale: 1.1}} type='button' onClick={() => verifyEmailFinish(token, setShowModal, showModal)}>
                    Click Here To Verify Your Email
                </motion.button>
            </div>
        </>   
    )
}

export default connect(null, {verifyEmailFinish, setAlert})(VerifyEmail)
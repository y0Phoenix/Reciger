import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {updateUser, verifyEmail} from '../../actions/user';
import { setAlert } from '../../actions/alert';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import AccountContent from './AccountContent';
// TODO add animations for each category of the user profile
// import { motion, AnimatePresence } from 'framer-motion';
const initFormData = {
    name: '',
    email: ''
};

const hover = {
    scale: 1.07
};

const Account = ({ isAuthenticated, user, updateUser, verifyEmail, setAlert, setNavigate, showModal, setShowModal }) => {
    const [formData, setFormData] = useState(initFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        user && setFormData({name: user.name, email: user.email})
    }, [user]);

    const onchange = e => setFormData({...formData, [e.target.name]: e.target.value});
    
    const onsubmit = e => {
        e.preventDefault();
        if (!user.verify.email.bool) return setAlert('You Must Verify Your Email Before Making Any Account Changes', 'error', setShowModal, showModal);
        if (user.email !== formData.email) {
            return verifyEmail(formData.email, user.email, {name: formData.name}, setShowModal, showModal);
        }
        let data = {...formData};
        if (user.email === formData.email) delete data.email;
        updateUser(data, setShowModal, showModal);
    }
    
    return (
        <>
            {isAuthenticated ? 
            <>
                <div className='account-main'>
                    <div className='account-navbar'>
                        <div className='account-personal'>
                            <motion.button className='btn no-radius' whileHover={hover} type='button' onClick={() => setNavigate('/account/personal')}>
                                Personal <i className='fa-solid fa-info'></i>
                            </motion.button>
                        </div>
                    </div>
                    <div className='account-content'>
                        <AccountContent {...{formData, hover, user, verifyEmail, onsubmit, onchange, setNavigate, setShowModal, showModal}}/>
                    </div>
                </div>
            </> : setNavigate('/login')}       
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user
})

export default connect(mapStateToProps, {updateUser, verifyEmail, setAlert})(Account);
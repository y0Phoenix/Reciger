import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import {updateUser} from '../actions/user';
// TODO add animations for each category of the user profile
// import { motion, AnimatePresence } from 'framer-motion';
const initFormData = {
    name: '',
    email: ''
};

const Account = ({ isAuthenticated, user, updateUser, setNavigate, showModal, setShowModal }) => {
    const [formData, setFormData] = useState(initFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => user && setFormData({name: user.name, email: user.email}), [user]);
    let accountContent = (
        <>
            <form onSubmit={e => onsubmit(e)}>
                <div className='account-name'>
                    <input type='text' name='name' value={formData.name} onChange={e => onchange(e)}></input>
                </div>
                <div className='account-email'>
                    <input type='text' name='email' value={formData.email} onChange={e => onchange(e)}></input>
                </div>
                <div className='account-changepassword'>
                <button onClick={() => setNavigate('/password/init')}>
                    Change Password <i className='fa-solid fa-square-pen'></i>
                </button>
                </div>
            </form>
        </>
    );

    const onchange = e => setFormData({...formData, [e.target.name]: e.target.value});
    
    const onsubmit = e => {
        e.preventDefault();
        // TODO inplement email validation
        // if ()

    }
    
    return (
        <>
            {isAuthenticated ? 
            <>
                <div className='account-main'>
                    <div className='account-navbar'>
                        <div className='account-personal'>
                            Personal <i className='fa-solid fa-info'></i>
                        </div>
                    </div>
                    <div className='account-content'>{accountContent}</div>
                </div>
            </> : setNavigate('/login')}       
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user
})

export default connect(mapStateToProps, {updateUser})(Account);
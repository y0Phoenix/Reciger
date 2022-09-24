import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import {updateUser, verifyEmail} from '../../actions/user';
import { setAlert } from '../../actions/alert';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import AccountContent from './AccountContent';
import ShowModal from '../../types/ShowModal';
import State from '../../types/State';
// TODO add animations for each category of the user profile
// import { motion, AnimatePresence } from 'framer-motion';
export interface AccountFormData {
    name: string,
    email?: string
};

const initFormData: AccountFormData = {
    name: '',
    email: ''
};

const hover = {
    scale: 1.07
};

const mapStateToProps = (state: State) => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user
});

const connector = connect(mapStateToProps, {updateUser, verifyEmail, setAlert});

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
    setNavigate: React.Dispatch<React.SetStateAction<string>>,
    showModal: ShowModal,
    setShowModal: React.Dispatch<React.SetStateAction<ShowModal>>
}


const Account: React.FC<Props> = ({ isAuthenticated, user, updateUser, verifyEmail, setAlert, setNavigate, showModal, setShowModal }) => {
    const [formData, setFormData] = useState(initFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        user && setFormData({name: user.name, email: user.email})
    }, [user]);

    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.value});
    
    const onsubmit = (e: React.FormEvent<any>) => {
        e.preventDefault();
        if (!user?.verify.email.bool) return setAlert('You Must Verify Your Email Before Making Any Account Changes', 'error', setShowModal, showModal);
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
                        <AccountContent {...{formData, hover, user, onsubmit, onchange, setNavigate, setShowModal, showModal}}/>
                    </div>
                </div>
            </> : setNavigate('/login')}       
        </>
    )
}


export default connector(Account);
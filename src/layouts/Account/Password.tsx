import React, { useEffect, useRef, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changePasswordReq, changePasswordToken } from '../../actions/user';
import { setAlert } from '../../actions/alert';
import toggleShow from '../../functions/toggleShow';
import { motion } from 'framer-motion';
import State from '../../types/State';
import ShowModal from '../../types/ShowModal';

const hover = {
    scale: 1.09
};

const initPasswords = {
    pass1: '',
    pass2: ''
};

const mapStateToProps = (state: State) => ({
    user: state.user.user
});

const connector = connect(mapStateToProps, {changePasswordReq, changePasswordToken, setAlert});

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
    setNavigate: React.Dispatch<React.SetStateAction<string>>,
    setShowModal: React.Dispatch<React.SetStateAction<ShowModal>>,
    showModal: ShowModal
}

const Password: React.FC<Props> = ({setNavigate, setShowModal, showModal, user, changePasswordReq, changePasswordToken, setAlert}) => {
    const params = useParams();
    const refs = {
        pass1: useRef(null),
        pass1I: useRef(null),
        pass2: useRef(null),
        pass2I: useRef(null)
    }
    const { pass1, pass1I, pass2, pass2I } = refs;
    const [email, setEmail] = useState(user ? user.email : '');
    const [passwords, setPasswords] = useState(initPasswords);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (user) setEmail(user.email);
    }, [user]);

    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => setPasswords({...passwords, [e.target.name]: e.target.value});

    const onsubmit = (e: React.FormEvent<HTMLFormElement>, type: string) => {
        e.preventDefault();
        if (type === 'email') {
            return changePasswordReq(email, setShowModal, showModal);
        }
        if (params.token === 'init' || !params.token) return setAlert('Improper Link Parameters Try Again Later', 'error', setShowModal, showModal);
        if (passwords.pass1 !== passwords.pass2) return setAlert('Passwords Don\'t Match', 'error', setShowModal, showModal);
        changePasswordToken(params.token, passwords.pass1, setShowModal, showModal);
    };

    return (
        <>
            {params.token === 'init' ?
                    <form onSubmit={e => onsubmit(e, 'email')}>
                        <div className='password-main'>
                            <h3>New Password Request Form</h3>
                            <div className='password-first'>
                                <input type='email' name='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='email'></input>
                            </div>
                            <div className='password-submit'>
                                <motion.input whileHover={hover} className='btn' type='submit' value='Submit'></motion.input>
                            </div>
                        </div> 
                    </form>
                :
                    <form className='password-container' onSubmit={e => onsubmit(e, 'pass')}>
                        <div className='password-main'>
                            <h3>New Password Form</h3>
                            <div className='password-first'>
                                <small>New Password</small>
                                <br></br>
                                <div className='eye-container'>
                                    <input type='password' name='pass1' ref={pass1} value={passwords.pass1} onChange={e => onchange(e)} placeholder='password-one'></input>
                                    <div className='eye'>
                                        <motion.button whileHover={hover} className='eye-btn' type='button' onClick={() => toggleShow(refs, 'pass1')}>
                                            <i ref={pass1I} className='fa-solid fa-eye'></i>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                            <div className='password-second'>
                                <small>Must Match</small>
                                <br></br>
                                <div className='eye-container'>
                                    <input type='password' name='pass2' ref={pass2} value={passwords.pass2} onChange={e => onchange(e)} placeholder='password-two'></input>
                                    <div className='eye'>
                                        <motion.button whileHover={hover} className='eye-btn' type='button' onClick={() => toggleShow(refs, 'pass2')}>
                                            <i ref={pass2I} className='fa-solid fa-eye'></i>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                            <div className='password-submit'>
                                <motion.input whileHover={hover} className='btn' type='submit' value='Submit'></motion.input>
                            </div>
                        </div>
                    </form>
            }
        </>
    )
};


export default connector(Password);
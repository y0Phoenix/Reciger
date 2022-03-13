import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { changePasswordReq, changePasswordToken } from '../actions/user';
import { setAlert } from '../actions/alert';

const initPasswords = {
    pass1: '',
    pass2: ''
};

const Password = ({setNavigate, setShowModal, showModal, user, changePasswordReq, changePasswordToken, setAlert}) => {
    const params = useParams();
    const [email, setEmail] = useState(user ? user.email : '');
    const [passwords, setPasswords] = useState(initPasswords);
    const [oldPass, setOldPass] = useState('')

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => user && setEmail(user.email), [user]);

    const onchange = e => setPasswords({...passwords, [e.target.name]: e.target.value});

    const onsubmit = e => {
        e.preventDefault();
        if (e.target.name === 'email') {
            return changePasswordReq(email, setShowModal, showModal);
        }
        if (params.token === 'init' || !params.token) return setAlert('Improper Link Parameters Try Again Later', 'error', setShowModal, showModal);
        if (passwords.pass1 !== passwords.pass2) return setAlert('Passwords Don\'t Match', 'error', setShowModal, showModal);
        changePasswordToken(params.token, passwords.pass1, oldPass, setShowModal, showModal);
        setTimeout(setNavigate, 3500, '/dashboard');
    };

    return (
        <>
            {params.token === 'init' ?
                <div className='password-main'>
                    <form name='email' onSubmit={e => onsubmit(e)}>
                        <h3>New Password Link Request Form</h3>
                        <div className='password-first'>
                            <input type='email' name='email' value={email} onChange={e => setEmail(e.target.value)} placeholder='email'></input>
                        </div>
                        <div className='password-submit'>
                            <input type='submit' value='Submit'></input>
                        </div>
                    </form>
                </div> :
                <div className='password-main'>
                    <form name='pass' onSubmit={e => onsubmit(e)}>
                        <h3>New Password Form</h3>
                        <div className='password-old'>
                            <input type='text' value={oldPass} onChange={e => setOldPass(e.target.value)} placeholder='old-password'></input>
                        </div>
                        <div className='password-first'>
                            <small>New Password</small>
                            <br></br>
                            <input type='text' name='pass1' value={passwords.pass1} onChange={e => onchange(e)} placeholder='password-one'></input>
                        </div>
                        <div className='password-second'>
                            <small>Must Match</small>
                            <br></br>
                            <input type='text' name='pass2' value={passwords.pass2} onChange={e => onchange(e)} placeholder='password-two'></input>
                        </div>
                        <div className='password-submit'>
                            <input type='submit' value='Submit'></input>
                        </div>
                    </form>
                </div>
            }
        </>
    )
};

const mapStateToProps = state => ({
    user: state.user.user
})

export default connect(mapStateToProps, {changePasswordReq, changePasswordToken, setAlert})(Password)
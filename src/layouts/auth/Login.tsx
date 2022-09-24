import React, { Fragment, useRef, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { login } from '../../actions/user';
import toggleShow from '../../functions/toggleShow';
import { setAlert } from '../../actions/alert';
import { motion } from 'framer-motion';
import ShowModal from '../../types/ShowModal';
import State from '../../types/State';
const animate = {
	scale: 1.05
};

const mapStateToProps = (state: State) => ({
	isAuthenticated: state.user.isAuthenticated
});

const connector = connect(mapStateToProps, {login, setAlert});

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
	setShowModal: React.Dispatch<React.SetStateAction<ShowModal>>,
	showModal: ShowModal,
	setNavigate: React.Dispatch<React.SetStateAction<string>>
};

const Login: React.FC<Props> = ({isAuthenticated, login, setNavigate, setShowModal, showModal, setAlert}) => {
	const refs = {
		pass: useRef(null),
		passI: useRef(null)
	};
	const {pass, passI} = refs;
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		remeber: false
	});

	const {
		email,
		password,
		remeber
	} = formData;

	const onchange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.value});

	const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (email === '' || password === '') return setAlert('Please Enter Credentials', 'error', setShowModal, showModal)
		login({email, password, remeber}, setShowModal, showModal);
	}

	return (
		<Fragment>
		{isAuthenticated ? <Navigate to='/dashboard'/> : 
		<div className='login'>
			<h2>Login</h2>
			<form onSubmit={e => onsubmit(e)}>
				<div className='login-email'>
					<input type='text' placeholder='email' onChange={e => onchange(e)} value={email} name='email'></input>
				</div>
				<br></br>
				<small>example@gmail.com</small>
				<br></br>
				<div className='login-password'>
					<input type='password' placeholder='password' onChange={e => onchange(e)} value={password} name='password' ref={pass}></input>
					<div className='eye'>
						<motion.button whileHover={animate} type='button' onClick={() => toggleShow(refs, 'pass')} className="eye-btn">
								<i ref={passI} className='fa-solid fa-eye'></i>
						</motion.button>
					</div>
				</div>
				<br></br>
				<small>must contain 6 characters</small>
				<br></br>
				<br></br>
				<div className='login-remeber'>
					Remeber Me <input type='checkbox' name='remeber' checked={remeber} onChange={e => setFormData({...formData, remeber: e.target.checked})}></input>
				</div>
				<div className='login-forgot'>
					<motion.button type='button' whileHover={animate} className='btn' onClick={() => setNavigate('/password/init')}>
						Forgot Password
					</motion.button>
				</div>
				<br></br>
				<div className='login-submit'>
					<motion.input whileHover={animate} type='submit' value='Login' className='btn'></motion.input>
				</div>
			</form>
		</div>}
		</Fragment>
	)
}


export default connector(Login);
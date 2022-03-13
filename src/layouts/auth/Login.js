import React, { Fragment, useRef, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { login } from '../../actions/user';
import toggleShow from '../../functions/toggleShow';

const Login = ({isAuthenticated, login, setShowModal, showModal}) => {
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

	const onchange = e => setFormData({...formData, [e.target.name]: e.target.value});

	const onsubmit = e => {
		e.preventDefault();
		login({email, password, remeber}, setShowModal, showModal);
	}

	return (
		<Fragment>
		{isAuthenticated ? <Navigate to='/dashboard'/> : 
		<div className='login'>
			<h3>Login</h3>
			<form onSubmit={e => onsubmit(e)}>
				<div className='login-email'>
					<input type='text' placeholder='email' onChange={e => onchange(e)} value={email} name='email'></input>
				</div>
				<div className='login-password'>
					<small>example@gmail.com</small>
					<br></br>
					<input type='password' placeholder='password' onChange={e => onchange(e)} value={password} name='password' ref={pass}></input>
					<button type='button' onClick={() => toggleShow(refs, 'pass')}>
						<i ref={passI} className='fa-solid fa-eye'></i>
					</button>
				</div>
				<div className='login-remeber'>
					Remeber Me <input type='checkbox' name='remeber' value={remeber} onChange={e => setFormData({...formData, remeber: e.target.checked})}></input>
				</div>
				<div className='login-submit'>
					<small>must contain 6 characters</small>
					<br></br>
					<input type='submit' value='Login'></input>
				</div>
			</form>
		</div>}
		</Fragment>
	)
}

Login.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
	isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, {login})(Login)
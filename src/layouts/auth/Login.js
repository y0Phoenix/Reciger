import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { login } from '../../actions/user';

const Login = ({isAuthenticated, login, setShowModal}) => {
const [formData, setFormData] = useState({
	email: '',
	password: ''
});

const {
	email,
	password
} = formData;

const onchange = e => setFormData({...formData, [e.target.name]: e.target.value});

const onsubmit = e => {
	e.preventDefault();
	login({email, password}, setShowModal);
}

return (
	<Fragment>
	{isAuthenticated ? <Navigate to='/dashboard'/> : 
	<div className='login'>
		<h3>Login</h3>
		<form onSubmit={e => onsubmit(e)}>
		<input type='text' placeholder='email' onChange={e => onchange(e)} value={email} name='email'></input>
		<br></br>
		<small>example@gmail.com</small>
		<br></br>
		<input type='password' placeholder='password' onChange={e => onchange(e)} value={password} name='password'></input>
		<br></br>
		<small>must contain 6 characters</small>
		<br></br>
		<input type='submit' value='Login'></input>
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
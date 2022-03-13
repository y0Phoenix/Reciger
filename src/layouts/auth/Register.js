import React, { Fragment, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { register } from '../../actions/user';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import {setAlert} from '../../actions/alert';
import toggleShow from '../../functions/toggleShow';

const Register = ({isAuthenticated, register, setAlert, setShowModal, showModal}) => {
  const refs = {
    pass1: useRef(null),
    pass1I: useRef(null),
    pass2: useRef(null),
    pass2I: useRef(null),
  };
  const {pass1, pass1I, pass2, pass2I} = refs;
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    preferedV: '',
    preferedW: '',
    name: ''
  });
  const [showPrefs, setShowPrefs] = useState(false);

  const {
    email,
    password,
    preferedV,
    preferedW,
    name
  } = formData;

  const onchange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onsubmit = e => {
    e.preventDefault();
    if (password === pass2.current.value) {
      register(formData, setShowModal, showModal);
    }
    else {
      setAlert('Passwords Must Match', 'error', setShowModal, showModal);
    }
  }

  return (
    <Fragment>
      {isAuthenticated ? <Navigate to='/dashboard'/> : 
        <div className='register'>
          <form className='register-form' onSubmit={e => onsubmit(e)}>
            <div className='register-form1'>
              <input type='text' onChange={e => onchange(e)} value={name} placeholder='name' name='name'></input>
              <br></br>
            </div>
            <div className='register-form2'>
              <input type='text' onChange={e => onchange(e)} value={email} placeholder='email' name='email'></input>
              <br></br>
            </div>
            <div className='register-form3'>
              <input ref={pass1} type='password' onChange={e => onchange(e)} value={password} placeholder="password" name='password'></input>
              <button type='button' onClick={() => toggleShow(refs, 'pass1')}>
                <i className='fa-solid fa-eye' ref={pass1I}></i>
              </button>
              <br></br>
              <small>Must Contain 6 Characters</small>
              <br></br>
            </div>
            <div className='register-form4'>
              <input type='password' onChange={e => onchange(e)} placeholder="password 2" ref={pass2}></input>
              <button type='button' onClick={() => toggleShow(refs, 'pass2')}>
                <i className='fa-solid fa-eye' ref={pass2I}></i>
              </button>
              <br></br>
              <small>Must Match</small>
              <br></br>
            </div>
            <div className='register-form5'>
              <small>Prefered Measurements (defaults to standard oz, floz)</small>
              <input type='checkbox' value={showPrefs} onChange={e => setShowPrefs(e.target.checked)}></input>
              {showPrefs &&
                <>
                  <br></br>
                  <input type='text' name='preferedV' onChange={e => onchange(e)} placeholder='prefered volume' value={preferedV}></input>
                  <br></br>
                  <input type='text' name='preferedW' onChange={e => onchange(e)} placeholder='prefered weight' value={preferedW}></input>
                </>
              }
              </div>
            <input type='submit' value='Register'></input>
          </form>
        </div>
      }
    </Fragment>
  )
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps, {register, setAlert})(Register);
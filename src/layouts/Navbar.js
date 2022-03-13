import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/user';

const Navbar = ({isAuthenticated, logout, setNavigate}) => {
  return (
    <Fragment>
      {isAuthenticated ? 
      <div className='nav-bar-container'>
        <div className='nav-item1'>
          <button className='nav-btn' onClick={() => setNavigate('/dashboard')}>
            Reciger<i className="fa fa-folder-open"></i>
          </button>
        </div>
        <div className='nav-item2'>
          <button className='nav-btn' onClick={() => setNavigate('/recipes/1')}>
            Recipes<i className='fa-solid fa-book'></i>
          </button>
        </div>
        <div className='nav-item3'>
          <button className='nav-btn' onClick={() => setNavigate('/ingredients/1')}>
            Ingredients<i className='fa-solid fa-carrot'></i>
          </button>
        </div>
        <div className='nav-account'>
          <button onClick={() => setNavigate('/account')}>
            Account <i className='fa-solid fa-user'></i>
          </button>
        </div>
        <div className='nav-logout'>
          <button className='nav-btn' onClick={e => {
              logout(e);
              setNavigate('/');
            }}>
            Logout<i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div> : 
      <div className='navbar-container'>
        <div className='nav-item1'>
          <button className='nav-btn' onClick={() => setNavigate('/login')}>
            Login<i className='fa fa-user'></i>
          </button>
        </div>
        <div className='nav-item2'>
          <button className='nav-btn' onClick={() => setNavigate('/register')}>
            Register<i className='fa fa-user-check'></i>
          </button>
        </div>
        <div className='nan-item3'>
          <button className='nav-btn' onClick={() => setNavigate('/')}>
            Reciger<i className='fa fa-folder-open'></i>
          </button>
        </div>
      </div>}
    </Fragment>
  )
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, {logout})(Navbar)
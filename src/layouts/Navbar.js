import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../actions/user';

const Navbar = ({isAuthenticated, logout}) => {
  return (
    <Fragment>
      {isAuthenticated ? 
      <div className='nav-bar-container'>
        <div className='nav-item1'>
          <Link to='/dashboard'>
            <button className='nav-btn'>
              Reciger<i className="fa fa-folder-open"></i>
            </button>
          </Link>
        </div>
        <div className='nav-item2'>
          <Link to='/recipes/1'>
            <button className='nav-btn'>
              Recipes<i className='fa-solid fa-book'></i>
            </button>
          </Link>
        </div>
        <div className='nav-item3'>
          <Link to='/ingredients'>
            <button className='nav-btn'>
              Ingredients<i className='fa-solid fa-carrot'></i>
            </button>
          </Link>
        </div>
        <div className='nav-logout'>
          <button className='nav-btn' onClick={e => logout(e)}>
            Logout<i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div> : 
      <div className='navbar-container'>
        <div className='nav-item1'>
          <Link to='/login'>
            <button className='nav-btn'>
              Login<i className='fa fa-user'></i>
            </button>
          </Link>
        </div>
        <div className='nav-item2'>
          <Link to='/register'>
            <button className='nav-btn'>
              Register<i className='fa fa-user-check'></i>
            </button>
          </Link>
        </div>
        <div className='nan-item3'>
          <Link to='/'>
            <button className='nav-btn'>
              Reciger<i className='fa fa-folder-open'></i>
            </button>
          </Link>
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
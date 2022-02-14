import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';

const Landing = ({isAuthenticated}) => {
  return (
    <Fragment>
      {isAuthenticated ? <Navigate to='/dashboard' /> : 
      <div className='landing'>
        <Link to='/login'>
          <button className='landing-btn'>
            Login
            <i className='fa fa-user'></i>
          </button>
        </Link>
        <Link to='/register'>
          <button className='landing-btn'>
              Register
              <i className='fa fa-user-check'></i>
          </button>
        </Link>
      </div>}
    </Fragment>
  )
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps)(Landing);
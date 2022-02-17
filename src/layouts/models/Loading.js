import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import spinner from '../../images/spinner.gif';

const Loading = ({loading}) => {
  const background = {
    initial: {
      opacity: 0
    }, 
    enter: {
      opacity: 1
    }, 
    exit: {
      opacity: 0
    }, 
  };
  if (loading) {
    return (
      <> 
          <div className='background'>
          </div> 
          <div className='loading-container'>
            <img
            src={spinner}
            style={{ position: 'absolute' }}
            alt='Loading...'
            key="background">
            </img>
          </div>
      </>
    )
  }
  return null
}

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loading: state.loading
});

export default connect(mapStateToProps)(Loading);
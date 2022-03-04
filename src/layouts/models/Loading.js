import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import spinner from '../../images/spinner.gif';

const Loading = ({loading}) => {
  if (loading.bool) {
    return (
      <> 
          <div className='background'>
          </div> 
          <div className='loading-container'>
            <img
            src={spinner}
            style={{ position: 'absolute', zIndex: 4 }}
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
  loading: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  loading: state.loading
});

export default connect(mapStateToProps)(Loading);
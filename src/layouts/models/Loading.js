import React, { Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import spinner from '../../images/spinner.gif';

const Loading = ({user}) => {
  if (user) {
    return (
      <Fragment> 
        <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading...'
      ></img>
      </Fragment>
    )
  }
  return null
}

Loading.propTypes = {
  user: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  user: state.user.loading,
});

export default connect(mapStateToProps)(Loading);
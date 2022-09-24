import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import State from '../../types/State';

interface Props {
  loading: {
    bool: boolean
  }
};

const Loading: React.FC<Props> = ({loading}) => {
  if (loading.bool) {
    return (
      <> 
          <div className='background'>
          </div> 
          <div className='loading-container'>
            <img
            src={'../../images/spinner.gif'}
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

const mapStateToProps = (state: State) => ({
  loading: state.loading
});

export default connect(mapStateToProps)(Loading);
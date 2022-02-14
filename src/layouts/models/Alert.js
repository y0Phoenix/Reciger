import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

const Alert = ({alert}) => {
  return (
    <Fragment>
      {
        alert !== null && alert.length > 0 && 
        alert.map(alert => (
          <div key={alert.id} className={`alert-${alert.type}`}>
            {alert.msg}
          </div>
        ))
      }
    </Fragment>
  )
}


Alert.propTypes = {
  alert: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  alert: state.alert
});

export default connect(mapStateToProps)(Alert)
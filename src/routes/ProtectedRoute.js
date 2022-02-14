import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import Category from '../layouts/models/Category'
import Ingredient from '../layouts/models/Ingredient'

const ProtectedRoute = ({isAuthenticated}) => {
    console.log(isAuthenticated);
    return (
        <Fragment>
            <Category />
            <Ingredient />
            <Outlet />
        </Fragment>
    );
}

ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps)(ProtectedRoute);

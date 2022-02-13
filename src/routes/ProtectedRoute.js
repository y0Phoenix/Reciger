import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Navigate, Outlet } from 'react-router-dom'
import { connect } from 'react-redux'
import Category from '../layouts/models/Category'
import Ingredient from '../layouts/models/Ingredient'

const ProtectedRoute = (isAuthenticated) => {
    if (!isAuthenticated.isAuthenticated) {
        return <Navigate to='/login'/>;
    }
    return (
        <Fragment>
            <Category />
            <Ingredient />
            <Outlet/>
        </Fragment>
    );
}

ProtectedRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps)(ProtectedRoute);

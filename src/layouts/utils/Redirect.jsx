import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

const Redirect = ({ navigate, setNavigate, isAuthenticated }) => {
    const location = useLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setNavigate(null), [location]);
    return (
        <>
            {navigate && <Navigate to={navigate}/>}
        </>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
});

export default connect(mapStateToProps)(Redirect);
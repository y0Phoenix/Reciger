import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const Redirect = ({ navigate, setNavigate }) => {
    const location = useLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setNavigate(null), [location]);
    return (
        <>
            {navigate && <Navigate to={navigate}/>}
        </>
    )
}

export default Redirect;
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import State from '../../types/State';

const mapStateToProps = (state: State) => ({
    isAuthenticated: state.user.isAuthenticated
});

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
    navigate: string,
    setNavigate: React.Dispatch<React.SetStateAction<string>>
}

const Redirect: React.FC<Props> = ({ navigate, setNavigate, isAuthenticated }) => {
    const location = useLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setNavigate(''), [location]);
    return (
        <>
            {navigate && <Navigate to={navigate}/>}
        </>
    )
};

export default connector(Redirect);
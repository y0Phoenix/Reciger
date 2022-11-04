import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import State from '../../../types/State';
import { verifyEmailFinish } from '../../../actions/user';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingButton from '../../../components/LoadingButton';
import { setToast } from '../../../actions/toast';
import { Toast } from '../../../types/Toast';

const connector = connect(null, {verifyEmailFinish});

type Props = ConnectedProps<typeof connector>; 

const Email: React.FC<Props> = ({verifyEmailFinish}) => {
    // pull the token from the URL params
    const params = useParams();
    const navigate = useNavigate();
    let token: string;
    if (params.token) token = params.token;
    else {
        setToast(new Toast({
            body: 'Invalid Email Verification URL',
            autoHide: false,
            bg: 'danger'
        }));
        navigate('/dashboard');
    }
    return (
        <div className='Flex center '>
            <LoadingButton 
                type='button'
                text='Verify Email'
                isMotion
                callback={() => verifyEmailFinish(token)}
            />
        </div>
    )
}

export default connector(Email);
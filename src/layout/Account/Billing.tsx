import React from 'react'
import { connect, ConnectedProps } from 'react-redux';
import State from '../../types/State'
import { setToast, setToastWithId } from '../../actions/toast';
import { Toast } from '../../types/Toast';

const mapStateToProps = (state: State) => ({
    user: state.user.user
});

const connector = connect(mapStateToProps, {setToast, setToastWithId});

type Props = ConnectedProps<typeof connector>;

const Billing: React.FC<Props> = ({user, setToast, setToastWithId}) => {
    return (
        <div className='Flex vertical gap-sm'>
            <small className={user?.subscription.isSubscribed ? 'success' : 'danger'}>
                {user?.subscription.isSubscribed ? 'Subscription Active' : 'Not Subscribed'}
            </small>
            <button className='btn-theme-lg black' onClick={() => setToast(new Toast({
                body: 'Subscription Functionality Not Available Yet',
                bg: 'info',
                autoHide: true,
                setToastWithId,
            }))}>
                <i className='fa-solid fa-cart-shopping'></i> Open Subsciption Page  
                {
                    // TODO Implement Subscription Functionality
                }
                {/* <a href='strip page here'>
                </a> */}
            </button>
        </div>
    )
}

export default connector(Billing);
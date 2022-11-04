import React, { Fragment, useEffect, useState } from 'react'
import { Toast } from 'react-bootstrap'
import { connect, ConnectedProps } from 'react-redux';
import logo from '../pictures/logo-art-xsmall.png';
import State from '../types/State';
import { removeToast, setToastWithId } from '../actions/toast';
import moment from 'moment';

const mapStateToProps = (state: State) => ({
    toasts: state.toast
});

const connector = connect(mapStateToProps, {removeToast});

type Props = ConnectedProps<typeof connector>;

const Toasts: React.FC<Props> = ({toasts, removeToast}) => {
    return (
        <>
            {toasts.map((toast, i) => {
                return (
                    <Fragment key={i}>
                        <Toast onClose={() => toast.closeToast(removeToast)} bg={toast.bg} autohide={toast.autoHide}>
                            <Toast.Header>
                                <img src={logo} className='rounded me-2' alt='' />
                                <strong className='me-auto'>Reciger</strong>
                                <small>{toast.timeFrom}</small>
                            </Toast.Header>
                            <Toast.Body>
                                {toast.jsxBody}
                            </Toast.Body>
                        </Toast>
                    </Fragment>
                )
            }
            )}
        </>
    )
}

export default connector(Toasts);
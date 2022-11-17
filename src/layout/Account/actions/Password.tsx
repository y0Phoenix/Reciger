import React, { useState } from 'react'
import { Card, Form, InputGroup } from 'react-bootstrap'
import LoadingButton from '../../../components/LoadingButton';
import { setDynamicValue } from '../../../functions/DynamicValue';
import { useBeforeunload } from 'react-beforeunload';
import { useLocation } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { changePasswordReq, changePasswordToken } from '../../../actions/user';
import { setToast } from '../../../actions/toast';
import { Toast } from '../../../types/Toast';

const connector = connect(null, {changePasswordReq, changePasswordToken, setToast});

type Props = ConnectedProps<typeof connector>;

const Password: React.FC<Props> = ({changePasswordReq, changePasswordToken, setToast}) => {
    const {pathname} = useLocation();
    const token = pathname.split('/actions/password/').join('');
    // local state for the two passwords and email to be set
    const [formData, setFormData] = useState({
        first: '',
        second: '',
        email: ''
    });

    // local state to determine if unsaved changes are made
    const [changes, setChanges] = useState(false);

    // this package prompts the user when they are trying to reload with unsaved changes
    useBeforeunload((e) => {
        if (changes) {
            e.preventDefault()
        }
    })

    // common onchange function to save code volume
    const onchange = (props: string[], value: any) => {
        if (!changes) setChanges(true);
        const _passwords = {...formData};
        setDynamicValue(props, _passwords, value);
        setFormData(_passwords);
    };

    // on submission callback function
    const onsubmit = () => {
        if (token === 'init') return changePasswordReq(formData.email);
        if (formData.first !== formData.second) return setToast(new Toast({
            body: 'Passwords Must Match',
            bg: 'danger',
            autoHide: true,
        }));
        changePasswordToken(token, formData.first);
    }

    return (
        <div className='Flex center margin-lg'>
            <Card>
                <Card.Header>
                    {pathname.includes('/init') ? 
                        (
                            <div className='tx-center'>Initiate Password Change</div>
                        ) 
                    : 
                        (
                            <div className='tx-center'>Change Password</div>
                        )
                    }
                </Card.Header>
                <Card.Body>
                    <div className='Flex vertical tx-center center gap-sm'>
                        {pathname.includes('/init') ? 
                            (
                                <div className='Flex center vertical vertical-center padding-lg gap-sm'>
                                    <InputGroup>
                                        <Form.Control 
                                            value={formData.email}
                                            placeholder='email...'
                                            onChange={(e) => onchange(['email'], e.target.value)}
                                        />
                                    </InputGroup>
                                    <div>
                                        <LoadingButton 
                                            text='Submit'
                                            type='button'
                                            changes={changes}
                                            callback={() => onsubmit()}
                                        />
                                    </div>
                                </div>
                            ) 
                        : 
                            (
                                <div className='Flex center vertical vertical-center padding-lg gap-sm'>
                                    <InputGroup>
                                        <Form.Control 
                                            value={formData.first}
                                            placeholder='password'
                                            onChange={(e) => onchange(['first'], e.target.value)}
                                        />
                                    </InputGroup>
                                    <InputGroup>
                                        <Form.Control 
                                            value={formData.second}
                                            placeholder='must match first'
                                            onChange={(e) => onchange(['second'], e.target.value)}
                                        />
                                    </InputGroup>
                                    <div>
                                        <LoadingButton 
                                            type='button'
                                            text='Submit'
                                            changes={changes}
                                            callback={() => onsubmit()}
                                        />
                                    </div>
                                </div>
                            )
                        }
                        
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default connector(Password);
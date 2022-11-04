import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux';
import State from '../../types/State'
import { updateUser, deleteUser, verifyEmail } from '../../actions/user';
import { Form, InputGroup } from 'react-bootstrap';
import { User } from '../../types/User';
import { setDynamicValue } from '../../functions/DynamicValue';
import { Link, useNavigate } from 'react-router-dom';
import { setConfirmModal } from '../../actions/modal';
import LoadingButton from '../../components/LoadingButton';
import { linkDark } from '../../types/Style';

const mapStateToProps = (state: State) => ({
    userState: state.user.user
});

const connector = connect(mapStateToProps, {updateUser, deleteUser, setConfirmModal, verifyEmail});

type Props = ConnectedProps<typeof connector>;

const Personal: React.FC<Props> = ({userState, updateUser, deleteUser, setConfirmModal, verifyEmail}) => {
    const navigate = useNavigate();
    // local user state to be manipulated
    const [user, setUser] = useState<User>(new User);

    // local state to determine if any unsaved changes are present
    const [changes, setChanges] = useState(false);

    // useEffect for when the user is defined in the global state
    useEffect(() => {
        if (userState) setUser(userState);
    }, [userState])

    const handleChange = (props: string[], value: string) => {
        setChanges(true);
        const _user = {...user};
        setDynamicValue(props, _user, value);
        setUser(_user);
    };

    const handleUpdate = () => {
        if (!userState) return;
        let _user = {...user} ;
        if (user.email === userState.email) _user.email = '';
        else return verifyEmail(user.email, userState.email, {name: user.name});
        updateUser(_user);
    }

    return (
        <div className='Flex vertical space-btwn fit-container'>
            <div className='Flex vertical gap-lg'>
                <InputGroup>
                    <InputGroup.Text id='basic-addon1'>name</InputGroup.Text>
                    <Form.Control 
                        placeholder='name...'
                        value={user.name}
                        onChange={(e) => handleChange(['name'], e.target.value)}
                    />
                </InputGroup>
                <div>
                    <small className={user.verify.email.bool ? 'success' : 'danger'}>{user.verify.email.bool ? 'email verified' : 'email not verified'}</small>
                    <InputGroup>
                        <InputGroup.Text id='basic-addon1'>email</InputGroup.Text>
                        <Form.Control 
                            placeholder='email...'
                            value={user.email}
                            onChange={(e) => handleChange(['email'], e.target.value)}
                        />
                    </InputGroup>
                </div>
                <div>
                    <button className='btn-theme-lg'>
                        <Link style={linkDark} to={'/actions/password/init'}>
                            <i className='fa-solid fa-key'></i> Change Password
                        </Link>
                    </button>
                </div>
            </div>
            <div className='Flex flex-end vertical fit-container'>
                <div className='Flex flex-end gap-md'>
                    <LoadingButton 
                        type='button'
                        text='Update User'
                        iconClass='fa-solid fa-cloud-arrow-up'
                        callback={() => handleUpdate()}
                        changes={changes}
                    />
                    <button className='btn-theme black' onClick={() => setConfirmModal({
                        title: 'Are You Sure You Want To Delete Your User',
                        body: 'This Cannot Be Undone And All Your Ingredient And Recipe Data Will Be Lost Forever',
                        show: true,
                        callbacks: [deleteUser],
                        props: [[navigate]]
                    })}>
                        <i className='fa-solid fa-user-slash'></i> Delete User
                    </button>
                </div>
            </div>
        </div>
    )
}

export default connector(Personal);
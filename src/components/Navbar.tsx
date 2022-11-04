import React from 'react'
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { connect, ConnectedProps } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../pictures/logo-x-small.png';
import State from '../types/State';
import { link } from '../types/Style';
import { logout } from '../actions/user';
import { linkDark } from '../types/Style';

const mapStateToProps = (state: State) => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user.user
});

const connector = connect(mapStateToProps, {logout});

type Props = ConnectedProps<typeof connector>;

const Navbar: React.FC<Props> = ({isAuthenticated, user, logout}) => {
    return (
        <>
            <div className='Navbar'>
                <div className='Flex space-btwn margin-md'>
                    <div>
                        <Link to={'/'}>
                            <img src={logo}></img>
                        </Link>
                    </div>
                    <div className='Flex gap-lg font-size-md white'>
                        {isAuthenticated ? 
                            (
                                <>
                                    <div className='Flex gap-sm'>
                                        <Dropdown>
                                            <Dropdown.Toggle variant='secondary' id='dropdown-basic'>
                                                <i className='fa-solid fa-bell'></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>Notification Finctionality In Development</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                        <div className='pointer'>
                                            <Link style={linkDark} to={'/account'}>
                                                <img className='profile-pic' src={user?.avatar}></img>
                                            </Link>
                                        </div>
                                        <div>
                                            <Dropdown as={ButtonGroup}>
                                                <Link className='btn btn-secondary' to={'/account'}>{user?.name}</Link>
                                                <Dropdown.Toggle split variant='secondary' id='dropsown-split-basic' />
                                                <Dropdown.Menu>
                                                    <Dropdown.Item as={Link} to='/account'><i className='fa-solid fa-user'></i> Account</Dropdown.Item>
                                                    <Dropdown.Item as={'button'} onClick={() => logout()}><i className='fa-solid fa-right-from-bracket'></i> Logout</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    <Link to={'/login'} style={link}>
                                        <i className='fa-solid fa-right-to-bracket dark'></i> Log on
                                    </Link>
                                    <Link to={'/register'} style={link}>
                                        <i className='fa-solid fa-user-plus dark'></i> Register
                                    </Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>  
        </>
    )
}

export default connector(Navbar);
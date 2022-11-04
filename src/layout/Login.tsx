import React, { useRef, useState } from 'react'
import { Card,InputGroup, ListGroup, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../pictures/logo-transparent-small.png';
import { linkDark } from '../types/Style';
import { motion } from 'framer-motion';
import { grow } from '../types/Motion';
import { connect, ConnectedProps } from 'react-redux';
import { login } from '../actions/user';
import State from '../types/State';
import toggleShow from '../functions/toggleShow';
import LoadingButton from '../components/LoadingButton';

const connector = connect(null, {login});

type Props = ConnectedProps<typeof connector>;

const Login: React.FC<Props> = ({login}) => {
    const navigate = useNavigate();
    // for the toggleShow function for showing passwords
    const refs = {
        pass: useRef(null),
        passI: useRef(null)
    }
    const {pass, passI} = refs;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remeber: false
    });
    const {email, password, remeber} = formData;

    // change event function for the inputs. The ternary is for the remeber me checkbox
    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.name == 'remeber' ? e.target.checked : e.target.value});

    // submit event function for the login form
    const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        login(formData, navigate)
    }

    return (
        <div className='Flex center padding-xxlg bg-dark'>
            <div className='bg-inner-dark padding-md border-radius-md'>
                <Card className='tx-center padding-md'>
                    <Card.Img variant='top' src={logo}></Card.Img>
                    <Card.Body>
                        <Card.Title as={'h1'} className='font-size-lg'>Login</Card.Title>
                        <br></br>
                        <div className='flex vertical center'>
                            <form onSubmit={(e) => onsubmit(e)}>
                                <InputGroup className='mb-3'>
                                    <InputGroup.Text id='basic-addon1'>*</InputGroup.Text>
                                    <Form.Control 
                                        placeholder='Email'
                                        name='email'
                                        value={email}
                                        onChange={(e: any) => onchange(e)}
                                    />
                                    <InputGroup.Text id='basic-addon2'>@example.com</InputGroup.Text>
                                </InputGroup>
                                <InputGroup className='mb-3'>
                                    <InputGroup.Text id='basic-addon1'>*</InputGroup.Text>
                                    <Form.Control 
                                        placeholder='Password'
                                        name='password'
                                        type='password'
                                        value={password}
                                        onChange={(e: any) => onchange(e)}
                                        ref={pass}
                                    />
                                    <InputGroup.Text id='basic-addon2'>
                                        <button type='button' className='eye' onClick={() => toggleShow(refs, 'pass')}>
                                            <i className='fa-solid fa-eye' ref={passI}></i>
                                        </button>
                                    </InputGroup.Text>
                                    <InputGroup.Text id='basic-addon3'>atleast 6 characters</InputGroup.Text>
                                </InputGroup>
                                <div>
                                    <input type={'checkbox'} name='remeber' checked={remeber} onChange={(e) => onchange(e)}></input> Remeber Me
                                </div>
                                <div>
                                    <Link to={'/register'} className='dark' style={linkDark}>
                                        Or Create Account
                                    </Link>
                                </div>
                                <br></br>
                                <LoadingButton 
                                    text='Login'
                                    type='submit'
                                />
                            </form>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default connector(Login);
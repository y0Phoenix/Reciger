import React, { useRef, useState } from 'react'
import { Card,InputGroup, ListGroup, Form } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../pictures/logo-transparent-small.png';
import { linkDark } from '../types/Style';
import { motion } from 'framer-motion';
import { grow } from '../types/Motion';
import { connect, ConnectedProps } from 'react-redux';
import { register } from '../actions/user';
import State from '../types/State';
import toggleShow from '../functions/toggleShow';
import { setToast } from '../actions/toast';
import { Toast } from '../types/Toast';

export interface RegisterFormData {
    name: string,
    email: string,
    password: string,
    password2: string
}

const connector = connect(null, {register, setToast});

type Props = ConnectedProps<typeof connector>;

const Register: React.FC<Props> = ({register, setToast}) => {
    const navigate = useNavigate();
    // for the toggleShow function for showing passwords
    const refs = {
        pass: useRef(null),
        passI: useRef(null),
        pass2: useRef(null),
        pass2I: useRef(null),
    }
    const {pass, passI, pass2, pass2I} = refs;

    const [formData, setFormData] = useState<RegisterFormData>({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const {name, email, password, password2} = formData;

    // change event function for the inputs. The ternary is for the remeber me checkbox
    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, [e.target.name]: e.target.name == 'remeber' ? e.target.checked : e.target.value});

    // submit event function for the login form
    const onsubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== password2) return setToast(new Toast({
            autoHide: false,
            bg: 'danger',
            body: 'Passwords Must Match'
        }));
        register(formData, navigate);
    }

    return (
        <div className='Flex center padding-xxlg bg-dark'>
            <div className='bg-inner-dark padding-md border-radius-md'>
                <Card className='tx-center padding-md'>
                    <Card.Img variant='top' src={logo}></Card.Img>
                    <Card.Body>
                        <Card.Title as={'h1'} className='font-size-lg'>Register</Card.Title>
                        <br></br>
                        <div className='flex vertical center'>
                            <form onSubmit={(e) => onsubmit(e)}>
                                <InputGroup className='mb-3'>
                                    <InputGroup.Text id='basic-addon1'>*</InputGroup.Text>
                                    <Form.Control 
                                        placeholder='Name'
                                        name='name'
                                        value={name}
                                        onChange={(e: any) => onchange(e)}
                                    />
                                </InputGroup>
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
                                <InputGroup className='mb-3'>
                                    <InputGroup.Text id='basic-addon1'>*</InputGroup.Text>
                                    <Form.Control 
                                        placeholder='Retype Password'
                                        name='password2'
                                        type='password'
                                        value={password2}
                                        onChange={(e: any) => onchange(e)}
                                        ref={pass2}
                                    />
                                    <InputGroup.Text id='basic-addon2'>
                                        <button type='button' className='eye' onClick={() => toggleShow(refs, 'pass2')}>
                                            <i className='fa-solid fa-eye' ref={pass2I}></i>
                                        </button>
                                    </InputGroup.Text>
                                    <InputGroup.Text id='basic-addon3'>mustmatch</InputGroup.Text>
                                </InputGroup>
                                <div>
                                    <Link to={'/login'} className='dark' style={linkDark}>
                                        Already Have An Account?
                                        Login
                                    </Link>
                                </div>
                                <br></br>
                                <motion.button type='submit' whileHover={grow} className='btn-theme'>Register</motion.button>
                            </form>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default connector(Register);
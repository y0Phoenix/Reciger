import React from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion';
import { connect, ConnectedProps } from 'react-redux';
import { deleteUser } from '../../actions/user';
import { verifyEmail } from '../../actions/user';
import { AccountFormData } from './Account';
import { User } from '../../types/User';
import ShowModal from '../../types/ShowModal';

const connector = connect(null, {deleteUser, verifyEmail});

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
    formData: AccountFormData,
    hover: {
        scale: number
    },
    user: User | null,
    onsubmit: (e: React.FormEvent<any>) => void | Promise<any>,
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    setNavigate: React.Dispatch<React.SetStateAction<string>>,
    setShowModal: React.Dispatch<React.SetStateAction<ShowModal>>,
    showModal: ShowModal
}

const AccountContent: React.FC<Props> = ({formData, hover, user, verifyEmail, onsubmit, onchange, setNavigate, setShowModal, showModal, deleteUser}) => {
    const params = useParams();
    return (
        <>
            {params.page === 'personal' &&
                <>
                    <div className='account-content-form'>
                        <div className='account-name'>
                            <input type='text' name='name' value={formData.name} onChange={e => onchange(e)}></input>
                        </div>
                        <div className='account-email'>
                            {user && 
                                <>
                                    {!user.verify.email.bool ? 
                                        <>
                                            <small style={{color: 'red'}}>Email Not Vefified</small>
                                            <motion.button className='btn no-radius' whileHover={hover} type='button' onClick={() => verifyEmail(user.email, null, null, setShowModal, showModal)}>
                                                Verify Email <i className="fa-solid fa-square-check"></i>
                                            </motion.button>
                                        </> :
                                        <>
                                            <small style={{color: 'green'}}>Email Verified</small>
                                        </>
                                    }
                                </>
                            }
                            <input type='text' name='email' value={formData.email} onChange={e => onchange(e)}></input>
                        </div>
                        <div className='account-changepassword'>
                            <motion.button whileHover={hover} className='btn no-radius' onClick={() => setNavigate('/password/init')}>
                                Change Password <i className='fa-solid fa-square-pen'></i>
                            </motion.button>
                        </div>
                    </div> 
                </>
            }
            <div className='account-buttons'>
                <motion.button className='btn no-radius' whileHover={hover} type='button' onClick={(e) => onsubmit(e)}>
                    Update <i className='fa-solid fa-wrench'></i>
                </motion.button>
                <motion.button className='btn no-radius' whileHover={hover} type='button' onClick={() => setShowModal({...showModal, YesorNo: {direct: deleteUser, bool: true, params: {setShowModal, showModal, setNavigate}}})}>
                    Delete User <i className="fa-solid fa-user-slash"></i>
                </motion.button>
            </div>
        </>
    )
}

export default connector(AccountContent);
import React, { Fragment, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { logout } from '../actions/user';
import State from '../types/State';
const animate = {
  scale: 1.03
};

const mapStateToProps = (state: State) => ({
  isAuthenticated: state.user.isAuthenticated
});

const connector = connect(mapStateToProps, {logout});

type reduxProps = ConnectedProps<typeof connector>;

interface Props extends reduxProps {
  setNavigate: React.Dispatch<React.SetStateAction<string>>
};

const Navbar: React.FC<Props> = ({isAuthenticated, logout, setNavigate}) => {
  const [gap, setGap] = useState(window.innerWidth > 425 ? '35px' : '0');
  window.addEventListener('resize' , (e: UIEvent) => {
    const target = e.target as Window;
    target.innerWidth > 425 ? setGap('35px') : setGap('0');
  });
  return (
    <Fragment>
      {isAuthenticated ? 
      <div className='navbar-container'>
        <div className='nav-2' style={{gap: gap}}>
          <div>
            <motion.button whileHover={animate} className='nav-btn' onClick={() => setNavigate('/dashboard')}>
            <i className="fa fa-folder-open"></i> Reciger 
            </motion.button>
          </div>
          <div>
            <motion.button whileHover={animate} className='nav-btn' onClick={() => setNavigate('/recipes/1')}>
            <i className='fa-solid fa-book'></i> Recipes 
            </motion.button>
          </div>
          <div>
            <motion.button whileHover={animate} className='nav-btn' onClick={() => setNavigate('/ingredients/1')}>
            <i className='fa-solid fa-carrot'></i> Ingredients 
            </motion.button>
          </div>
        </div>
        <div className='nav-2' style={{gap: gap}}>
          <div>
            <motion.button whileHover={animate} className='nav-btn' onClick={() => setNavigate('/account/personal')}>
            <i className='fa-solid fa-user'></i> Account 
            </motion.button>
          </div>
          <div>
            <motion.button whileHover={animate} className='nav-btn' onClick={() => {
                logout();
                setNavigate('/');
              }}>
            <i className="fa-solid fa-right-from-bracket"></i> Logout 
            </motion.button>
          </div>
        </div>
      </div> : 
      <div className='navbar-container'>
        <div style={{gap: gap}} className='nav-2'>
          <div className='nav-item nav-1'>
            <motion.button whileHover={animate} className='nav-btn' onClick={() => setNavigate('/login')}>
            <i className='fa fa-user'></i> Login 
            </motion.button>
          </div>
          <div className='nav-item nav-2'>
            <motion.button whileHover={animate} className='nav-btn' onClick={() => setNavigate('/register')}>
            <i className='fa fa-user-check'></i> Register 
            </motion.button>
          </div>
          <div className='nan-item nav-3'>
            <motion.button whileHover={animate} className='nav-btn' onClick={() => setNavigate('/')}>
            <i className='fa fa-folder-open'></i> Reciger 
            </motion.button>
          </div>
        </div>
      </div>}
    </Fragment>
  )
}

export default connector(Navbar);
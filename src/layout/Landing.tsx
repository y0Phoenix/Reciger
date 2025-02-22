import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import State from '../types/State';
import { link } from '../types/Style';
import gif from '../pictures/cooking-at-home.gif';
import gifsm from '../pictures/cooking-at-home-small.gif';
import gifxsm from '../pictures/cooking-at-home-xsmall.gif';
const gifArr = [
  gif, gifsm, gifxsm
];
const initial = {
  opacity: 0
};
const show = {
  opacity: 1
};
const hover = {
  scale: 1.07
};


const mapStateToProps = (state: State) => ({
  isAuthenticated: state.user.isAuthenticated
});

const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector>;

const Landing: React.FC<Props> = ({isAuthenticated}) => {
  const [i, setI] = useState(window.innerWidth >= 768 ? 0 : window.innerWidth >= 425 ? 1 : 2);
  // window.addEventListener('resize', (e) => {
  //   const target = e.target as Window;
  //   const width = target.innerWidth;
  //   if (width >= 768) return setI(0);
  //   if (width >= 425) return setI(1);
  //   return setI(2);
  // });
  return (
    <>
      {isAuthenticated ? <Navigate to='/dashboard' /> : 
      <>
      <AnimatePresence exitBeforeEnter>
        <div className='landing bg-dark'>
          <motion.p initial={initial} animate={show} transition={{delay: 1}} className='font-size-lg white'>Create and Edit Recipes and Ingredients From Anywhere<br></br>
          With Nutrient Data and More</motion.p>
          <div className='Flex gap-md center padding-md'>
            <motion.div initial={initial} animate={show} transition={{delay: 1.2}} >
              <Link to='/login'>
                <motion.button className='btn-theme font-size-xsm' whileHover={hover}>
                  <i className='fa fa-right-to-bracket dark'></i> Login
                </motion.button>
              </Link>
            </motion.div>
            <motion.div initial={initial} animate={show} transition={{delay: 1.2}}>
              <Link to='/register'>
                <motion.button className='btn-theme font-size-xsm' whileHover={hover}>
                  <i className='fa fa-user-plus dark'></i> Register 
                </motion.button>
              </Link>
            </motion.div>
          </div>
          <div>
            <motion.img src={gifArr[i]} initial={initial} animate={{opacity: 0.7}} transition={{duration: 1}}>
            </motion.img>
          </div>
          <div>
            <a href='https://dribbble.com/shots/11362056-COOKING-AT-HOME' style={link}>
              <small>Credits: Tissa Tom at Dribble</small>
            </a>
          </div>
          <br></br>
        </div>
      </AnimatePresence>
      </>
      }
    </>
  )
};

export default connector(Landing);
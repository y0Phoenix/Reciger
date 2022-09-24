import React, { Fragment } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RecentRecs from './RecentRecs';
import RecentIngs from './RecentIngs';
import State from '../../types/State';
import ShowModal from '../../types/ShowModal';

const hover = {
  scale: 1.07
};

const mapStateToProps = (state: State) => ({
  user: state.user,
});

const connector = connect(mapStateToProps);

type ReduxProps = ConnectedProps<typeof connector>;

interface Props extends ReduxProps {
  showModal: ShowModal,
  setShowModal: React.Dispatch<React.SetStateAction<ShowModal>>,
  setNavigate: React.Dispatch<React.SetStateAction<string>>
}

const Dashboard: React.FC<Props> = ({user, showModal, setShowModal, setNavigate}) => {
  const {isAuthenticated, user: _user} = user;
  
  return (
    <Fragment>
      {!isAuthenticated ? <Navigate to='/login' /> : 
        <>
          <div className='dashboard-head'>
            <h1>{_user?.name}'s Dashboard</h1>
          </div>
          <br></br>
          <div className='dashboard-container'>
            <div className='recent-container'>
              <h3>Recent Recipes</h3>
              <div className='recent-create'>
                <motion.button whileHover={hover} onClick={() => setNavigate('/recipe/new')}>
                  <i className="fa-solid fa-book"></i> Create Recipe
                </motion.button>
              </div>
              <RecentRecs user={_user} setShowModal={setShowModal} showModal={showModal}/>
            </div>
            <div className='recent-container'>
              <h3>Recent Ingredients</h3>
              <div className='recent-create'>
                <motion.button whileHover={hover} onClick={e => setShowModal({...showModal, IngredientM: {bool: true, id: ''}})}>
                  <i className="fa-solid fa-carrot"></i> Create Ingredient
                </motion.button>
              </div>
              <RecentIngs user={_user} setShowModal={setShowModal} showModal={showModal}/>
            </div>
          </div>
        </>
      }
    </Fragment>
  )
}


export default connector(Dashboard);
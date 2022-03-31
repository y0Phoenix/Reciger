import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RecentRecs from './RecentRecs';
import RecentIngs from './RecentIngs';

const hover = {
  scale: 1.07
};

const Dashboard = ({user, showModal, setShowModal, setNavigate}) => {
  const {isAuthenticated, user: _user} = user;
  const [number, setNumber] = useState(1);
  
  return (
    <Fragment>
      {!isAuthenticated ? <Navigate to='/login' /> : 
        <>
          <div className='dashboard-head'>
            <h1>{_user.name}'s Dashboard</h1>
          </div>
          <br></br>
          <div className='dashboard-container'>
            <div className='recent-recipes'>
              <h3>Recent Recipes</h3>
              <div className='recent-create'>
                <motion.button whileHover={hover} onClick={() => setNavigate('/recipe/new')}>
                  <i className="fa-solid fa-book"></i> Create Recipe
                </motion.button>
              </div>
              <RecentRecs user={_user} setShowModal={setShowModal} showModal={showModal}/>
            </div>
            <div className='recent-ingredients'>
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

Dashboard.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Dashboard)
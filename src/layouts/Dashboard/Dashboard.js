import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import RecentRecs from './RecentRecs';
import RecentIngs from './RecentIngs';

const Dashboard = ({user, showModal, setShowModal}) => {
  const {isAuthenticated, user: _user} = user;
  
  return (
    <Fragment>
      {!isAuthenticated ? <Navigate to='/login' /> : 
        <>
          <div className='dashboard-head'>
            <h1>{_user.name}'s Recipes</h1>
          </div>
          <div className='dashboard-container'>
            <div className='recent-recipes'>
              <h3>Recent Recipes</h3>
              <RecentRecs user={_user} setShowModal={setShowModal} showModal={showModal}/>
                <Link to='/recipe/new'>
                  <button className='btn'>
                   <i className="fa-solid fa-book"></i> Create Recipe
                  </button>
                </Link>
            </div>
            <div className='recent-ingredients'>
              <h3>Recent Ingredients</h3>
              <RecentIngs user={_user} setShowModal={setShowModal} showModal={showModal}/>
                <button className='btn' onClick={e => setShowModal({...showModal, IngredientM: {bool: true, id: ''}})}>
                 <i className="fa-solid fa-carrot"></i> Create Ingredient
                </button>
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
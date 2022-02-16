import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Navigate, Outlet } from 'react-router-dom';
import RecentRecs from './RecentRecs';
import RecentIngs from './RecentIngs';

const Dashboard = ({user}) => {
  const {isAuthenticated, user: _user} = user;
  
  return (
    <Fragment>
      {!isAuthenticated ? <Navigate to='/login' /> : 
        <Fragment>
          <div className='dashboard-head'>
            <h1>{_user.name}'s Recipes</h1>
          </div>
          <div className='dashboard-container'>
            <div className='recent-recipes'>
              <h3>Recent Recipes</h3>
              <RecentRecs user={_user}/>
                <Link to='/newrecipe'>
                  <button className='btn'>
                    Create Recipe<i className="fa-solid fa-book"></i>
                  </button>
                </Link>
            </div>
            <div className='recent-ingredients'>
              <h3>Recent Ingredients</h3>
              <RecentIngs user={_user}/>
                <Link to='/newingredient'>
                  <button className='btn'>
                    Create Ingredient<i className="fa-solid fa-carrot"></i>
                  </button>
                </Link>
            </div>
          </div>
        </Fragment>
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
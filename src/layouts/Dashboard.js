import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';
import { getIngredients } from '../actions/ingredient';
import { getCategories } from '../actions/category';
import { getRecipes } from '../actions/recipe';

const Dashboard = ({isAuthenticated, category, ingredient, recipe, getCategories, getIngredients, getRecipes}) => {
  const {loading, recipes} = recipe;
  const {ingredients} = ingredient;
  useEffect(() => {
    getIngredients(false);
    getCategories();
    getRecipes(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      {!isAuthenticated ? <Navigate to='/login' /> : 
        <Outlet />
      }
    </Fragment>
  )
}

Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  category: PropTypes.object.isRequired,
  ingredient: PropTypes.object.isRequired,
  recipe: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
  getIngredients: PropTypes.func.isRequired,
  getRecipes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.user.isAuthenticated,
  category: state.category,
  ingredient: state.ingredient,
  recipe: state.recipe
});

export default connect(mapStateToProps, {getIngredients, getCategories, getRecipes})(Dashboard)
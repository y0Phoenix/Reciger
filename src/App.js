import './App.css';
import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './layouts/Navbar';
import Loading from './layouts/models/Loading';
import Alert from './layouts/models/Alert';
import Landing from './layouts/Landing';
import Container from './routes/Container';
import Register from './layouts/auth/Register';
import Login from './layouts/auth/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './layouts/Dashboard';
import Recipes from './layouts/Recipes';
import Ingredients from './layouts/Ingredients';
import Ingredient from './layouts/Ingredient';
import NewIngredient from './layouts/NewIngredient';
import NewRecipe from './layouts/NewRecipe';
import Recipe from './layouts/Recipe';
import { loadUser } from './actions/user';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Loading />
          <Alert />
          <Routes>
            <Route  exact path='/' element={<Landing />}/>
            <Route element={<Container />}/>
              <Route  exact path='/register' element={<Register />}/>
              <Route  exact path='/login' element={<Login />}/>
              <Route element={<ProtectedRoute />}/>
                <Route  exact path='/dashboard' element={<Dashboard />}/>
                <Route  exact path='/recipes' element={<Recipes />}/>
                <Route  exact path='/ingredients' element={<Ingredients />}/>
                <Route  exact path='/ingredient/:id' element={<Ingredient />}/>
                <Route  exact path='/recipe/:id' element={<Recipe />}/>
                <Route  exact path='/newingredient' element={<NewIngredient />}/>
                <Route  exact path='/newrecipe' element={<NewRecipe />}/>
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

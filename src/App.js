import './css/App.css';
import './css/Navbar.css';
import './css/Footer.css';
import './css/Landing.css';
import './css/Login.css';
import './css/Register.css';
import './css/Recipe/Recipe.css';
import './css/Recipe/Nutrients.css';
import './css/Dashboard/Dashboard.css';
import './css/Dashboard/RecentIngs.css';
import './css/Dashboard/RecentRecs.css';
import './css/Recipes.css';
import React, {Fragment, useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './layouts/Navbar';
import Landing from './layouts/Landing';
import Register from './layouts/auth/Register';
import Login from './layouts/auth/Login';
import Dashboard from './layouts/Dashboard/Dashboard';
import Ingredients from './layouts/Ingredients';
import Recipes from './layouts/Recipes';
import Recipe from './layouts/recipe/Recipe';
import { loadUser } from './actions/user';
import Footer from './layouts/Footer';
import Alert from './layouts/models/Alert';
import Loading from './layouts/models/Loading';
import Category from './layouts/models/Category';
import IngredientM from './layouts/models/IngredientM';
import YesorNo from './layouts/models/YesorNo';
import Redirect from './layouts/utils/Redirect';
import Password from './layouts/Password';
import Account from './layouts/Account';


function App() {
  const [showModal, setShowModal] = useState({
    Alert: false,
    Category: {
      name: null,
      type: null,
      bool: false
    },
    IngredientM: {
      id: null,
      bool: false
    },
    Loading: false,
    YesorNo: {
      direct: null,
      bool: false,
      params: {}
    },
    Filter: {
      typeOf: null,
      bool: false,
      filter: null,
      type: null
    }
  });
  const [navigate, setNavigate] = useState(null);
  const location =  window.location.pathname;
  useEffect(() => {
    if ((location === '/' || location === '/login' || location === '/register') && !localStorage.token) return;
    store.dispatch(loadUser())
  }, [location]);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar {...{setNavigate}}/>
          <section className='container'>
            <Alert {...{showModal, setShowModal}}/>
            <Category {...{showModal, setShowModal}}/>
            <IngredientM {...{showModal, setShowModal, setNavigate}}/>
            <Loading {...{showModal, setShowModal}}/>
            <YesorNo {...{showModal, setShowModal}} />
            <Redirect {...{navigate, setNavigate}}/>
            <Routes>
              <Route  exact path='/' element={<Landing {...{showModal, setShowModal}}/>}/>
              <Route  exact path='/register' element={<Register {...{showModal, setShowModal}}/>}/>
              <Route  exact path='/login' element={<Login {...{showModal, setShowModal}}/>}/>
              <Route  exact path='/dashboard' element={<Dashboard {...{showModal, setShowModal, setNavigate}}/>}/>
              <Route  exact path='/ingredients/:page' element={<Ingredients {...{showModal, setShowModal, setNavigate}}/>}/>
              <Route  exact path='/recipe/:id' element={<Recipe {...{showModal, setShowModal, setNavigate}}/>}/>
              <Route  exact path='/recipes/:page' element={<Recipes {...{showModal, setShowModal, setNavigate}}/>}/>
              <Route exact path='/account' element={<Account {...{showModal, setShowModal, setNavigate}}/>}/>
              <Route exact path='/password/:token' element={<Password {...{showModal, setShowModal, setNavigate}}/>}/>
            </Routes>
          </section>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

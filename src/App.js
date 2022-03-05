import './App.css';
import React, {Fragment, useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Navbar from './layouts/Navbar';
import Landing from './layouts/Landing';
import Container from './routes/Container';
import Register from './layouts/auth/Register';
import Login from './layouts/auth/Login';
import Dashboard from './layouts/Dashboard/Dashboard';
import Ingredients from './layouts/Ingredients';
import Recipes from './layouts/Recipes';
import Recipe from './layouts/Recipe';
import { loadUser } from './actions/user';
import Footer from './layouts/Footer';
import Alert from './layouts/models/Alert';
import Loading from './layouts/models/Loading';
import Category from './layouts/models/Category';
import IngredientM from './layouts/models/IngredientM';
import {loading, stopLoading} from './actions/loading';
import YesorNo from './layouts/models/YesorNo';


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
  useEffect(() => {
    const load = async () => {
      store.dispatch(loading());
      await store.dispatch(await loadUser());
      store.dispatch(stopLoading());
    }
    load();
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert {...{showModal, setShowModal}}/>
          <Category {...{showModal, setShowModal}}/>
          <IngredientM {...{showModal, setShowModal}}/>
          <Loading {...{showModal, setShowModal}}/>
          <YesorNo {...{showModal, setShowModal}} />
          <Routes>
            <Route  exact path='/' element={<Landing {...{showModal, setShowModal}}/>}/>
            <Route element={<Container {...{showModal, setShowModal}}/>}/>
              <Route  exact path='/register' element={<Register {...{showModal, setShowModal}}/>}/>
              <Route  exact path='/login' element={<Login {...{showModal, setShowModal}}/>}/>
              <Route  exact path='/dashboard' element={<Dashboard {...{showModal, setShowModal}}/>}/>
              <Route  exact path='/ingredients' element={<Ingredients {...{showModal, setShowModal}}/>}/>
              <Route  exact path='/recipe/:id' element={<Recipe {...{showModal, setShowModal}}/>}/>
              <Route  exact path='/recipes/:page' element={<Recipes {...{showModal, setShowModal}}/>}/>
          </Routes>
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store';

// axios.defaults.baseURL = 'https://reciger-back-end.herokuapp.com';
axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.baseURL = 'https://192.168.1.109:5000';
axios.defaults.headers.post["Content-Type"] = 'application/json';
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "http://localhost:5173";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <div className='bg-dark'>
        <Provider store={store}>
            <App />
        </Provider>
    </div>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import axios from 'axios';
import { Provider } from 'react-redux';
import store from './store';

// Use environment variable for API URL
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'https://reciger.com/api';
axios.defaults.headers.post["Content-Type"] = 'application/json';
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "http://localhost:5173";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <div className='bg-dark'>
        <Provider store={store}>
            <App />
        </Provider>
    </div>
)

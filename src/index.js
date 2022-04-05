import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axios from 'axios';

axios.defaults.baseURL = 'https://reciger-back-end.herokuapp.com';
// axios.defaults.baseURL = 'http://localhost:5000';
// axios.defaults.baseURL = 'https://192.168.1.109:5000';
axios.defaults.headers.post["Content-Type"] = 'application/json';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

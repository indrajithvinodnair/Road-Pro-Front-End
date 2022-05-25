import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// importing boostrap css and js modules from node-module component for global accessibility
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import'../node_modules/bootstrap/dist/js/bootstrap.bundle.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import 'ui-neumorphism/dist/index.css'

//test import
/* import { BrowserRouter as Router } from 'react-router-dom'; */
//import MainLayout from './components/dashboard/MainLayout';
//import AddUser from './pages/dashboard/AddUser';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

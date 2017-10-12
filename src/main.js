import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
      <BrowserRouter>
        <App name={name}/>
      </BrowserRouter>,
    document.getElementById('app')
  );
});
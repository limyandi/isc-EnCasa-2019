import React from 'react';
import { Helmet } from 'react-helmet';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Containers/routes';

function App() {
  return (
    <div className="App">
      <Helmet>
        <style>{'body { background-color: #282c34; }'}</style>
      </Helmet>
      <Router>
        <Routes />
      </Router>
    </div>
  );
}

export default App;

import React, { useGlobal } from 'reactn';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom';
import { MySwitch } from './Components';
import './App.css';
import Routes from './Containers/routes';
import 'typeface-roboto';

function App() {
  const [user, setUser] = useGlobal('user');

  return (
    <div className="App">
      <Helmet>
        <style>{'body { background-color: #282c34; }'}</style>
      </Helmet>
      <header className="App-header">
        <Router>
          <Routes />
        </Router>
      </header>
    </div>
  );
}

export default App;

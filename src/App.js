import React, { useGlobal } from 'reactn';
import { Helmet } from 'react-helmet';
import { MySwitch } from './Components';
import './App.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Routes from './Containers/routes';
import 'typeface-roboto';

function App() {
  const [user, setUser] = useGlobal('user');

  const userHasDriverRole = user.driverDetails != null;

  const switchUserMode = () => {
    if (user.role === 'Customer') {
      setUser({ ...user, role: 'Driver' });
    } else {
      setUser({ ...user, role: 'Customer' });
    }
  };
  return (
    <div className="App">
      <Helmet>
        <style>{'body { background-color: #282c34; }'}</style>
      </Helmet>
      <header className="App-header">
        <Router>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                padding: '10px',
                width: '40%',
                background: '#f0f0f0'
              }}
            >
              <ul style={{ listStyleType: 'none', padding: 0 }}>
                <MySwitch
                  label={user.role}
                  onChange={switchUserMode}
                  visible={userHasDriverRole}
                />
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </div>
          </div>
          <Routes />
        </Router>
      </header>
    </div>
  );
}

export default App;

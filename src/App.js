import React, { useGlobal } from 'reactn';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import Sidebar from './Containers/Sidebar';
import 'typeface-roboto';
import LoginView from './Containers/LoginView';
import RegisterView from './Containers/RegisterView';
import CustomerView from './Containers/CustomerView';
import DriverView from './Containers/DriverView';
import DriverSetting from './Containers/DriverView/settings';

const routesDefinition = [
  {
    path: '/',
    exact: true,
    main: user =>
      user.role === 'Customer' ? (
        <Redirect to="/customer" />
      ) : (
        <Redirect to="/driver" />
      )
  },
  {
    path: '/login',
    main: () => <LoginView />
  },
  {
    path: '/register',
    main: () => <RegisterView />
  },
  {
    path: '/customer',
    exact: true,
    main: () => <CustomerView />
  },
  {
    path: '/driver',
    exact: true,
    main: () => <DriverView />
  },
  {
    path: '/driver/setting',
    main: () => <DriverSetting />
  }
];

function App() {
  const [user, setUser] = useGlobal('user');
  return (
    <div className="App">
      <Helmet>
        <style>{'body { background-color: #282c34; }'}</style>
      </Helmet>
      <header className="App-header">
        <Router>
          <Sidebar />
          <Switch>
            {routesDefinition.map(route => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={() => route.main(user)}
              />
            ))}
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;

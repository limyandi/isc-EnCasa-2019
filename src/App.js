import React, { useGlobal } from 'reactn';
import { Helmet } from 'react-helmet';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route
} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';
import Sidebar from './Containers/Sidebar';
import 'typeface-roboto';
import LoginView from './Containers/LoginView';
import RegisterView from './Containers/RegisterView';
import CustomerView from './Containers/CustomerView';
import DriverView from './Containers/DriverView';
import DriverSetting from './Containers/DriverView/settings';
import PrivateRoute from './Containers/PrivateRoute';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const routesDefinition = [
  {
    path: '/',
    exact: true,
    private: true,
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
    private: true,
    main: () => <CustomerView />
  },
  {
    path: '/driver',
    exact: true,
    private: true,
    main: () => <DriverView />
  },
  {
    path: '/driver/setting',
    private: true,
    main: () => <DriverSetting />
  }
];

function App() {
  const classes = useStyles();
  const [user] = useGlobal('user');
  return (
    <div className="App">
      <Helmet>
        <style>{'body { background-color: #282c34; }'}</style>
      </Helmet>
      <header className="App-header">
        <Router>
          <Sidebar />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              {routesDefinition.map(route =>
                route.private ? (
                  <PrivateRoute
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={() => route.main(user)}
                  />
                ) : (
                  <Route
                    key={route.path}
                    path={route.path}
                    exact={route.exact}
                    component={() => route.main(user)}
                  />
                )
              )}
            </Switch>
          </main>
        </Router>
      </header>
    </div>
  );
}

export default App;

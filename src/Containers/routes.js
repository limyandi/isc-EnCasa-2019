import React, { useGlobal } from 'reactn';
import { Switch, Route } from 'react-router-dom';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import HomeView from './HomeView';
import DriverView from './DriverView/index';
import CustomerView from './CustomerView';

const routesDefinition = [
  {
    path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <HomeView />
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
    main: () => <CustomerView />
  },
  {
    path: '/driver',
    main: () => <DriverView />
  }
];

export default function routes() {
  return (
    <Switch>
      {routesDefinition.map(route => (
        <Route
          key={route.path}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ))}
    </Switch>
  );
}

import React, { useGlobal } from 'reactn';
import { Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import { MySwitch } from '../Components';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import DriverView from './DriverView/index';
import CustomerView from './CustomerView';

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
    main: () => <CustomerView />
  },
  {
    path: '/driver',
    main: () => <DriverView />
  }
];

function Routes(props) {
  const [user, setUser] = useGlobal('user');

  const userHasDriverRole = user.driverDetails != null;

  const switchUserMode = () => {
    if (user.role === 'Customer') {
      setUser({ ...user, role: 'Driver' });
      props.history.push('/driver');
    } else {
      setUser({ ...user, role: 'Customer' });
      props.history.push('/customer');
    }
  };
  console.log(user);
  return (
    <div>
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
  );
}

export default withRouter(Routes);

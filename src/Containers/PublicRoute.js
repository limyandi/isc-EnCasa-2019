import React, { useGlobal } from 'reactn';
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated] = useGlobal('isAuthenticated');
  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Redirect to="/" />;
        }
        return <Component {...props} />;
      }}
    />
  );
};

export default PublicRoute;

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginView from './LoginView';
import RegisterView from './RegisterView';
import HomeView from './HomeView';
import DriverView from './DriverView/index';
import CustomerView from './CustomerView';

export default function routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomeView} />
      <Route path="/login" component={LoginView} />
      <Route path="/register" component={RegisterView} />
      <Route path="/driver" component={DriverView} />
      <Route path="/customer" component={CustomerView} />
    </Switch>
  );
}

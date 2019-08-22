import React from 'react';
import axios from 'axios';
import { MyHeader } from '../Components';
import CustomerView from './CustomerView';

function HomeView() {
  // TODO: or persist data
  const [userMode, setUserMode] = React.useState('customer');
  console.log(userMode);

  return <div>{userMode === 'customer' && CustomerView()}</div>;
}

export default HomeView;
